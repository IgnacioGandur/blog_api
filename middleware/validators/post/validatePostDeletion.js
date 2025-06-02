import jwt from "jsonwebtoken";
import { param } from "express-validator";
import validationMiddleware from "../validationMiddleware.js";
import postModel from "../../../db/post.js";

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
		.bail()
		.custom(async (postId, { req }) => {
			const post = await postModel.getPostById(postId);
			const { jwt: token } = req.cookies;
			const user = jwt.decode(token);
			const { id: userId } = user;

			if (post.userId !== userId) {
				throw new Error("Only the author of the post can delete the post.");
			}

			return true;
		})
];

const validatePostDeletion = validationMiddleware(validationChain);

export default validatePostDeletion;
