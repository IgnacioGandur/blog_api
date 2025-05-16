import { Router } from "express";
import categoriesController from "../controllers/categoriesController.js";
import validateCategoryCreation from "../middleware/validators/validateCategoryCreation.js";

const categoriesRouter = Router();

categoriesRouter.route("/").post(validateCategoryCreation, categoriesController.createCategory);

export default categoriesRouter;
