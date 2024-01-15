# Bookstore-API

The Bookstore API allows the bookstore owner to manage the stock of her books. The syestem will allow her to add new books and to also delete books when they are sold.

# Book Model
  - Title
  - Author
  - Barcode
  - Quantity

# Features

- Add Books:
  - Endpoint: POST /books/createBook
    - Request:
      {
      "title": "IT",
      "author": "Stephen King",
      "barcode": "1234",
      "quantity": 10,
      "_id": "65a429f7b1935161cc3248e8",
      "__v": 0
      }
      - Response:
      {
      "title": "IT",
      "author": "Stephen King",
      "barcode": "1234",
      "quantity": 10,
      "_id": "65a429f7b1935161cc3248e8",
      "__v": 0
      }
  - Successful Response Code: 201
  - Error Code : 400(Bad Request), 409(Conflict), 500(Internal Server error)

- Delete Books:
  - Endpoint: DELETE /books/deleteBook/:id
  - Successful Response Code: 204(No Content)
  - Error Code : 400(Bad Request), 404(Not Found), 500(Internal Server error)

- Get All Books:
  - Endpoint: GET /books
    - Response:
      {
      "title": "IT",
      "author": "Stephen King",
      "barcode": "1234",
      "quantity": 10,
      "_id": "65a429f7b1935161cc3248e8",
      "__v": 0
      },
      {
      "title": "Carrie",
      "author": "Stephen King",
      "barcode": "5678",
      "quantity": 1,
      "_id": "65a429f7b1935161cc3248e8",
      "__v": 0
      }
  - Successful Response Code: 200
  - Error Code : 500(Internal Server error)

- Get Book By Id:
  - Endpoint: GET /books/getBookById/:id
  - Response:
  {
  "title": "IT",
  "author": "Stephen King",
  "quantity": 10
  "_id": "65a429f7b1935161cc3248e8",
  "__v": 0
  }
  - Successful Response Code: 200
  - Error Code : 404(Not Found), 500(Internal Server error)

- Update Book:
  - Endpoint: PUT /books/updateBook/:id
    - Request:
      {
      "quantity": 15
      }
    - Response:
      {
      "title": "IT",
      "author": "Stephen King",
      "barcode": "1234",
      "quantity": 15,
      "_id": "65a429f7b1935161cc3248e8",
      "__v": 0
      }
  - Successful Response Code: 200
  - Error Code : 400(Bad Request), 404(Not Found), 500(Internal Server error)

# Set up instructions
 - Clone repository
 - Run docker-compose up --build (this will run all the tests and start the application)