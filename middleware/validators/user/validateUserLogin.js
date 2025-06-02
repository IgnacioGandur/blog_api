import bcrypt from "bcryptjs";
import { body } from "express-validator";
import userModel from "../../../db/user.js";
import validationMiddleware from "../validationMiddleware.js";

const validationChain = [
	body("username")
		.trim()
		.notEmpty()
		.withMessage("The username field can't be empty.")
		.bail()
		.custom(async (username) => {
			const userExists = await userModel.checkIfUserExistsByUsername(username);

			if (!userExists) {
				throw new Error(`The user: '${username}' doesn't exists.`);
			}

			return true;
		})
		.bail(),
	body("password")
		.trim()
		.notEmpty()
		.withMessage("The password field can't be empty.")
		.bail()
		.custom(async (password, { req }) => {
			const { username } = req.body;
			const user = await userModel.getUserByUsername(username);

			if (!user) {
				return;
			}

			const isPasswordCorrect = await bcrypt.compare(password, user.password);

			if (!isPasswordCorrect) {
				throw new Error("The password is not correct.");
			}

			return true;
		})
];

const validateUserLogin = validationMiddleware(validationChain);

export default validateUserLogin;
