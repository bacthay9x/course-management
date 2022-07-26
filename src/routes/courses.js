import express from "express";
import CourseController from "../app/controllers/CourseController.js";

const router = express.Router()

// newController.index()
router.get('/create', CourseController.create)
router.post('/store', CourseController.store)
router.post('/handle-form-actions', CourseController.handleFormActions)
router.post('/trash-handle-form-actions', CourseController.trashHandleFormActions)
router.get('/:id/edit', CourseController.edit)
router.put('/:id', CourseController.update)
router.patch('/:id/restore', CourseController.restore)
router.delete('/:id', CourseController.delete)
router.delete('/:id/force', CourseController.forceDelete)
router.get('/:slug', CourseController.show)




export default router