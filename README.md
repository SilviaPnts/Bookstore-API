# Bookstore-API

The Bookstore API allows the bookstore owner to manage the stock of her books. The syestem will allow her to add new books and to also delete books when they are sold.

# Features

- Add Books:
  - Endpoint: POST
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
  - Successful Response Code: 200
  - Error Code : 400(Bad Request), 409(Conflict), 500(Internal Server error)

- Delete Books:
  - Endpoint: DELETE
  - Successful Response Code: 204(No Content)
  - Error Code : 400(Bad Request), 404(Not Found), 500(Internal Server error)

- Get Books:
  - Endpoint: GET
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
  - Error Code : 204(No Content), 404(Not Found), 500(Internal Server error)

- Get Book By Id:
  - Endpoint: GET
  - Response:
  {
  "title": "IT",
  "author": "Stephen King",
  "quantity": 10
  "_id": "65a429f7b1935161cc3248e8",
  "__v": 0
  }
  - Successful Response Code: 200
  - Error Code : 204(No Content), 400(Bad Request), 404(Not Found), 500(Internal Server error)

- Update Book:
  - Endpoint: PUT
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

# Book Model
  - Title
  - Author
  - Barcode
  - Quantity

# Set up instructions
 - Clone repository
 - Run npm install
 - Run docker-compose up --build