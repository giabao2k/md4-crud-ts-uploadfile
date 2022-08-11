import { Router } from "express";
import BookController from "../controller/BookController";

export const router = Router();
router.get('/book/list', BookController.showListBook);
router.get('/book/create', BookController.showCreateForm);
router.post('/book/create', BookController.createBook);
router.get('/book/update/:id',BookController.showUpdateForm);
router.post('/book/update/:id',BookController.updateBook);

router.get('/book/delete/:id',BookController.showConfirmDeleteForm);
router.post('/book/delete/:id',BookController.deleteBook);