const express = require("express");
const router = express.Router({ mergeParams: true });

const {
	createArtist,
	getArtist,
	getAllArtists,
	deleteArtistBasic,
} = require("../handlers/artists");

router.route("/").post(createArtist);
router.route("/:query").get(getArtist);
router.route("/:id").delete(deleteArtistBasic);
router.route("/").get(getAllArtists);

module.exports = router;
