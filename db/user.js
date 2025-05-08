import prisma from "./prismaClient.js";

class User {
	constructor(prisma) {
		this.prisma = prisma;
	}

	async createUser(username) {
		try {
			const user = await this.prisma.user.create({
				data: {
					username: username
				}
			})

			return user;
		} catch (error) {
			console.error("Prisma error: Something went wrong when trying to create a user.")
			throw new Error(error);
		}
	}

}

export default new User(prisma);
