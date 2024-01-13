# Bookstore-API

The Bookstore API allows the bookstore owner to manage the stock of her books. The syestem will allow her to add new books and to also delete books when they are sold.

# Features

- Add Books:
  - Endpoint: POST
    - Request:
      {
      "title": "IT",
      "author": "Stephen King",
      "quantity": 10
      }
      - Response:
      {
      "title": "IT",
      "author": "Stephen King",
      "quantity": 10
      }
  - Successful Response Code: 200
  - Error Code : 400(Bad Request), 500(Internal Server error)

- Delete Books:
  - Endpoint: DELETE
  - Successful Response Code: 204(No Content)
  - Error Code : 400(Bad Request), 404(NOT FOUND), 500(Internal Server error)

- Get Books:
  - Endpoint: GET
    - Response:
      {
      "title": "IT",
      "author": "Stephen King",
      "quantity": 10
      },
      {
      "title": "Carrie",
      "author": "Stephen King",
      "quantity": 20
      }
  - Successful Response Code: 200
  - Error Code : 204(No Content), 404(Bad Request), 500(Internal Server error)

- Get Book By Barcode:
  - Endpoint: GET
  - Params: `barcode` (string, required): The unique identifier of the book. Length between 10 and 20 chars.
    - Response:
      {
      "title": "IT",
      "author": "Stephen King",
      "quantity": 10
      }
  - Successful Response Code: 200
  - Error Code : 204(No Content), 400(Bad Request), 404(Bad Request), 500(Internal Server error)

# Book Model
  - Title
  - Author
  - Barcode
  - Quantity

# Set up instructions
 - Clone repository
 - Run npm install
 - Run docker-compose up --build