import bcrypt from "bcryptjs";
import userModel from "../db/user.js";

const authController = {
	registerPost: async (req, res) => {
		const { firstName, lastName, username, password } = req.body;
		const hashedPassword = bcrypt.hash(password, process.env.BCRYPT_SALT);
		const user = await userModel.registerUser(firstName, lastName, username, hashedPassword);

		res.json({
			success: true,
			message: "User registered successfully!",
			user: user,
		})
	}
}

export default authController;
