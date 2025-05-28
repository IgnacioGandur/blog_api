import prisma from "./prismaClient.js";

class LikeComment {
	constructor(prisma) {
		this.prisma = prisma;
	}

	async likeComment(commentId, userId) {
		try {
			const like = await this.prisma.likeComment.create({
				data: {
					comment: {
						connect: {
							id: Number(commentId)
						}
					},
					user: {
						connect: {
							id: Number(userId)
						}
					}
				}
			});

			return like;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to like a comment.");
		}
	}

	async deleteLike(commentId, userId) {
		try {
			const like = await this.prisma.likeComment.delete({
				where: {
					commentId_userId: {
						commentId: Number(commentId),
						userId: Number(userId),
					}
				}
			})

			return like;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to delete a like from a comment.");
		}
	}

	async checkIfLikeExists(commentId, userId) {
		try {
			const result = await this.prisma.likeComment.findUnique({
				where: {
					commentId_userId: {
						commentId: Number(commentId),
						userId: Number(userId),
					}
				}
			})

			if (result) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to chekc if a like in a comment exists.");
		}
	}
}

export default new LikeComment(prisma);
