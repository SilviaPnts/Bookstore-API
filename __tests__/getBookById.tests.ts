import supertest from 'supertest';
import app from '../src/app';
import BookModel from '../src/models/bookModel';

const request = supertest(app);

describe('GetBookByIdController', () => {
  let bookId: string;

  beforeAll(async () => {
    const bookData = {
      title: 'Test Book',
      author: 'Test Author',
      barcode: '293808310',
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

  it('should get a book by ID', async () => {
    const response = await request.get(`/books/getBookById/${bookId}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(bookId);
  });

  it('should handle internal server error', async () => {
    jest.spyOn(BookModel, 'find').mockImplementation(() => {
      throw new Error('Simulating an internal server error');
    });

    const response = await request.get(`/books/getBookById/invalid_id`);
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error');

    jest.restoreAllMocks();
  });

  it('should handle errors when retrieving a non-existing book', async () => {

    const nonExistingBookId = '65a429f7b1935161cc3248e9';

    const response = await request.get(`/books/getBookById/${nonExistingBookId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
  });
});
