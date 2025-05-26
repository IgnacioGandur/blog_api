import { Router } from "express";
import commentsController from "../controllers/commentsController.js";
import validateComment from "../middleware/validators/validateComment.js";
import checkIfUserIsLogged from "../middleware/checkIfUserIsLogged.js";
import validateCommentDeletion from "../middleware/validators/validateCommentDeletion.js";

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
	.delete(
		validateCommentDeletion,
		commentsController.deleteComment
	)

export default commentsRouter;
