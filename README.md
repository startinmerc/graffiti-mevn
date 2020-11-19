# Graffiti Explorer (MEVN Flavour)

:art:

## [Live Front End](https://graffiti-explorer.netlify.app/)

## [Live Back End](https://graffiti-explorer-backend.herokuapp.com/)

---

To do

- Add filter by artist to map
  - Add filter param to geoJSON route
- `../map/:artworkID` or `../artwork/:artworkID/map`?
- Latter would work better for `../artist/:artistID/map`
- Add loading data state to FullMap + Api calls
  - Show some loading screen & transition when done
- Add Vagrant
- API try/catches
  - Add error component

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
