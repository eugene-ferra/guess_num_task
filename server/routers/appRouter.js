import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { guess, startGame, register } from "../controllers/appController.js";

const router = express.Router();

router.post("/start_game", verifyToken(), startGame);
router.post("/guess", verifyToken(), guess);
router.post("/register", verifyToken(), register);

export default router;
