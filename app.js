import "dotenv/config";
import express from "express";
import router from "./routes/router.js";
import passport from "passport";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

import("./middleware/passport/passport.js");

app.use("/api", router);

app.listen(3000, () => {
	console.log("Api running on: http://localhost:3000/");
})
