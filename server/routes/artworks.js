const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const { artworkPostSchema, artworkPutSchema } = require("../joiSchemas");

const {
	getArtwork,
	getAllArtworks,
	createArtwork,
	editArtwork,
	deleteArtwork,
} = require("../handlers/artworks");

const validatePostArtwork = (req, res, next) => {
	const { error } = artworkPostSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((i) => i.message).join(",");
		throw new Error(msg);
	} else {
		next();
	}
};

const validatePutArtwork = (req, res, next) => {
	const { error } = artworkPutSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((i) => i.message).join(",");
		throw new Error(msg);
	} else {
		next();
	}
};

router
	.route("/")
	.post(validatePostArtwork, upload.array("photo"), createArtwork);
router.route("/:query").get(getArtwork);
router
	.route("/:query")
	.put(validatePutArtwork, upload.array("photo"), editArtwork);
router.route("/:query").delete(deleteArtwork);
router.route("/").get(getAllArtworks);

module.exports = router;
