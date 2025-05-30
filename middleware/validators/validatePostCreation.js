import { body } from "express-validator";
import validationMiddleware from "./validationMiddleware.js";
import categoryModel from "../../db/category.js";

const imageExtensionsRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;

const validationChain = [
	body("title")
		.trim()
		.notEmpty()
		.withMessage("The post title can't be empty.")
		.bail(),
	body("content")
		.trim()
		.notEmpty()
		.withMessage("The post content can't be empty."),
	body("imageUrl")
		.trim()
		.notEmpty()
		.withMessage("The image URL field can't be empty.")
		.bail()
		.isURL()
		.withMessage("The image URL field must be a valid URL.")
		.bail()
		.matches(imageExtensionsRegex)
		.withMessage("The image URL field should point to an image url (jpg, jpeg, png, gif, bmp, or webp)."),
	body("shortDescription")
		.trim()
		.notEmpty()
		.withMessage("The post short description can't be empty."),
	body("categories")
		.isArray({ min: 1 })
		.withMessage("You must select at least one category for the post."),
	body("categories.*.id")
		.trim()
		.notEmpty()
		.withMessage("The category id can't be empty.")
		.bail()
		.isInt()
		.withMessage("The category id should be an integer.")
		.bail()
		.custom(async (categoryId) => {
			const categoryExists = await categoryModel.checkIfCategoryExistsById(categoryId);

			if (!categoryExists) {
				throw new Error("The provided category id doesn't exists.");
			}
			return true;
		})
		.bail()
		.customSanitizer((categoryId) => {
			return Number(categoryId);
		})
];

const validatePostCreation = validationMiddleware(validationChain);

export default validatePostCreation;
