import passport from "passport";
import strategy from "./jwt-strategy.js";

passport.use(strategy);
