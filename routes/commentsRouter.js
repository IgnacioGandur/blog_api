import { Router } from "express";
import commentsController from "../controllers/commentsController.js";
import checkIfUserIsLogged from "../middleware/checkIfUserIsLogged.js";

// Validators
import validateComment from "../middleware/validators/comment/validateComment.js";
import validateCommentDeletion from "../middleware/validators/comment/validateCommentDeletion.js";
import validateCommentUpdate from "../middleware/validators/comment/validateCommentUpdate.js";
import validateLikeToComment from "../middleware/validators/likeComment/validateLikeToComment.js";
import validateLikeToCommentDeletion from "../middleware/validators/likeComment/validateLikeToCommentDeletion.js";

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
