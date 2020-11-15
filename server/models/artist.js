const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	artworks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Artwork",
		},
	],
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
