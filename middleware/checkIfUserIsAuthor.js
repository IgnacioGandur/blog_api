import jwt from "jsonwebtoken";

async function checkIfUserIsAuthor(req, res, next) {
	if (!req.cookies.jwt) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized. Only authors can access this route.",
		})
	}

	const { jwt: jwtToken } = req.cookies;
	const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);

	console.log("the content of the decoded token is:", decodedToken);
	console.log("the content of the token in cookies is:", jwt);

	next();
}

export default checkIfUserIsAuthor;
