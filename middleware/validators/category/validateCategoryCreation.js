import { body, validationResult } from "express-validator";
import categoryModel from "../../../db/category.js";

const regex = /^[\w\d\ ]{1,30}$/g;

const validationChain = [
	body("name")
		.trim()
		.notEmpty()
		.withMessage("The category name can't be empty.")
		.bail()
		.isLength({ min: 3, max: 30 })
		.withMessage("The category name should be between 3 and 30 characters long.")
		.bail()
		.matches(regex)
		.withMessage("The category name can only contain letters, numbers and spaces.")
		.bail()
		.custom(async (name) => {
			const categoryAlreadyExists = await categoryModel.checkIfCategoryAlreadyExists(name);
			if (categoryAlreadyExists) {
				throw new Error(`The category with the name of: '${name}' already exists.`)
			}
			return true;
		})
		.bail()
];

const validateCategoryCreation = [
	validationChain,
	(req, res, next) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(422).json({
				success: false,
				message: "There's something wrong with the following inputs, please correct them:",
				errors: validationErrors.array(),
			})
		}
		next();
	}
];

export default validateCategoryCreation;
