import express from "express";
const router = express.Router();
import CheckAuth from "~/auth/checkAuth";
import AccessController from "~/controller/AccessController";
import asyncHandller from "~/utils/asyncHandller";

// middleware
router.use(asyncHandller(CheckAuth.ApiKey));
router.use(asyncHandller(CheckAuth.checkPre));

// METHOD
router.post("/register", asyncHandller(AccessController.register));
router.post("/login", asyncHandller(AccessController.login));

export default router;
