const mongoose = require("mongoose");
const { Artist, Artwork } = require("./models");

const artist1 = { name: "Artist 1", _id: "5fb193ad4771b829d4e04fa9" };
const artist2 =	{ name: "Artist 2", _id: "5fb1943a2bdc612a0722454b" },

const artworks = [
	{
		title: "test data 1",
		location: [-1.077706, 53.956799],
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in illo quasi, repellat soluta porro architecto? Facilis distinctio natus iste illum quaerat provident debitis, numquam molestiae! Fuga similique officiis laboriosam!",
		artist: artist1._id,
		photos: ["https://picsum.photos/seed/test-1/200/300"],
	},
	{
		title: "test data 2",
		location: [-1.086944, 53.957329],
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in illo quasi, repellat soluta porro architecto? Facilis distinctio natus iste illum quaerat provident debitis, numquam molestiae! Fuga similique officiis laboriosam!",
		artist: artist2._id,
		photos: ["https://picsum.photos/seed/test-2/200/300"],
	},
	{
		title: "test data 3",
		location: [-1.088489, 53.959355],
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in illo quasi, repellat soluta porro architecto? Facilis distinctio natus iste illum quaerat provident debitis, numquam molestiae! Fuga similique officiis laboriosam!",
		artist: artist1._id,
		photos: ["https://picsum.photos/seed/test-3/200/300"],
	},
	{
		title: "test data 4",
		location: [-1.087631, 53.96402],
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in illo quasi, repellat soluta porro architecto? Facilis distinctio natus iste illum quaerat provident debitis, numquam molestiae! Fuga similique officiis laboriosam!",
		artist: artist2._id,
		photos: ["https://picsum.photos/seed/test-4/200/300"],
	},
	{
		title: "test data 5",
		location: [-1.082696, 53.964108],
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in illo quasi, repellat soluta porro architecto? Facilis distinctio natus iste illum quaerat provident debitis, numquam molestiae! Fuga similique officiis laboriosam!",
		artist: artist2._id,
		photos: ["https://picsum.photos/seed/test-5/200/300"],
	},
];

function addArtwork(i){
  Artwork.create({
    title: i.title,
    coord_lat: i.location[1],
    coord_long: i.location[0],
    description: i.description,
    artist: i.artist,
    photos: i.photos,
  })
}

function seedDB(){
  Artwork.deleteMany({},(err)=>{
    if(err){
      console.log(err)
    } else {
      artworks.forEach(v=>addArtwork(v));
    }
  })
}

module.exports = seedDB;