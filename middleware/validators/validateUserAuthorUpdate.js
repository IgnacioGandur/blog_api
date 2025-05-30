import { body } from "express-validator";
import validationMiddleware from "./validationMiddleware.js";

const validationChain = [
	body("isAuthor")
		.trim()
		.notEmpty()
		.withMessage("The is author field can't be empty.")
		.bail()
		.isBoolean()
		.withMessage("The is author field should be a boolean value.")
];

const validateUserAuthorUpdate = validationMiddleware(validationChain);

export default validateUserAuthorUpdate;


