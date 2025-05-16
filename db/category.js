import prisma from "./prismaClient.js";

class Category {
	constructor(prisma) {
		this.prisma = prisma;
	}

	async createCategory(name, slug) {
		try {
			const category = await this.prisma.category.create({
				data: {
					name,
					slug
				}
			})

			return category;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to create a new category.");
		}
	}

	async checkIfCategoryAlreadyExists(name) {
		try {
			const result = await this.prisma.category.findUnique({
				where: {
					name
				}
			})

			if (result) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error("Prisma error: ", error);
			throw new Error("Something went wrong when trying to check if the category already exists.");
		}
	}
}

export default new Category(prisma);
