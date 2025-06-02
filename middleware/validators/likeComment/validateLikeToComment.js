import jwt from "jsonwebtoken";
import { param } from "express-validator";
import validationMiddleware from "../validationMiddleware.js";
import commentModel from "../../../db/comment.js";
import likeCommentModel from "../../../db/likeComment.js";

const validationChain = [
	param("commentId")
		.trim()
		.notEmpty()
		.withMessage("The comment id in the param can't be empty.")
		.bail()
		.isInt()
		.withMessage("The comment id in the param should be an integer.")
		.bail()
		.custom(async (commentId) => {
			const commentExists = await commentModel.checkIfCommentExistsById(commentId);

			if (!commentExists) {
				throw new Error(`The comment with an id of: '${commentId}' doesn't exists.`);
			}

			return true;
		})
		.bail()
		.custom(async (commentId, { req }) => {
			const { jwt: token } = req.cookies;
			const user = jwt.decode(token);
			const { id: userId } = user;

			const likeExists = await likeCommentModel.checkIfLikeExists(commentId, userId);

			if (likeExists) {
				throw new Error("You already liked that comment.");
			}

			return true;
		})
];

const validateLikeToComment = validationMiddleware(validationChain);

export default validateLikeToComment;
