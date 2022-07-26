import express from "express";
import MeController from "../app/controllers/MeController.js";

const router = express.Router()

// newController.index()
router.get('/stored/courses', MeController.storedCourses)
router.get('/trash/courses', MeController.trashCourses)




export default router