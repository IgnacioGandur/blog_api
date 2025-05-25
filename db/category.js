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

	async updateCategory(id, name, slug) {
		try {
			const category = this.prisma.category.update({
				where: {
					id: Number(id),
				},
				data: {
					name,
					slug
				}
			})

			return category;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when tyring to update the category name.");
		}
	}

	async checkIfCategoryExistsById(id) {
		try {
			const result = await this.prisma.category.findUnique({
				where: {
					id: Number(id),
				}
			})

			if (result) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to check if the category exists by it's id.");
		}
	}

	async deleteCategory(categoryId) {
		try {
			const category = await this.prisma.category.delete({
				where: {
					id: Number(categoryId),
				}
			});

			return category;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to delete a category.");
		}
	}

	async checkIfCategoryExistsById(categoryId) {
		try {
			const result = await this.prisma.category.findUnique({
				where: {
					id: Number(categoryId),
				}
			})

			if (result) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to check if the category exists by it's id.");
		}
	}
}

export default new Category(prisma);
