const db = require("../models");

exports.createArtist = async function (req, res, next) {
	try {
		let artist = await db.Artist.create({
			name: req.body.name,
		});
		let foundArtist = await db.Artist.findById(artist._id);
		return res.status(201).json(foundArtist);
	} catch (err) {
		return next(err);
	}
};

exports.getArtist = async function (req, res, next) {
	try {
		// First, try to find artist by ID & return if found
		let artist = await db.Artist.findById(req.params.query).populate(
			"artworks"
		);
		return res.status(200).json(artist);
	} catch (err) {
		try {
			// If err, try to find artist by name
			let artist = await db.Artist.findOne({
				name: req.params.query.replace(/_/g, " "),
			}).populate("artworks");
			// Throw error if no artist found
			if (artist === null) {
				return next({status: 404, message: `Artist "${re.params.query}" not found`});
			}
			return res.status(200).json(artist);
		} catch (err) {
			return next(err);
		}
	}
};

exports.getAllArtists = async (req, res, next) => {
	try {
		let artists = await db.Artist.find().populate("artworks");
		return res.status(200).json(artists);
	} catch (err) {
		return next(err);
	}
};

// Only deletes artist, will cause errors on any realted artworks
exports.deleteArtistBasic = async (req, res, next) => {
	try {
		let artist = await db.Artist.findByIdAndRemove(req.params.id);
		return res.status(200).json(artist);
	} catch (err) {
		next(err);
	}
};
