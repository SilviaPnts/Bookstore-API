import { Request, Response } from 'express';
import BookModel from '../models/bookModel';

class DeleteBookController{

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

export default new DeleteBookController();