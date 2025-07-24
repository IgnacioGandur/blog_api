import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

async function seed() {
	try {
		console.log("🌱 Seeding database...");

		// Delete existing data (optional)
		await prisma.likeComment.deleteMany();
		await prisma.likePost.deleteMany();
		await prisma.comment.deleteMany();
		await prisma.post.deleteMany();
		await prisma.category.deleteMany();
		await prisma.user.deleteMany();

		// Create 3 users
		const users = await prisma.user.createMany({
			data: [
				{
					firstName: "Alice",
					lastName: "Smith",
					username: "alice_smith",
					password: "alicepass",
					isAuthor: true,
				},
				{
					firstName: "Bob",
					lastName: "Brown",
					username: "bob_brown",
					password: "bobpass",
					isAuthor: true,
				},
				{
					firstName: "Charlie",
					lastName: "Green",
					username: "charlie_green",
					password: "charliepass",
					isAuthor: false,
				}
			]
		});

		// Retrieve the created users with their IDs
		const [alice, bob, charlie] = await prisma.user.findMany({
			orderBy: { id: 'asc' }
		});

		// Create categories
		const category = await prisma.category.create({
			data: {
				name: "Development",
				slug: "development"
			}
		});

		// Alice creates a post
		const post1 = await prisma.post.create({
			data: {
				title: "Alice's First Post",
				content: "# Markdown Heading\n\nSome interesting content...",
				imageUrl: "https://picsum.photos/600",
				shortDescription: "Alice writes about development.",
				isPublished: true,
				userId: alice.id,
				categories: {
					connect: { id: category.id }
				}
			}
		});

		// Bob creates a post
		const post2 = await prisma.post.create({
			data: {
				title: "Bob's Insight",
				content: "## Another markdown post\n\nDetails and stuff...",
				imageUrl: "https://picsum.photos/601",
				shortDescription: "Thoughts from Bob.",
				isPublished: true,
				userId: bob.id,
				categories: {
					connect: { id: category.id }
				}
			}
		});

		// Charlie comments on both posts
		const comment1 = await prisma.comment.create({
			data: {
				content: "Great post, Alice!",
				userId: charlie.id,
				postId: post1.id
			}
		});

		const comment2 = await prisma.comment.create({
			data: {
				content: "Nice work, Bob!",
				userId: charlie.id,
				postId: post2.id
			}
		});

		// Likes
		await prisma.likePost.createMany({
			data: [
				{ postId: post1.id, userId: bob.id },     // Bob likes Alice's post
				{ postId: post1.id, userId: charlie.id }, // Charlie likes Alice's post
				{ postId: post2.id, userId: alice.id }    // Alice likes Bob's post
			]
		});

		await prisma.likeComment.createMany({
			data: [
				{ commentId: comment1.id, userId: alice.id },   // Alice likes Charlie's comment
				{ commentId: comment2.id, userId: bob.id }      // Bob likes Charlie's comment
			]
		});

		console.log("✅ Seeding complete.");
	} catch (err) {
		console.error("❌ Seed error:", err);
	} finally {
		await prisma.$disconnect();
	}
}

seed();
