const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const {
	getArtwork,
	getAllArtworks,
	createArtwork,
	editArtwork,
	deleteArtwork,
} = require("../handlers/artworks");

router.route("/").post(upload.array('photo'),createArtwork);
router.route("/:query").get(getArtwork);
router.route("/:query").put(editArtwork);
router.route("/:query").delete(deleteArtwork);
router.route("/").get(getAllArtworks);

module.exports = router;
