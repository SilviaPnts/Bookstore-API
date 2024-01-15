import { Request, Response } from 'express';
import BookModel from '../models/bookModel';

class UpdateBookController {
  updateBookQuantity = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
      const updatedBook = await BookModel.findById(id);

      if (updatedBook) {
        updatedBook.quantity = quantity;
        await updatedBook.save();
        return res.status(200).json(updatedBook);
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

export default new UpdateBookController();