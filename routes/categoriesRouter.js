import { Router } from "express";
import categoriesController from "../controllers/categoriesController.js";

// Validators
import validateCategoryCreation from "../middleware/validators/category/validateCategoryCreation.js";
import validateCategoryDeletion from "../middleware/validators/category/validateCategoryDeletion.js";
import checkIfUserIsAuthor from "../middleware/checkIfUserIsAuthor.js";

const categoriesRouter = Router();

categoriesRouter
	.route("/")
	.get(
		categoriesController.getAllCategories,
	)
	.post(
		checkIfUserIsAuthor,
		validateCategoryCreation,
		categoriesController.createCategory
	);

categoriesRouter
	.route("/:categoryId")
	.put(
		checkIfUserIsAuthor,
		validateCategoryCreation,
		categoriesController.updateCategory
	)
	.delete(
		checkIfUserIsAuthor,
		validateCategoryDeletion,
		categoriesController.deleteCategory
	);

export default categoriesRouter;
