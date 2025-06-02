import { body } from "express-validator";
import validationMiddleware from "../validationMiddleware.js";

const validationChain = [
	body("isAuthor")
		.trim()
		.notEmpty()
		.withMessage("The is author field can't be empty.")
		.bail()
		.isBoolean()
		.withMessage("The is author field should be a boolean value."),
	body("password")
		.trim()
		.notEmpty()
		.withMessage("The password to enable author status is not correct.")
		.bail()
		.custom(async (password) => {
			if (password !== process.env.AUTHOR_PASSWORD) {
				throw new Error("The password to enable author status is not correct.")
			}

			return true;
		})
];

const validateUserAuthorUpdate = validationMiddleware(validationChain);

export default validateUserAuthorUpdate;


