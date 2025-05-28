import prisma from "./prismaClient.js";

class LikePost {
	constructor(prisma) {
		this.prisma = prisma;
	}

	async likePost(postId, userId) {
		try {
			const like = await this.prisma.likePost.create({
				data: {
					post: {
						connect: {
							id: Number(postId)
						},
					},
					user: {
						connect: {
							id: Number(userId)
						}
					}
				}
			})

			return like;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to like a post.");
		}
	}

	async checkIfUserAlreadyLikedPost(postId, userId) {
		try {
			const result = await this.prisma.likePost.findUnique({
				where: {
					postId_userId: {
						postId: Number(postId),
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
			throw new Error("Something went wrong when trying to check if a user already liked a post.");
		}
	}

	async checkIfLikeExists(postId, userId) {
		try {
			const result = await this.prisma.likePost.findUnique({
				where: {
					postId_userId: {
						postId: Number(postId),
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
			console.error("Prisma error: ", error);
			throw new Error("Something went wrong when trying to check if like exists.");
		}
	}

	async removeLike(postId, userId) {
		try {
			const like = await this.prisma.likePost.delete({
				where: {
					postId_userId: {
						postId: Number(postId),
						userId: Number(userId),
					}
				}
			})

			return like;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to remove a like from a post.");
		}
	}
}

export default new LikePost(prisma);
