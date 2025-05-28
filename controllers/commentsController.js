import jwt from "jsonwebtoken";
import commentModel from "../db/comment.js";
import likeCommentModel from "../db/likeComment.js";

const commentsController = {
	createComment: async (req, res) => {
		const { postId } = req.params;
		const { content } = req.body;
		const { jwt: userJwt } = req.cookies;
		const user = jwt.decode(userJwt);
		const { id: userId } = user;

		const userComment = await commentModel.createComment(postId, content, userId);

		res.json({
			success: true,
			message: "Comment created successfully!",
			comment: userComment,
		})
	},

	deleteComment: async (req, res) => {
		const { commentId } = req.params;
		const comment = await commentModel.deleteComment(commentId);

		res.json({
			success: true,
			message: "Your comment was deleted successfully!",
			comment: comment,
		})
	},

	updateComment: async (req, res) => {
		const { commentId } = req.params;
		const { content } = req.body;
		const comment = await commentModel.updateComment(commentId, content);

		res.json({
			success: true,
			message: "Comment updated successfully!",
			comment: comment,
		})
	},

	likeComment: async (req, res) => {
		const { commentId } = req.params;
		const { jwt: token } = req.cookies;
		const user = jwt.decode(token);
		const { id: userId } = user;
		const like = await likeCommentModel.likeComment(commentId, userId);
		res.json({
			success: true,
			message: "Comment liked successfully!",
			like: like,
		})
	},

	deleteLike: async (req, res) => {
		const { jwt: token } = req.cookies;
		const { commentId } = req.params;
		const user = jwt.decode(token);
		const { id: userId } = user;
		const like = await likeCommentModel.deleteLike(commentId, userId);

		res.json({
			success: true,
			message: "Like removed successfully from comment!",
			like: like,
		})
	}
};

export default commentsController;
