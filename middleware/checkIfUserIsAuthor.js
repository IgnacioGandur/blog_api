import jwt from "jsonwebtoken";

async function checkIfUserIsAuthor(req, res, next) {
	if (!req.cookies.jwt) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized. Only users can access this route.",
		})
	}

	const { jwt: jwtToken } = req.cookies;
	const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);

	if (!decodedToken.isAuthor) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized. Only users that are authors can access this route.",
		})
	}

	next();
}

export default checkIfUserIsAuthor;
