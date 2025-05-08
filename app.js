import express from "express";

const app = express();

app.all("/", (req, res) => {
	res.json({
		success: true,
		message: "Api reached!"
	})
})

app.listen(3000, () => {
	console.log("Api running on: http://localhost:3000/");
})
