import express from "express";
const router = express.Router();
import auth from "../helpers/auth.js";
import ToughtController from "../controllers/ToughtController.js";

// helper
const checkAuth = auth;

router.get("/", ToughtController.showToughts);
router.get("/add", checkAuth, ToughtController.createTought);
router.get("/dashboard", checkAuth, ToughtController.showDashboard);
router.get("/edit/:id", checkAuth, ToughtController.editTought);
router.post("/edit", checkAuth, ToughtController.updateTought);
router.post("/remove", checkAuth, ToughtController.removeTought);
router.post("/add", checkAuth, ToughtController.createToughtSave);

export default router;
