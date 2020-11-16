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
		let artist = await db.Artist.findById(req.params.query).populate("artworks");
		return res.status(200).json(artist);
	} catch (err) {
		try {
			let artist = await db.Artist.findOne({
				name: req.params.query.replace(/_/g, " "),
			}).populate("artworks");
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

exports.deleteArtistBasic = async (req, res, next) => {
	try {
		let artist = await db.Artist.findByIdAndRemove(req.params.id);
		return res.status(200).json(artist);
	} catch (err) {
		next(err);
	}
};
