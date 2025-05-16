import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import userModel from "../../db/user.js";

const validationChain = [
	body("password")
		.trim()
		.notEmpty()
		.withMessage("The password field can't be empty.")
		.bail()
		.custom(async (password, { req }) => {
			const { jwt: token } = req.cookies;
			const decodedToken = jwt.decode(token);
			const { id } = decodedToken;
			const user = await userModel.getUserById(id, false);
			const passwordsMatch = await bcrypt.compare(password, user.password);

			if (!passwordsMatch) {
				throw new Error("The password is not correct.");
			}
			return true;
		})
];

const validateUserDeletion = [
	validationChain,
	(req, res, next) => {
		const validationErrors = validationResult(req);

		if (!validationErrors.isEmpty()) {
			return res.status(422).json({
				success: false,
				message: "There's something wrong with the following input fields, please correct them:",
				errors: validationErrors.array(),
			})
		} else {
			next();
		}
	}
];

export default validateUserDeletion;
