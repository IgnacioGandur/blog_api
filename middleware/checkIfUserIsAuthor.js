import jwt from "jsonwebtoken";
import userModel from "../db/user.js";

async function checkIfUserIsAuthor(req, res, next) {
	const { jwt: token } = req.cookies;
	const userToken = jwt.decode(token);
	const { id: userId } = userToken;
	const user = await userModel.getUserById(userId, true);

	if (!user.isAuthor) {
		res.status(401).json({
			success: false,
			message: "Unauthorized. Only users that are authors have access to this route.",
		});
	} else {
		return next();
	}
}

export default checkIfUserIsAuthor;
