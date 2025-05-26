import jwt from "jsonwebtoken";
import postModel from "../db/post.js";

const postsController = {
	getPost: async (req, res) => {
		const { postId } = req.params;
		const post = await postModel.getPostById(postId);

		res.json({
			success: true,
			message: "Post retrieved successfully!",
			post: post,
		})
	},

	getAllPosts: async (req, res) => {
		const posts = await postModel.getAllPosts();

		res.json({
			success: true,
			message: "All posts retrieved successfully!",
			posts: posts,
		})
	},

	createPost: async (req, res) => {
		const {
			title,
			content,
			imageUrl,
			shortDescription,
			categories
		} = req.body;
		const { jwt: token } = req.cookies;
		const decodedToken = jwt.decode(token);
		const { id: userId } = decodedToken;
		const post = await postModel.createPost(
			userId,
			title,
			content,
			imageUrl,
			shortDescription,
			categories,
		);
		res.json({
			success: true,
			message: "Post created successfully!",
			post: post,
		})
	},

	partialPostUpdate: async (req, res) => {
		const { postId } = req.params;
		const {
			title,
			content,
			imageUrl,
			shortDescription,
			isPublished,
			categories
		} = req.body;

		let updatedPost = undefined;

		if (title) {
			updatedPost = await postModel.partialPostUpdate(postId, "title", title);
		}

		if (content) {
			updatedPost = await postModel.partialPostUpdate(postId, "content", content);
		}

		if (imageUrl) {
			updatedPost = await postModel.partialPostUpdate(postId, "imageUrl", imageUrl);
		}

		if (shortDescription) {
			updatedPost = await postModel.partialPostUpdate(postId, "shortDescription", shortDescription);
		}

		if (isPublished) {
			updatedPost = await postModel.partialPostUpdate(postId, "isPublished", isPublished);
		}

		if (categories) {
			updatedPost = await postModel.updatedPostCategories(postId, categories);
		}

		res.json({
			success: true,
			message: "Partial post update performed correctly!",
			post: updatedPost,
		})
	},

	deletePost: async (req, res) => {
		const { postId } = req.params;

		const post = await postModel.deletePost(postId);

		res.json({
			success: true,
			message: "The post was deleted successfully!",
			post: post,
		})
	}
}

export default postsController;
