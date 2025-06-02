import jwt from "jsonwebtoken";
import { param } from "express-validator";
import validationMiddleware from "../validationMiddleware.js";
import commentModel from "../../../db/comment.js";

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
			const comment = await commentModel.getCommentById(commentId);

			if (Number(comment.userId) !== Number(user.id)) {
				throw new Error("You are not the owner of the comment you are trying to delete.");
			}

			return true;
		})
];

const validateCommentDeletion = validationMiddleware(validationChain);

export default validateCommentDeletion;
