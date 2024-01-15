import { Request, Response } from 'express';
import BookModel from '../models/bookModel';

class GetAllBooksController {
  getAllBooks = async (req: Request, res: Response) => {
    try {
      const books = await BookModel.find();

      if (books.length > 0) {
        return res.status(200).json(books);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default new GetAllBooksController();