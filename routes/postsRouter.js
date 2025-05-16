import { Router } from "express";
import postsController from "../controllers/postsController.js";
import categoriesController from "../controllers/categoriesController.js";
import validateCategoryCreation from "../middleware/validators/validateCategoryCreation.js";
import checkIfUserIsAuthor from "../middleware/checkIfUserIsAuthor.js";

const postsRouter = Router();

postsRouter.route("/").post(postsController.createPost);
postsRouter.route("/categories").post(
	checkIfUserIsAuthor,
	validateCategoryCreation,
	categoriesController.createCategory
);

export default postsRouter;
