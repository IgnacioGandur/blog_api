import { Router } from "express";
import categoriesController from "../controllers/categoriesController.js";
import validateCategoryCreation from "../middleware/validators/validateCategoryCreation.js";
import validateCategoryDeletion from "../middleware/validators/validateCategoryDeletion.js";
import checkIfUserIsAuthor from "../middleware/checkIfUserIsAuthor.js";

const categoriesRouter = Router();

categoriesRouter
	.route("/")
	.post(
		checkIfUserIsAuthor,
		validateCategoryCreation,
		categoriesController.createCategory
	);

categoriesRouter
	.route("/:categoryId")
	.all(checkIfUserIsAuthor)
	.put(
		validateCategoryCreation,
		categoriesController.updateCategory
	)
	.delete(
		validateCategoryDeletion,
		categoriesController.deleteCategory
	);

export default categoriesRouter;
