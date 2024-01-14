import express from 'express';
import booksController from '../controllers/booksController';

const router = express.Router();

router.get("/books", booksController.getAllBooks);
router.get("/books/:id", booksController.getBookById);
router.post("/books/createBook", booksController.addBook);
router.put("/books/updateBook/:id", booksController.updateBookQuantity);
router.delete("/books/deleteBook/:id", booksController.deleteBook);

export default router;