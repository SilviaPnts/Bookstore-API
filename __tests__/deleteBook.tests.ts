import supertest from 'supertest';
import app from '../src/app';
import BookModel from '../src/models/bookModel';

const request = supertest(app);

describe('DeleteBookController', () => {
  let bookId: string;

  beforeAll(async () => {
    const bookData = {
      title: 'Test Book',
      author: 'Test Author',
      barcode: '173947487298',
      quantity: 5,
    };

    const response = await request.post('/books/createBook').send(bookData);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(bookData);

    bookId = response.body._id;
  });

  afterAll(async () => {
    if (bookId) {
      await request.delete(`/books/deleteBook/${bookId}`);
    }
  });

  it('should delete a book', async () => {
    const deleteResponse = await request.delete(`/books/deleteBook/${bookId}`);
    expect(deleteResponse.status).toBe(204);
  });

  it('should handle errors when deleting a non-existing book', async () => {
    const nonExistingBookId = "65a41d18f1f0a58ef3fd22a0";

    const response = await request.delete(`/books/deleteBook/${nonExistingBookId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Book not found');
  });

  it('should handle internal server error', async () => {
    jest.spyOn(BookModel, 'findByIdAndDelete').mockImplementation(() => {
      throw new Error('Simulating an internal server error during deletion');
    });

    const response = await request.delete(`/books/deleteBook/invalid_id`);
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error');

    jest.restoreAllMocks();
  });
});
