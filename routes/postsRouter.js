import { Router } from "express";
import postsController from "../controllers/postsController.js";
import checkIfUserIsAuthor from "../middleware/checkIfUserIsAuthor.js";
import validatePostCreation from "../middleware/validators/validatePostCreation.js";
import validatePartialPostUpdate from "../middleware/validators/validatePartialPostUpdate.js";
import validatePostDeletion from "../middleware/validators/validatePostDeletion.js";
import validateIfPostExists from "../middleware/validators/validateIfPostExists.js";
import commentsRouter from "./commentsRouter.js";
import postLikesRouter from "./postLikesRouter.js";
import checkIfUserIsLogged from "../middleware/checkIfUserIsLogged.js";

const postsRouter = Router({ mergeParams: true });

postsRouter
	.route("/")
	.get(postsController.getAllPosts)
	.post(
		checkIfUserIsLogged,
		checkIfUserIsAuthor,
		validatePostCreation,
		postsController.createPost
	);

postsRouter
	.route("/:postId")
	.get(
		validateIfPostExists,
		postsController.getPost
	)
	.patch(
		checkIfUserIsAuthor,
		validatePartialPostUpdate,
		postsController.partialPostUpdate
	)
	.delete(
		checkIfUserIsAuthor,
		validatePostDeletion,
		postsController.deletePost
	);

postsRouter
	.use("/:postId/comments", commentsRouter);

postsRouter
	.use("/:postId/likes", postLikesRouter);

export default postsRouter;
