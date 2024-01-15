import supertest from 'supertest';
import app from '../src/app';
import BookModel from '../src/models/bookModel';

const request = supertest(app);

describe('GetAllBooksController', () => {

  it('should get all books', async () => {
    const bookCountInDatabase = await BookModel.countDocuments();

    const response = await request.get('/books');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(bookCountInDatabase);
  });

  it('should handle internal server error', async () => {
    jest.spyOn(BookModel, 'find').mockImplementation(() => {
      throw new Error('Simulating an internal server error');
    });

    const response = await request.get('/books');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error');

    jest.restoreAllMocks();
  });

});