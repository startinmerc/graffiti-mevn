const express = require("express");
const router = express.Router({ mergeParams: true });

const {
	getArtwork,
	getAllArtworks,
	createArtwork,
	editArtwork,
	deleteArtwork,
} = require("../handlers/artworks");

router.route("/").post(createArtwork);
router.route("/:query").get(getArtwork);
router.route("/:query").put(editArtwork);
router.route("/:query").delete(deleteArtwork);
router.route("/").get(getAllArtworks);

module.exports = router;