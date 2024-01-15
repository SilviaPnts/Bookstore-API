import { Request, Response } from 'express';
import BookModel from '../models/bookModel';

class GetBookByIdController {
  getBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const book = await BookModel.findById(id);

      if (book) {
        return res.status(200).json(book);
      } else {
        return res.status(404).json({ error: 'Not Found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };
}

export default new GetBookByIdController();