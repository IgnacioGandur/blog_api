import { validationResult } from "express-validator";

function validationMiddleware(validationChain) {
	return [
		validationChain,
		(req, res, next) => {
			const validationErrors = validationResult(req);

			if (!validationErrors.isEmpty()) {
				return res.status(422).json({
					success: false,
					message: "There's something wrong with the following input fields, please correct them:",
					errors: validationErrors.array(),
				})
			}

			next();
		},
	];
};

export default validationMiddleware;
