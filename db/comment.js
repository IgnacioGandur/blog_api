import prisma from "./prismaClient.js";

class Comment {
	constructor(prisma) {
		this.prisma = prisma;
	}

	async createComment(postId, content, userId) {
		try {
			const comment = await this.prisma.comment.create({
				data: {
					content: content,
					post: {
						connect: {
							id: Number(postId)
						}
					},
					user: {
						connect: {
							id: Number(userId)
						}
					}
				},
			})

			return comment;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to create a comment.");
		}
	}

	async deleteComment(commentId) {
		try {
			const comment = await this.prisma.comment.delete({
				where: {
					id: Number(commentId),
				},
			})

			return comment;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to delete a comment.");
		}
	}

	async checkIfCommentExistsById(commentId) {
		try {
			const result = await this.prisma.comment.findUnique({
				where: {
					id: Number(commentId)
				},
			})

			if (result) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log("Prisma error:", error);
			throw new Error("Something went wrong when trying to check if a comment exists by it's id.");
		}
	}

	async getCommentById(commentId) {
		try {
			const comment = await this.prisma.comment.findUnique({
				where: {
					id: Number(commentId)
				}
			})

			return comment;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to get a comment by it's id.");
		}
	}

	async updateComment(commentId, content) {
		try {
			const comment = await this.prisma.comment.update({
				where: {
					id: Number(commentId)
				},
				data: {
					content
				}
			})

			return comment;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to update a comment.");
		}
	}
}

export default new Comment(prisma);
