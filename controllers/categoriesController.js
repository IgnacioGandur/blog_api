import categoryModel from "../db/category.js";

function createCategorySlug(name) {
	return name.replace(/ /g, "-").toLowerCase();
}

const categoriesController = {
	createCategory: async (req, res) => {
		const { name } = req.body;
		const slug = createCategorySlug(name);
		const category = await categoryModel.createCategory(name, slug);

		res.json({
			success: true,
			message: "Category created successfully!",
			category: category,
		})
	}
}
export default categoriesController;
