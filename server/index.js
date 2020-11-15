// ================== Env Variables ==================

const PORT = process.env.PORT || 8081;
require("dotenv").config();

// ================== Dependencies ==================

const express = require("express");
const app = express();
const cors = require("cors");

// ================= Express Config =================

app.use(cors());
app.use(express.json());

// =================== Routes ===================

const artistRoutes = require("./routes/artists");
app.use("/api/artists", artistRoutes);

const artworkRoutes = require("./routes/artworks");
app.use("/api/artworks", artworkRoutes);


// ================= Error Handlers =================

app.use((req, res, next) => {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

const errorHandler = require("./handlers/error");
app.use(errorHandler);

// =================== Start App ===================

// const seedDB = require("./seeds");
// seedDB();

app.listen(PORT, function () {
	console.log(`Server running on port ${PORT}`);
});
