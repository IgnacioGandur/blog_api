import { Router } from "express";
import postsController from "../controllers/postsController.js";
import checkIfUserIsLogged from "../middleware/checkIfUserIsLogged.js";

// Routers
import commentsRouter from "./commentsRouter.js";
import postLikesRouter from "./postLikesRouter.js";

// Validators
import checkIfUserIsAuthor from "../middleware/checkIfUserIsAuthor.js";
import validatePostCreation from "../middleware/validators/post/validatePostCreation.js";
import validatePartialPostUpdate from "../middleware/validators/post/validatePartialPostUpdate.js";
import validatePostDeletion from "../middleware/validators/post/validatePostDeletion.js";
import validateIfPostExists from "../middleware/validators/post/validateIfPostExists.js";

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

postsRouter.use("/:postId/comments", commentsRouter);

postsRouter.use("/:postId/likes", postLikesRouter);

export default postsRouter;
