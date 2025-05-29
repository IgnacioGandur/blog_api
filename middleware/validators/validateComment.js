import { body, param } from "express-validator";
import validationMiddleware from "./validationMiddleware.js";
import postModel from "../../db/post.js";

const validationChain = [
	body("content")
		.trim()
		.notEmpty()
		.withMessage("The comment can't be empty."),
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
				throw new Error(`The post with an id of: '${postId}' doesn't exists.`);
			}

			return true;
		})
];

const validateComment = validationMiddleware(validationChain);

export default validateComment;
