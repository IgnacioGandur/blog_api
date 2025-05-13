import { body, validationResult } from "express-validator";
import userModel from "../../db/user.js";

const regex = /^[\w\d\-]{1,30}$/g

const validationChain = [
	body("firstName")
		.trim()
		.notEmpty()
		.withMessage("The user first name can't be empty.")
		.isAlpha()
		.withMessage("The user first name should contain only letters.")
		.isLength({ min: 3, max: 30 })
		.withMessage("The user first name should be between 3 and 30 characters long."),
	body("lastName")
		.trim()
		.notEmpty()
		.withMessage("The user last name can't be empty.")
		.isAlpha()
		.withMessage("The user last name should contain only letters.")
		.isLength({ min: 3, max: 30 })
		.withMessage("The user last name should be between 3 and 30 characters long."),
	body("username")
		.trim()
		.notEmpty()
		.withMessage("The username field can't be empty.")
		.bail()
		.isLength({ min: 3, max: 30 })
		.withMessage("The username field should be between 3 and 30 characters long.")
		.matches(regex)
		.withMessage("The username should only contain letters, numbers, underscores and hyphens.")
		.custom(async (username) => {
			const isAvailable = await userModel.checkIfUsernameIsAvailable(username);

			if (!isAvailable) {
				throw new Error(`The username: '${username}' is already taken, please pick another one.`);
			}

			return true;
		}),
	body("password")
		.trim()
		.notEmpty()
		.withMessage("The password field can't be empty.")
		.bail()
		.custom((password, { req }) => {
			const { confirmPassword } = req.body;
			if (password !== confirmPassword) {
				throw new Error("The password and the confirm password fields don't match.");
			}

			return true;
		})
];

const validateUserRegister = [
	validationChain,
	(req, res, next) => {
		const validationErrors = validationResult(req);

		if (!validationErrors.isEmpty()) {
			return res.status(422).json({
				success: false,
				message: "There are some errors with the following inputs, please correct them:",
				errors: validationErrors.array(),
			})
		} else {
			return next();
		}
	}
]

export default validateUserRegister;
