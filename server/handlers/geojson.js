const db = require("../models");

exports.getAllGeoJSON = async (req, res, neext) => {
	try {
		let artworks = await db.Artwork.find().populate("artist");
		return res.status(200).json(buildJSON(artworks));
	} catch (err) {
		return next(err);
	}
};

function buildJSON(data) {
	let features = data.map((v) => ({
		type: "Feature",
		geometry: {
			type: "Point",
			coordinates: [v.coord_long, v.coord_lat],
		},
		properties: {
			title: v.title,
			description: v.description,
			icon: "ArtworkMarker",
			id: v._id,
			artist: v.artist.name,
			photos: v.photos,
		},
	}));
	return {
		type: "geojson",
		data: { type: "FeatureCollection", features: features },
	};
}
