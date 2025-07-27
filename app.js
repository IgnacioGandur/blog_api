import "dotenv/config";
import express from "express";
import router from "./routes/router.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";
import selfPing from "./utilities/selfPing.js";

selfPing(process.env.SERVER_URL);

const app = express();
app.use(cors({
	origin: "https://ignaciogandursblog.netlify.app/",
	credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

import("./middleware/passport/passport.js");

app.use("/api", router);

// Handle requests to non existing routes.
app.use((_req, res) => {
	res.json({
		success: false,
		message: "The route you are looking for doesn't exists."
	})
})

app.listen(3000, () => {
	console.log("Api running on: http://localhost:3000/");
})
