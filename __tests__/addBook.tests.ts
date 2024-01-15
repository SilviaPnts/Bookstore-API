import supertest from 'supertest';
import app from '../src/app';

const request = supertest(app);

describe('AddBookController', () => {
  let bookId: string;

  afterAll(async () => {
    if (bookId) {  
      await request.delete(`/books/deleteBook/${bookId}`);
    }
  });

  it('should add a new book', async () => {
    const bookData = {
      title: 'Test Book',
      author: 'Test Author',
      barcode: '9832091319',
      quantity: 5,
    };

    const response = await request.post('/books/createBook').send(bookData);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(bookData);

    let bookId = response.body._id;

    await request.delete(`/books/deleteBook/${bookId}`);
  });

  it('should handle errors when adding a book with an existing barcode', async () => {

    const duplicateBookData = {
      title: 'Test Book',
      author: 'Test Author',
      barcode: '3728029',
      quantity: 10,
    };

    const createDuplicateBookResponse = await request.post('/books/createBook').send(duplicateBookData);
    expect(createDuplicateBookResponse.status).toBe(409);
  });

  it('should handle bad request (400) for invalid book data', async () => {
    const invalidBookData = {
      title: 'Test Book',
      author: 'Test Author',
      barcode: ["invalid_data"],
      quantity: -5,
    };

    const response = await request.post('/books/createBook').send(invalidBookData);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });
});
