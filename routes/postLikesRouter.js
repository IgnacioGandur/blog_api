import { Router } from "express";
import postLikesController from "../controllers/postLikesController.js";
import validateLikeToPost from "../middleware/validators/validateLikeToPost.js";
import checkIfUserIsLogged from "../middleware/checkIfUserIsLogged.js";
import validateLikeToPostDeletion from "../middleware/validators/validateLikeToPostDeletion.js";

const postLikesRouter = Router({ mergeParams: true });

postLikesRouter
	.route("/")
	.post(
		checkIfUserIsLogged,
		validateLikeToPost,
		postLikesController.likePost
	)
	.delete(
		checkIfUserIsLogged,
		validateLikeToPostDeletion,
		postLikesController.removeLike
	);

export default postLikesRouter;
