import prisma from "./prismaClient.js";

class Post {
	constructor(prisma) {
		this.prisma = prisma;
	}

	async createPost(
		userId,
		title,
		content,
		imageUrl,
		shortDescription,
		categories,
	) {
		try {
			const post = await this.prisma.post.create({
				data: {
					title,
					content,
					imageUrl,
					shortDescription,
					categories: {
						connect: categories
					},
					user: {
						connect: {
							id: Number(userId)
						}
					}
				}
			})
			return post;
		} catch (error) {
			console.log("Prisma error:", error);
			throw new Error("Something went wrong when trying to create a post.");
		}

	}

	async partialPostUpdate(postId, updatedPostPart, updatedValue) {
		try {
			const post = await this.prisma.post.update({
				where: {
					id: Number(postId),
				},
				data: {
					[updatedPostPart]: updatedValue
				},
				include: {
					categories: true
				}
			})

			return post;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to perform a partial post update.");
		}
	}

	async updatedPostCategories(postId, categories) {
		try {
			const post = await this.prisma.post.update({
				where: {
					id: Number(postId),
				},
				data: {
					categories: {
						set: categories,
					}
				},
				include: {
					categories: true
				}
			})

			return post;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to update a post's categories.");
		}
	}

	async checkIfPostExistsById(postId) {
		try {
			const result = await this.prisma.post.findUnique({
				where: {
					id: Number(postId),
				}
			})

			if (result) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to check if a post exists by it's id.");
		}
	}

	async deletePost(postId) {
		try {
			const post = await this.prisma.post.delete({
				where: {
					id: Number(postId)
				},
				include: {
					categories: true
				}
			})

			return post;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to delete a post by it's id.");
		}
	}
}


export default new Post(prisma);
