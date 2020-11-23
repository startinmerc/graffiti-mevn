# Graffiti Explorer (MEVN Flavour)

:art:

## [Live Front End](https://graffiti-explorer.netlify.app/)

## [Live Back End](https://graffiti-explorer-backend.herokuapp.com/)

---

To do

Front:

- Add filter by artist to map
  - Add filter param to geoJSON route OR
  - Figure how to refresh layers and filter source
- Change popup to img/title link and artist link?
- `../map/:artworkID` or `../artwork/:artworkID/map`?
  - Latter would work better for `../artist/:artistID/map`
- Add loading data state to FullMap + Api calls
  - Show some loading screen & transition when done
- API try/catches
  - Add error component

Back:

- getAllArtitst route no pop option
- Add Vagrant

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
