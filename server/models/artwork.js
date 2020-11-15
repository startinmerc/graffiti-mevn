const mongoose = require("mongoose");
const Artist = require("./artist");

const artworkSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		artist: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Artist",
		},
		coord_lat: {
			type: Number,
		},
		coord_long: {
			type: Number,
		},
		photos: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true }
);

// Before removing message
artworkSchema.pre("remove", async function (next) {
	try {
		// Find artist
		let artist = await Artist.findById(this.artist);
		// Remove message ref in author.messages
		artist.artworks.remove(this.id);
		// Wait to save
		await artist.save();
		// On you go
		return next();
		// Catch errors
	} catch (err) {
		return next(err);
	}
});

const Artwork = mongoose.model("Artwork", artworkSchema);

module.exports = Artwork;
