import jwt from "jsonwebtoken";
import userModel from "../db/user.js";
import bcrypt from "bcryptjs";

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
		const { jwt: token } = req.cookies;
		const decodedToken = jwt.decode(token);
		const { id: userId } = decodedToken;
		const {
			firstName,
			lastName,
			profilePictureUrl,
			password,
		} = req.body;
		const fieldsToUpdate = {
			firstName,
			lastName,
			profilePictureUrl,
			password
		}
		if (password) {
			fieldsToUpdate.password = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));
			console.log("Updated password has been hashed 🔐")
		}

		const updatedUser = await userModel.partialUserUpdate(userId, fieldsToUpdate);

		return res.json({
			success: true,
			message: "User updated correctly!",
			user: updatedUser,
		})
	},

	partialUserAuthorUpdate: async (req, res) => {
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
