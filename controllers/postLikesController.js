import jwt from "jsonwebtoken";
import likePostModel from "../db/likePost.js";

const postLikesController = {
	likePost: async (req, res) => {
		const { postId } = req.params;
		const { jwt: token } = req.cookies;
		const user = jwt.decode(token);
		const { id: userId } = user;
		const like = await likePostModel.likePost(postId, userId);

		res.json({
			success: true,
			message: "Post likes successfully!",
			like: like,
		})
	},

	removeLike: async (req, res) => {
		const { postId } = req.params;
		const { jwt: token } = req.cookies;
		const user = jwt.decode(token);
		const { id: userId } = user;
		const like = await likePostModel.removeLike(postId, userId);

		res.json({
			success: true,
			message: "Like removed from post successfully!",
			like: like
		})
	}
};

export default postLikesController;
