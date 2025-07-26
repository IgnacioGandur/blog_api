import { body } from "express-validator";
import validationMiddleware from "../validationMiddleware.js";

const imageExtensionsRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;

function validateNames(bodyField, readableFieldName) {
	return body(bodyField)
		.trim()
		.notEmpty()
		.withMessage(`The ${readableFieldName} field can't be empty.`)
		.bail()
		.isLength({ min: 3, max: 30 })
		.withMessage(`The ${readableFieldName} should be between 3 and 30 characters long.`)
		.bail()
		.matches(/^[a-zA-Z\s]*$/)
		.withMessage(`The ${readableFieldName} should only contain letters and spaces.`)
		.bail()
}

const firstNameValidationChain = validateNames("firstName", "first name");
const lastNameValidationChain = validateNames("lastName", "last name");

const validationChain = [
	firstNameValidationChain,
	lastNameValidationChain,
	body("profilePictureUrl")
		.trim()
		.notEmpty()
		.withMessage("The profile picture image url can't be empty.")
		.bail()
		.isURL()
		.withMessage("The profile picture URL should be an URL")
		.bail()
		.matches(imageExtensionsRegex)
		.withMessage("The profile picture URL should point to an image url (jpg, jpeg, png, gif, bmp, or webp).")
		.bail(),
	body("password")
		.trim()
		.notEmpty()
		.withMessage("The password field can't be empty.")
		.bail()
		.custom((password, { req }) => {
			const { confirmPassword } = req.body;
			if (password !== confirmPassword) {
				throw new Error("The password and the confirm password field don't match.")
			}
			return true;
		})
];

const validateUserUpdate = validationMiddleware(validationChain);

export default validateUserUpdate;


