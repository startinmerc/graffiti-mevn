const express = require("express");
const router = express.Router({ mergeParams: true });

const { getAllGeoJSON } = require("../handlers/geojson");

router.route("/").get(getAllGeoJSON);

module.exports = router;
