import { Router } from "express";
import commentsController from "../controllers/commentsController.js";
import validateComment from "../middleware/validators/validateComment.js";
import checkIfUserIsLogged from "../middleware/checkIfUserIsLogged.js";
import validateCommentDeletion from "../middleware/validators/validateCommentDeletion.js";
import validateCommentUpdate from "../middleware/validators/validateCommentUpdate.js";
import validateLikeToComment from "../middleware/validators/validateLikeToComment.js";
import validateLikeToCommentDeletion from "../middleware/validators/validateLikeToCommentDeletion.js";

const commentsRouter = Router({ mergeParams: true });

commentsRouter
	.route("/")
	.post(
		checkIfUserIsLogged,
		validateComment,
		commentsController.createComment
	);

commentsRouter
	.route("/:commentId")
	.put(
		validateCommentUpdate,
		commentsController.updateComment
	)
	.delete(
		validateCommentDeletion,
		commentsController.deleteComment
	);

commentsRouter
	.route("/:commentId/likes")
	.post(
		checkIfUserIsLogged,
		validateLikeToComment,
		commentsController.likeComment
	)
	.delete(
		checkIfUserIsLogged,
		validateLikeToCommentDeletion,
		commentsController.deleteLike
	);

export default commentsRouter;
