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
	}
}

export default usersController;
