import  {Schema, model,} from 'mongoose'

interface IBook {
	title: string;
	author: string;
	barcode: string;
	quantity: number;
};

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  barcode: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 }
});

export const BookModel = model<IBook>('Book', bookSchema);

export default BookModel;
