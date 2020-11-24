const express = require("express");
const router = express.Router({ mergeParams: true });
const { artistSchema } = require("../joiSchemas");

const {
	createArtist,
	getArtist,
	getAllArtists,
	deleteArtistBasic,
} = require("../handlers/artists");

const validateArtist = (req, res, next) => {
	const { error } = artistSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((i) => i.message).join(",");
		throw new Error(msg);
	} else {
		next();
	}
};

router.route("/").post(validateArtist, createArtist);
router.route("/:query").get(getArtist);
// router.route("/:id").delete(deleteArtistBasic);
router.route("/").get(getAllArtists);

module.exports = router;
