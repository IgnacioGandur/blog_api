import jwt from "jsonwebtoken";
import { param } from "express-validator";
import validationMiddleware from "../validationMiddleware.js";
import postModel from "../../../db/post.js";
import likePostModel from "../../../db/likePost.js";

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
				throw new Error(`The post with an id of: '${postId}' doesn't exists.`);
			}

			return true;
		})
		.bail()
		.custom(async (postId, { req }) => {
			const { jwt: token } = req.cookies;
			const user = jwt.decode(token);
			const { id: userId } = user;
			const likeExists = await likePostModel.checkIfLikeExists(postId, userId);

			if (!likeExists) {
				throw new Error("The like you are trying to remove from this post doesn't exist.");
			}

			return true;
		})
];

const validateLikeToPostDeletion = validationMiddleware(validationChain);

export default validateLikeToPostDeletion;
