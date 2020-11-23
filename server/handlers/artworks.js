const db = require("../models");

exports.createArtwork = async (req, res, next) => {
	try {
		// Create new Artwork
		let artwork = await db.Artwork.create(req.body);
		// Map uploaded images to array + add to artwork
		artwork.photos = req.files.map((file) => ({
			url: file.path,
			filename: file.filename,
		}));
		// Save change to artwork
		await artwork.save();
		// Find artist supplied from params
		let foundArtist = await db.Artist.findById(req.body.artist);
		// Add artwork id to found artist
		foundArtist.artworks.push(artwork._id);
		// Save change to artist
		await foundArtist.save();
		// Get artist from DB and populate artist name
		let foundArtwork = await db.Artwork.findById(artwork._id).populate(
			"artist",
			{ name: true }
		);
		// Return Created status & populated artwork
		return res.status(201).json(foundArtwork);
	} catch (err) {
		// Catch errors
		return next(err);
	}
};

exports.getArtwork = async (req, res, next) => {
	try {
		// Try finding by id with query & populate artist
		let artwork = await db.Artwork.findById(req.params.query).populate(
			"artist",
			{ name: true }
		);
		return res.status(200).json(artwork);
		// If not found,
	} catch (err) {
		try {
			// Try finding by title with query & populate artist
			let artwork = await db.Artwork.findOne({
				// Regex to replace underscores with spaces
				title: req.params.query.replace(/_/g, " "),
			}).populate("artist", { name: true });
			// Return found artwork
			return res.status(200).json(artwork);
		} catch (err) {
			return next(err);
		}
	}
};

exports.deleteArtwork = async (req, res, next) => {
	try {
		// Find artwork in db
		let foundArtwork = await db.Artwork.findById(req.params.query);
		// Remove to trigger prehook to update artist's artworks array
		await foundArtwork.remove();
		// Return deleted artwork
		return res.status(200).json(foundArtwork);
	} catch (err) {
		// Catch errors
		return next(err);
	}
};

exports.editArtwork = async (req, res, next) => {
	try {
		// Empty object for edited fields
		let params = {};
		// Iterate over submitted fields
		for (let prop in req.body) {
			// If prop is passed
			if (req.body[prop]) {
				// Add to params
				params[prop] = req.body.prop;
			}
		}

		// Find & update artwork using params
		let foundArtwork = await db.Artwork.findByIdAndUpdate(
			req.params.artwork._id,
			params,
			(err, updatedArtwork) => {
				if (err) {
					// Catch errors
					return err;
				} else {
					return updatedArtwork;
				}
			}
		);
		// Return edited artwork
		return res.status(200).json(foundArtwork);
	} catch (err) {
		// Catch errors
		return next(err);
	}
};

exports.getAllArtworks = async (req, res, next) => {
	try {
		// Get all artworks
		let artworks = await db.Artwork.find();
		// Return array
		return res.status(200).json(artworks);
	} catch (err) {
		return next(err);
	}
};
