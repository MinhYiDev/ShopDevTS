import express, { Request, Response } from "express";
import AccessController from "~/controller/AccessController";
import asyncHandller from "~/utils/asyncHandller";
const router = express.Router();

router.post("/register", asyncHandller(AccessController.register));
router.post("/login", asyncHandller(AccessController.login));

export default router;
