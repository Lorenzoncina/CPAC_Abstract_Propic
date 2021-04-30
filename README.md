# CPAC_Abstract_Propic
Abstract_Propic is an automatic profile picture generator. Based on a deep-learning model, this tool generates a new and unique image for your Spotify account inspired by the songs you listen to the most.

## The concept:
In the context of creative computing, this project aims to explore the interaction and contamination between visual and auditory arts. In the history of both these disciplines, lots of musicians have reported to perceive music and sounds as shapes and colors, and lots of painters and visual artists have reported their works to be inspired by music and sounds:

> *“Everything that I make I'm already thinking of what colour it is, and what texture it is, and what day of the week it is, and what number it is, and what shape.”* - Billie Eilish.

> *“Everything I sonically make is a painting. I see it. I see the importance and the value of everyone being able to experience a more beautiful life."* - Kanye West.

> *“The idea of music appears everywhere in Kandinsky's paintings. He believed shades resonated with each other to produce visual 'chords' and had an influence on the soul.”* - The Guardian, speaking about Kandinsky's art.

Even though sensations and inspiration cannot be faithfully reproduced by technology, this project tries to interprete music in a synesthetic way by analyzing songs with mood detection and, based on that, realizing an abstract painting to be used as a Spotify profile picture.

## The technology:
Abstract_Propic exploits the Spotify API to retrieve information about the user and the songs he listens to the most, performing feature extraction and mood detection on them, based on the features of **energy** and **valence**. Thorugh the use of these two features, four fundamental moods are identified:

- **Happy** *(high energy, high valence)*,
- **Angry** *(high energy, low valence)*,
- **Sad** *(low energy, low valence)*,
- **Relaxed** *(low energy, high valence)*.

After inferring the mood of each song, a dedicated function assign an "overall mood" to the entire set of songs, taking into account both the number of songs for each mood and the polarization of energy and valence values.

The mood label that classifies the set of songs is then used to condition the generative process of a conditional generative adversarial network able to reproduce images of abstract paintings that match the four moods Happy, Angry, Sad and Relaxed. To do that, the generative model is trained using a dataset of thousands of real paintings organized in four subsets. To build the dataset we relied on our personal perception of which paintings inspired a particular mood, looking for shapes and color patterns that could have been reproduced by the generative network. 

Examples of painting-mood assignment are:

<p align="center">
<img src="https://user-images.githubusercontent.com/57753481/116582846-0b5dbf80-a916-11eb-971d-a3da7e6889f2.jpg" width="150" height="150" /> &nbsp; &nbsp; <img src="https://user-images.githubusercontent.com/57753481/116583050-3cd68b00-a916-11eb-9186-86ce3697dad3.jpg" width="150" height="150" /> &nbsp; &nbsp; <img src="https://user-images.githubusercontent.com/57753481/116581873-12380280-a915-11eb-90f9-a4dada473073.jpg" width="150" height="150" /> &nbsp; &nbsp; <img src="https://user-images.githubusercontent.com/57753481/116582438-a86c2880-a915-11eb-9e19-95e7db2456bb.jpg" width="150" height="150" />
</p>

{Happy, Angry, Sad, Relaxed}

That being said, the training dataset turned out to be really heterogeneous in terms of shapes and, for that reason, the generative network was not always able to reproduce satisfactory shape patterns. However, color patterns were chosen to be more homogeneous, thus they are way more recognizable also in the generated images. The conditional network was trained to reproduce squared images of 256x256 px size, in a training process that involved almost 7500 examples of abstract paintings from different artists and different styles.

Examples of generated images are:

<p align="center">
<img src="https://user-images.githubusercontent.com/57753481/116672863-f54a1080-a9a2-11eb-8216-ed30f431a2a6.png" width="150" height="150" /> &nbsp; &nbsp; <img src="https://user-images.githubusercontent.com/57753481/116672644-b9af4680-a9a2-11eb-99db-006eb431aa7b.png" width="150" height="150" /> &nbsp; &nbsp; <img src="https://user-images.githubusercontent.com/57753481/116672377-689f5280-a9a2-11eb-8d01-64645598a297.png" width="150" height="150" /> &nbsp; &nbsp; <img src="https://user-images.githubusercontent.com/57753481/116672413-72c15100-a9a2-11eb-9e28-07f337642566.png" width="150" height="150" />
</p>

{Happy, Angry, Sad, Relaxed}

## The interface:
Abstract_Propic is built as a webpage in which users can log in with their Spotify account, so that the application can retrieve the information needed for the analysis process. No personal or sensitive data are stored in the database during this phase, except for the Spotify user ID and a list of the ten user's top tracks. After the login, the user is directed back to the main page of the application, where the generated image will be displayed after few seconds, along with the list of the songs considered for the analysis.

## The architecture:
For the realization of this project a standard client-server architecture has been chosen, implemented with Node.js.
