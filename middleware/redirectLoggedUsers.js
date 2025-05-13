function redirectLoggedUser(req, res, next) {
	if (req.cookies.jwt) {
		res.status(422).json({
			success: true,
			message: "This route is only for users that are not logged."
		})
	} else {
		next();
	}
}

export default redirectLoggedUser;
