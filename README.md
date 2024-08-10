# Livetech Media Search

Web application with common features of searching media content, allowing users to search for music, books, and other media using the iTunes Search API

## Run

Node version - 20.15.1
NPM version - 10.8.2
```bash
npm ci
npm run build
npm run start
```

## How it works

You can write requests by writing "Search" and selecting "Media" inputs and pressing 'Submit' button
Or by writing queryparams 'search' and 'media' in searchbar of yout browser (?search=Adele+hello&media=music)

Avaiable media params: movie, podcast, music, musicVideo, audiobook, shortFilm, tvShow, software, ebook, all

You can add results to favourites by clicking on star svg on result image. They will appear in favourites tab (top right link with star on header)
