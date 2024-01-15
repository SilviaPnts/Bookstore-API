import { Request, Response } from 'express';
import BookModel from '../models/bookModel';

class addBookController {
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
        return res.status(400).json({ error: 'Bad Request', details: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };
}

export default new addBookController();