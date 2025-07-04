import jwt from "jsonwebtoken";
import userModel from "../db/user.js";

const cookieOptions = {
	maxAge: 1000 * 60 * 60 * 24 * 30,
	httpOnly: true,
	sameSite: false,
}

const usersController = {
	deleteUser: async (req, res) => {
		const { jwt: jwtToken } = req.cookies;
		const token = jwt.verify(jwtToken, process.env.JWT_SECRET);
		const { id } = token;
		const deletedUser = await userModel.deleteUser(id);

		res.clearCookie("jwt", cookieOptions);
		res.json({
			message: "User deleted successfully!",
			user: deletedUser,
		});
	},

	getUser: async (req, res) => {
		const { jwt: token } = req.cookies;
		const userToken = jwt.decode(token);
		const { id: userId } = userToken;
		const user = await userModel.getUserById(userId, true);

		res.json({
			success: true,
			message: "User retrieved successfully!",
			user: user,
		})
	},

	partialUserUpdate: async (req, res) => {
		const { isAuthor } = req.body;
		const { jwt: token } = req.cookies;
		const decodedToken = jwt.decode(token);
		const { id: userId } = decodedToken;

		let user;

		if (isAuthor !== undefined) {
			user = await userModel.updateAuthorStatus(userId, isAuthor);
		}

		res.json({
			success: true,
			message: "Partial user update performed correctly!",
			user: user,
		})
	}
}

export default usersController;
