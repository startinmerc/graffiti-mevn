// Import .env
require("dotenv").config();

// Import & config mongoose
const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

// Clear mongoose warnings
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(
	process.env.MONDOGB,
	{
		keepAlive: true,
	}
);

// Connect schemas
module.exports.Artist = require("./artist");
module.exports.Artwork = require("./artwork");
