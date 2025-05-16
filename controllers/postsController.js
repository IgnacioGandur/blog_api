const postsController = {
	createPost: (req, res) => {
		res.json({
			success: true,
			message: "Api posts route reached!"
		})
	}
}

export default postsController;
