import { Router } from "express";
import authRouter from "./authRouter.js";

const router = Router();

router.use("/auth/users", authRouter);

export default router;
