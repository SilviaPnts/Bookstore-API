import { Request, Response } from 'express';
import BookModel from '../models/bookModel';

class BooksController{

  getAllBooks = async (req: Request, res: Response) => {
    try {
      const books = await BookModel.find();

      if (books.length > 0) {
        return res.status(200).json(books)
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  getBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const book = await BookModel.findById(id);
  
      if (book) {
        return res.status(200).json(book);
      } else {
        return res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };

  addBook = async (req: Request, res: Response) => {
    const { title, author, barcode, quantity } = req.body;
    try {
      const existingBook = await BookModel.findOne({ barcode });
  
      if (existingBook) {
        return res.status(409).json({ error: 'Book with the same barcode already exists' });
      } else {
        const newBook = new BookModel({ 
          title, 
          author, 
          barcode, 
          quantity 
        });
        await newBook.save();
        return res.status(201).json(newBook);
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation Error', details: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };

  updateBookQuantity = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
      const updatedBook = await BookModel.findById(id)
  
      if (updatedBook) {
        updatedBook.quantity = quantity;
        await updatedBook.save();
        return res.status(200).json(updatedBook);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation Error', details: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };

  deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedBook = await BookModel.findOneAndDelete({ _id: id });
  
      if (deletedBook) {
        return res.status(204).json();
      } else {
        return res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation Error', details: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };
}

export default new BooksController();