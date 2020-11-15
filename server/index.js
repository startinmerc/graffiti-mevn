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

// const authRoutes = require("./routes/auth");
// app.use("/api/auth", authRoutes);

// ================== Review Routes ==================

// const reviewRoutes = require("./routes/reviews");
// app.use(
// 	"/api/users/:id/reviews",
// 	loginRequired,
// 	ensureCorrectUser,
// 	reviewRoutes
// );

// ================= Error Handlers =================

app.use((req, res, next) => {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// app.use(errorHandler);

// =================== Start App ===================

// const seedDB = require("./seeds");
// seedDB();

app.listen(PORT, function () {
	console.log(`Server running on port ${PORT}`);
});
