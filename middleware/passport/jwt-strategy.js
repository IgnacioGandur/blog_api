import { Strategy as JwtStrategy } from "passport-jwt";
import userModel from "../../db/user.js";

function cookieExtractor(req) {
    if (req && req.cookies) {
        const { jwt } = req.cookies;
        return jwt;
    }
}

const strategyOptions = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: cookieExtractor
}

async function verifyFunction(jwt_payload, done) {
    try {
        const { id } = jwt_payload;
        const user = await userModel.getUserById(id);

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}

const strategy = new JwtStrategy(strategyOptions, verifyFunction);

export default strategy;
