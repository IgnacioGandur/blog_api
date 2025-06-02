import { param } from "express-validator";
import validationMiddleware from "../validationMiddleware.js";
import categoryModel from "../../../db/category.js";

const validationChain = [
	param("categoryId")
		.trim()
		.notEmpty()
		.withMessage("The category id in the param can't be empty.")
		.bail()
		.isInt()
		.withMessage("The category id in the param should be an integer.")
		.bail()
		.custom(async (id) => {
			const categoryExists = await categoryModel.checkIfCategoryExistsById(id);

			if (!categoryExists) {
				throw new Error(`The category with an id of '${id}' doesn't exists.`)
			}
			return true;
		}),
];

const validateCategoryDeletion = validationMiddleware(validationChain);

export default validateCategoryDeletion;
