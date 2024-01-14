import supertest from 'supertest';
import app from '../src/app';

const request = supertest(app);

describe('BooksController', () => {
  let bookId: string;

  afterAll(async () => {
    if (bookId) {
      await request.delete(`/books/deleteBook/${bookId}`);
    }
  });

  it('should get all books', async () => {
    const response = await request.get('/books');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(1);
  });

  it('should add a new book', async () => {
    const bookData = {
      title: 'Test Book',
      author: 'Test Author',
      barcode: '5678',
      quantity: 5,
    };

    const response = await request.post('/books/createBook').send(bookData);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Book');

    bookId = response.body._id;
  }); 

  it('should handle errors when adding a book with an existing barcode', async () => {
    const existingBookData = {
      title: 'Existing Book',
      author: 'Existing Author',
      barcode: '1234',
      quantity: 5,
    };

    const createExistingBookResponse = await request.post('/books/createBook').send(existingBookData);
    expect(createExistingBookResponse.status).toBe(409);

    const duplicateBookData = {
      title: 'Duplicate Book',
      author: 'Duplicate Author',
      barcode: '1234',
      quantity: 8,
    };

    const createDuplicateBookResponse = await request.post('/books/createBook').send(duplicateBookData);
    expect(createDuplicateBookResponse.status).toBe(409);
  });

  it('should get a book by ID', async () => {
    const response = await request.get(`/books/${bookId}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(bookId);
  });

  it('should update the quantity of a book', async () => {
    const updatedQuantity = 10;
    const response = await request.put(`/books/updateBook/${bookId}`).send({ quantity: updatedQuantity });
    expect(response.status).toBe(200);
    expect(response.body.quantity).toBe(updatedQuantity);
  });

  it('should handle errors when updating a non-existing book', async () => {

    const nonExistingBookId = '65a429f7b1935161cc3248e9';
    const updateNonExistingBookResponse = await request.put(`/books/updateBook/${nonExistingBookId}`).send({ quantity: 15 });
    expect(updateNonExistingBookResponse.status).toBe(404);
  });

  it('should handle errors when updating a book with invalid data', async () => {
    const invalidUpdateData = {
      quantity: 'invalidQuantity', // Quantity should be a number
    };

    const updateInvalidBookResponse = await request.put(`/books/updateBook/${bookId}`).send(invalidUpdateData);
    expect(updateInvalidBookResponse.status).toBe(400); // Expecting Bad Request
  });

  it('should delete a book', async () => {
    const response = await request.delete(`/books/deleteBook/${bookId}`);
    expect(response.status).toBe(204);

    // Ensure the book is deleted
    const getResponse = await request.get(`/books/${bookId}`);
    expect(getResponse.status).toBe(404);
  });
});
