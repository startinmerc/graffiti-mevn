# Graffiti Explorer (MEVN Flavour)

:art:

## [Live Front End](https://graffiti-explorer.netlify.app/)

## [Live Back End](https://graffiti-explorer-backend.herokuapp.com/)

---

To do

Front:

- BACK: API try/catches
  - Add error component
- FEATURE: Add geolocate to SubmitArtwork
- FEATURE: Add filter by artist to map
  - Add filter param to geoJSON route OR
  - Figure how to refresh layers and filter source
  - `../map/:artworkID` or `../artwork/:artworkID/map`?
  - Latter would work better for `../artist/:artistID/map`
- FEATURE: Watch map url changes & refresh
- FEATURE: Add timeline to artworks
  - Add timestamp to photo object
- STYLE: Menu not sticking
- STYLE: Change popup to img/title link and artist link
- STYLE: Add loading data state to FullMap + Api calls
  - Show some loading screen & transition when done

Back:

- BACK: getAllArtitst route no pop option
- BACK: Add Vagrant

---

Local Setup - Server:

```bash
cd server
npm install
npm dev
```

Local Setup - Client:

```bash
cd client
npm install
npm serve
```

---
