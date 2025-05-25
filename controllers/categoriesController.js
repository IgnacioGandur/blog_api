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
	},

	updateCategory: async (req, res) => {
		const { name } = req.body;
		const { categoryId } = req.params;

		const slug = createCategorySlug(name);
		const updatedCategory = await categoryModel.updateCategory(categoryId, name, slug);

		res.json({
			success: true,
			message: "Category updated successfully!",
			category: updatedCategory,
		})
	},

	deleteCategory: async (req, res) => {
		const { categoryId } = req.params;
		const deletedCategory = await categoryModel.deleteCategory(categoryId);
		res.json({
			success: true,
			message: "The category was deleted successfully!",
			category: deletedCategory,
		})
	}
}
export default categoriesController;
