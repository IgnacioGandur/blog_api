import jwt from "jsonwebtoken";
import userModel from "../db/user.js";

async function checkIfUserIsLogged(req, res, next) {
	if (!req.cookies.jwt) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized. You need to be logged to access this route."
		})
	} else {
		const { jwt: token } = req.cookies;
		const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
		const { id: userId } = decodedToken;
		const userExists = await userModel.checkIfUserExistsById(userId);

		if (!userExists) {
			return res.status(400).json({
				success: false,
				message: "Protected route. Invalid JWT. Please log in again.",
			})
		} else {
			next();
		}
	}
}

export default checkIfUserIsLogged;
