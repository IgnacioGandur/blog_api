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

	async getUserByUsername(username) {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					username
				}
			})

			return user;
		} catch (error) {
			console.error("Prisma error: ", error.message);
			throw new Error("Something went wrong when trying to get a user by it's username.");
		}
	}

	async getUserById(id) {
		try {
			const user = await this.prisma.user.findUnique({
				omit: {
					password: true,
				},
				where: {
					id: Number(id),
				}
			})

			return user;
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to get the user by it's id.");
		}
	}
	async checkIfUserExistsById(id) {
		try {
			const result = await this.prisma.user.findUnique({
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
			console.error("Prisma error: ", error);
			throw new Error("Something went wrong when trying to check if a user exists by it's id.");
		}
	}

	async checkIfUsernameIsAvailable(username) {
		try {
			const result = await this.prisma.user.findUnique({
				where: {
					username,
				}
			})

			if (result) {
				return false;
			} else {
				return true;
			}
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to check if the username is available.");
		}
	}

	async checkIfUserExistsByUsername(username) {
		try {
			const result = await this.prisma.user.findUnique({
				where: {
					username
				}
			})

			if (result) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error("Prisma error:", error);
			throw new Error("Something went wrong when trying to check if the user exists by it's username.");
		}
	}
}

export default new User(prisma);
