import { param } from "express-validator";
import validationMiddleware from "./validationMiddleware.js";
import postModel from "../../db/post.js";

const validationChain = [
	param("postId")
		.trim()
		.notEmpty()
		.withMessage("The post id in the param can't be empty.")
		.bail()
		.isInt()
		.withMessage("The post id in the param should be an integer.")
		.bail()
		.custom(async (postId) => {
			const postExists = await postModel.checkIfPostExistsById(postId);

			if (!postExists) {
				throw new Error(`The post with an id of: '${postId}' doesn't exist.`);
			}

			return true;
		})
];

const validatePostDeletion = validationMiddleware(validationChain);

export default validatePostDeletion;
