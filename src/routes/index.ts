import express from 'express';
import getAllbooksController from '../controllers/getAllBooksController';
import getBookByIdController from '../controllers/getBookByIdController';
import addBookController from '../controllers/addBookController'
import updateBookController from '../controllers/updateBookController';
import deleteBookController from '../controllers/deleteBookController';

const router = express.Router();

router.get("/books", getAllbooksController.getAllBooks);
router.get("/books/getBookById/:id", getBookByIdController.getBookById);
router.post("/books/createBook", addBookController.addBook);
router.put("/books/updateBook/:id", updateBookController.updateBookQuantity);
router.delete("/books/deleteBook/:id", deleteBookController.deleteBook);

export default router;