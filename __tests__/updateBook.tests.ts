import supertest from 'supertest';
import app from '../src/app';
import BookModel from '../src/models/bookModel';

const request = supertest(app);

describe('UpdateBookController', () => {
  let bookId: string;

  beforeAll(async () => {
    const bookData = {
      title: 'Test Book',
      author: 'Test Author',
      barcode: '1001010',
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
      quantity: 'invalidQuantity',
    };

    const updateInvalidBookResponse = await request.put(`/books/updateBook/${bookId}`).send(invalidUpdateData);
    expect(updateInvalidBookResponse.status).toBe(400);
  });

  it('should handle internal server error', async () => {
    jest.spyOn(BookModel, 'findByIdAndUpdate').mockImplementation(() => {
      throw new Error('Simulating an internal server error');
    });
  
    const response = await request.put(`/books/updateBook/invalid_id`).send({ quantity: 10 });
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error');
  
    jest.restoreAllMocks();
  });  
});
