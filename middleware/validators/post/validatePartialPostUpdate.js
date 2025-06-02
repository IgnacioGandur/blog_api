import jwt from "jsonwebtoken";
import { body, param } from "express-validator";
import postModel from "../../../db/post.js";
import categoriesModel from "../../../db/category.js";
import validationMiddleware from "../validationMiddleware.js";

const imageExtensionsRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;

const validationChain = [

	param("postId")
		.trim()
		.notEmpty()
		.withMessage("The post id in the param can't be empty.")
		.bail()
		.isInt()
		.withMessage("The post id in the param should be an integer.")
		.bail()
		.custom(async (postId) => {
			const postExists = await postModel.checkIfPostExistsById(postId);

			if (!postExists) {
				throw new Error(`The post with an id of: '${postId}' doesn't exists.`);
			}

			return true;
		})
		.bail()
		.custom(async (postId, { req }) => {
			const post = await postModel.getPostById(postId);
			const { jwt: token } = req.cookies;
			const user = jwt.decode(token);
			const { id: userId } = user;

			if (post.userId !== userId) {
				throw new Error("Only the author of the post can perform updates to the post.");
			}

			return true;
		})

	,
	body("title")
		.trim()
		.notEmpty()
		.withMessage("The updated title field can't be empty.")
		.optional({ values: "falsy" })
	,
	body("content")
		.trim()
		.notEmpty()
		.withMessage("The updated content field can't be empty.")
		.optional({ values: "falsy" }),
	body("imageUrl")
		.trim()
		.notEmpty()
		.withMessage("The image URL field can't be empty.")
		.bail()
		.isURL()
		.withMessage("The image URL field must be a valid URL.")
		.bail()
		.matches(imageExtensionsRegex)
		.withMessage("The image URL field should point to an image url (jpg, jpeg, png, gif, bmp, or webp).")
		.optional({ values: "falsy" }),
	body("shortDescription")
		.trim()
		.notEmpty()
		.withMessage("The updated short description field can't be empty.")
		.optional({ values: "falsy" }),
	body("isPublished")
		.isBoolean()
		.withMessage("The is published field must be a boolean value.")
		.optional({ values: "falsy" }),
	body("categories.*.id")
		.trim()
		.notEmpty()
		.withMessage("The category id field can't be empty.")
		.bail()
		.isInt()
		.withMessage("The category id field should be an integer.")
		.bail()
		.customSanitizer((category) => {
			return Number(category);
		})
		.custom(async (categoryId) => {
			const categoryExists = await categoriesModel.checkIfCategoryExistsById(categoryId);

			if (!categoryExists) {
				throw new Error(`The category with an id of '${categoryId}' doesn't exists.`)
			}

			return true;
		})
		.optional({ values: "falsy" })
];

const validatePartialPostUpdate = validationMiddleware(validationChain);

export default validatePartialPostUpdate;
