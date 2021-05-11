import sys
import requests
import numpy as np
from numpy import asarray
from numpy.random import randn
from numpy.random import randint
from keras.models import load_model
import math
import os
import PIL
from PIL import Image
import mysql.connector
from mysql.connector import Error

"""
retrieve id songs from the app.js cript
"""
id_songs = []
for i in range(10):
    id_songs.append(sys.argv[i+1])

token = sys.argv[11]
user_id = sys.argv[12]

header={"Authorization": "Bearer %s"%token}
audio_feature_url="https://api.spotify.com/v1/audio-features"
audio_features=[]

"""
Get audio features with an http request from Spotify
"""
for song in id_songs:
    params = {"ids": song}
    req = requests.get(url=audio_feature_url, params=params, headers=header)
    assert req.status_code == 200, req.content
    audio_features_song = req.json()["audio_features"][0]
    audio_features.append(audio_features_song)



"""
Delete not useful audio features and keeps just energy and valence
"""
feature_space = []
for dic in audio_features:
    for key in list(dic):
        if key not in ["energy", "valence"]:
            dic.pop(key)
    feature_space.append(list(dic.values()))

"""
Mood classifier
"""
def mood_func(x, y):
    if x > 0.5 and y > 0.5:
        mood = "Happy"
    elif x > 0.5 >= y:
        mood = "Angry"
    elif x <= 0.5 and y > 0.5:
        mood = "Relaxed"
    elif x <= 0.5 and y <= 0.5:
        mood = "Sad"
    return mood

"""
classify the mood of each song
"""
mood_labels = []
for dic in audio_features:
    mood_labels.append(mood_func(dic["energy"], dic["valence"]))

"""
Dataset Labelling
"""
def centroid(points):
    length = len(points)
    x = []
    y = []
    for i in range(length):
        x.append(points[i][0])
        y.append(points[i][1])
    center = [np.sum(x[:])/length, np.sum(y[:])/length]
    return center


Happy_points = []
Angry_points = []
Sad_points = []
Relaxed_points = []

for point in feature_space:
    mood = mood_func(point[0],point[1])
    if mood == "Sad":
        Sad_points.append(point)
    if mood == "Angry":
        Angry_points.append(point)
    if mood == "Happy":
        Happy_points.append(point)
    if mood == "Relaxed":
        Relaxed_points.append(point)

Ch = centroid(Happy_points)
Ca = centroid(Angry_points)
Cs = centroid(Sad_points)
Cr = centroid(Relaxed_points)

Nh = len(Happy_points)
Na = len(Angry_points)
Ns = len(Sad_points)
Nr = len(Relaxed_points)

Dh = math.sqrt((Ch[0]-0.5)**2 + (Ch[1]-0.5)**2)
Da = math.sqrt((Ca[0]-0.5)**2 + (Ca[1]-0.5)**2)
Ds = math.sqrt((Cs[0]-0.5)**2 + (Cs[1]-0.5)**2)
Dr = math.sqrt((Cr[0]-0.5)**2 + (Cr[1]-0.5)**2)

#consider both number of elements of each mood and its distance from the center (0.5,0.5)
Wh = Nh*Dh
Wa = Na*Da
Ws = Ns*Ds
Wr = Nr*Dr

weights = {"Happy": Wh, "Angry": Wa, "Sad": Ws, "Relaxed": Wr}

key_list = list(weights.keys())
val_list = list(weights.values())

maxval = max(Wh, Wa, Ws, Wr)

position = val_list.index(maxval)
label_set = key_list[position]

#print("The dataset is classified as:", label_set)
sys.stdout.flush()

"""
Image Generation
"""

def generate_latent_points(latent_dim, n_samples, n_classes=4):
    # generate points in the latent space
    x_input = randn(latent_dim * n_samples)
    # reshape into a batch of inputs for the network
    z_input = x_input.reshape(n_samples, latent_dim)
    # generate labels
    labels = randint(0, n_classes, n_samples)
    return [z_input, labels]


MODEL_PATH = os.getcwd()
model = load_model(os.path.join(MODEL_PATH, 'generator_256_100_new.h5'), compile=False)

latent_points, labels = generate_latent_points(16, 16)

# specify labels
labels = asarray([x for _ in range(4) for x in range(4)])

# generate images
X  = model.predict([latent_points, labels])

# scale from [-1,1] to [0,1]
X = ((X + 1) / 2.0)*255

"""
Save the generetaed image in the 'images_generated' folder
"""
X = X.astype(np.uint8)
im = Image.fromarray(X[position])
path = os.path.join(MODEL_PATH, 'images_generated')
im.save(path + f'/{user_id}.png', 'PNG')

print("siam arrivati fin qui siam arrivati fin qui per vedere stampare PIIIIIL")
