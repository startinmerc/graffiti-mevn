export const testData = [
	{
		title: "test data 1",
		location: [-1.077706, 53.956799],
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in illo quasi, repellat soluta porro architecto? Facilis distinctio natus iste illum quaerat provident debitis, numquam molestiae! Fuga similique officiis laboriosam!",
		artist: "1",
		id: "1",
		photos: ["https://picsum.photos/seed/test-1/200/300"],
	},
	{
		title: "test data 2",
		location: [-1.086944, 53.957329],
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in illo quasi, repellat soluta porro architecto? Facilis distinctio natus iste illum quaerat provident debitis, numquam molestiae! Fuga similique officiis laboriosam!",
		artist: "2",
		id: "2",
		photos: ["https://picsum.photos/seed/test-2/200/300"],
	},
	{
		title: "test data 3",
		location: [-1.088489, 53.959355],
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in illo quasi, repellat soluta porro architecto? Facilis distinctio natus iste illum quaerat provident debitis, numquam molestiae! Fuga similique officiis laboriosam!",
		artist: "1",
		id: "3",
		photos: ["https://picsum.photos/seed/test-3/200/300"],
	},
	{
		title: "test data 4",
		location: [-1.087631, 53.96402],
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in illo quasi, repellat soluta porro architecto? Facilis distinctio natus iste illum quaerat provident debitis, numquam molestiae! Fuga similique officiis laboriosam!",
		artist: "2",
		id: "4",
		photos: ["https://picsum.photos/seed/test-4/200/300"],
	},
	{
		title: "test data 5",
		location: [-1.082696, 53.964108],
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in illo quasi, repellat soluta porro architecto? Facilis distinctio natus iste illum quaerat provident debitis, numquam molestiae! Fuga similique officiis laboriosam!",
		artist: "2",
		id: "5",
		photos: ["https://picsum.photos/seed/test-5/200/300"],
	},
];

function buildJSON(data) {
	let features = data.map((v) => ({
		type: "Feature",
		geometry: {
			type: "Point",
			coordinates: v.location,
		},
		properties: {
			title: v.title,
			description: v.description,
			icon: "ArtworkMarker",
			id: v.id,
			artist: v.artist,
			photos: v.photos,
		},
	}));
	return {
		type: "geojson",
		data: { type: "FeatureCollection", features: features },
	};
}

export const geoData = buildJSON(testData);
