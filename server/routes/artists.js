const express = require("express");
const router = express.Router({ mergeParams: true });

const {
	createArtist,
	getArtist,
	getAllArtists,
} = require("../handlers/artists");

router.route("/").post(createArtist);
router.route("/:query").get(getArtist);
router.route("/").get(getAllArtists);

module.exports = router;
