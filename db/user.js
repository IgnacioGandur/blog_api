import prisma from "./prismaClient.js";

class User {
	constructor(prisma) {
		this.prisma = prisma;
	}

	async registerUser(firstName, lastName, username, password) {
		try {
			const user = await this.prisma.user.create({
				omit: {
					password: true
				},
				data: {
					firstName,
					lastName,
					username,
					password
				}
			})

			return user;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to register a new user.");
		}
	}

}

export default new User(prisma);
