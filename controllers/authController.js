import bcrypt from "bcryptjs";
import userModel from "../db/user.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
	maxAge: 1000 * 60 * 60 * 24 * 30,
	httpOnly: true,
	secure: true,
	sameSite: 'none',
}

const authController = {
	registerPost: async (req, res) => {
		const { firstName, lastName, username, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));
		const profilePictureUrl = `https://ui-avatars.com/api/name=${firstName}+${lastName}=&background=random`;
		const user = await userModel.registerUser(firstName, lastName, username, profilePictureUrl, hashedPassword);

		res.json({
			success: true,
			message: "User registered successfully!",
			user: user,
		})
	},

	loginPost: async (req, res) => {
		const { username, password } = req.body;
		const user = await userModel.getUserByUsername(username);

		if (!user) {
			return res.json({
				success: false,
				message: `The user: "${username}" doens't exists.`
			})
		}

		const { password: userPassword } = user;
		const passwordsMatch = await bcrypt.compare(password, userPassword);

		if (!passwordsMatch) {
			return res.json({
				success: false,
				message: "The password is not correct."
			})
		} else {
			const jwtToken = jwt.sign(user, process.env.JWT_SECRET);
			res.cookie("jwt", jwtToken, cookieOptions);
			res.json({
				success: true,
				message: "User logged correctly!",
				user: user,
			})
		}
	},

	logout: (req, res) => {
		res.clearCookie("jwt", cookieOptions);
		res.json({
			success: true,
			message: "User logged out.",
		})
	}
}

export default authController;
