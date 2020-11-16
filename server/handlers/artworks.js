const db = require("../models");

exports.createArtwork = async (req, res, next) => {
	try {
		let artwork = await db.Artwork.create(req.body);

		let foundArtist = await db.Artist.findById(req.params.id);


		foundArtist.artworks.push(artwork._id);
		await foundArtist.save();

		let foundArtwork = await db.Artwork.findById(artwork._id).populate(
			"artist",
			{ name: true }
		);
		return res.status(200).json(foundArtwork);
	} catch (err) {
		return next(err);
	}
};

exports.getArtwork = async (req, res, next) => {
	try {
		let artwork = await db.Artwork.findById(req.params.query).populate(
			"artist",
			{ name: true }
		);
		return res.status(200).json(artwork);
	} catch (err) {
		try {
			let artwork = await db.Artwork.find({
				name: req.params.query,
			}).populate("artist", { name: true });
			return res.status(200).json(artwork);
		} catch (err) {
			return next(err);
		}
	}
};

exports.deleteArtwork = async (req, res, next) => {
	try {
		let foundArtwork = await db.Artwork.findById(req.params.query);
		await foundArtwork.remove();
		return res.status(200).json(foundArtwork);
	} catch (err) {
		try {
			let foundArtwork = await db.Artwork.find({ name: req.params.query });
			await foundArtwork.remove();
			return res.status(200).json(foundArtwork);
		} catch (err) {
			return next(err);
		}
	}
};

exports.editArtwork = async (req, res, next) => {
	try {
		let params = {};
		for (let prop in req.body) {
			if (req.body[prop]) {
				params[prop] = req.body.prop;
			}
		}

		let foundArtwork = await db.Artwork.findByIdAndUpdate(
			req.params.artwork._id,
			params,
			(err, updatedArtwork) => {
				if (err) {
					return err;
				} else {
					return updatedArtwork;
				}
			}
		);
		return res.status(200).json(foundArtwork);
	} catch (err) {
		return next(err);
	}
};

exports.getAllArtworks = async (req, res, next) => {
	try {
		let artworks = await db.Artwork.find();
		return res.status(200).json(artworks);
	} catch (err) {
		return next(err);
	}
};
