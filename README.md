# CPAC_Abstract_Propic
Abstract_Propic is an automatic profile picture generator. Based on a deep-learning model, this tool generates a new and unique image for your Spotify account inspired by the songs you listen to the most.

## The concept:
This project aims to explore the interaction and contamination between visual and auditory arts. In the history of both these disciplines, lots of musicians have reported to perceive music and sounds as shapes and colors, and lots of painters and visual artists have reported their works to be inspired by music and sounds:

> *“Everything that I make I'm already thinking of what colour it is, and what texture it is, and what day of the week it is, and what number it is, and what shape.”* - Billie Eilish.

> *“Everything I sonically make is a painting. I see it. I see the importance and the value of everyone being able to experience a more beautiful life."* - Kanye West.

> *“The idea of music appears everywhere in Kandinsky's paintings. He believed shades resonated with each other to produce visual 'chords' and had an influence on the soul.”* - The Guardian speaking about Kandinsky's art.

Even though sensations and inspiration cannot be faithfully reproduced by technology, this project tries to interprete music in a synesthetic way by analyzing songs with mood detection and, based on that, realizing an abstract painting to be used as a Spotify profile picture.

## The technology:
Abstract_Propic exploits the Spotify API to retrieve informations about the user and the songs he listens to the most, performing feature extraction and mood detection on them, based on the features of **energy** and **valence**. Thorugh the use of these two features, four fundamental moods are identified:

- **Happy** *(high energy, high valence)*,
- **Angry** *(high energy, low valence)*,
- **Sad** *(low energy, low valence)*,
- **Relaxed** *(low energy, high valence)*.

After retrieving the mood of each song, a dedicated function assign an "overall mood" to the entire set of songs, taking into account both the number of songs for each mood and the polarization of energy and valence values.
