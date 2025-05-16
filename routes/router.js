import { Router } from "express";
import authRouter from "./authRouter.js";
import postsRouter from "./postsRouter.js";
import usersRouter from "./usersRouter.js";

const router = Router();

router.use("/auth/users", authRouter);
router.use("/users", usersRouter);
router.use("/posts", postsRouter);

export default router;
