# Bookstore-API

The Bookstore API allows the bookstore owner to manage the stock of her books. The system will allow her to add new books and to also delete books when they are sold.

# Book Model
  - Title: String
  - Author: String
  - Barcode: String
  - Quantity: String

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

# Service-Notifier Interface Documentation

The `Service-Notifier Interface` is the data structure used to notify the `service-notifier` when stock is running low.

Properties:

  - Title: String
  - Author: String
  - Barcode: String
  - Quantity: String
  - _id: String
  - __v: Number

Payload:
{
  "title": "IT",
  "author": "Stephen King",
  "barcode": "1234",
  "quantity": 2,
  "_id": "65a429f7b1935161cc3248e8",
  "__v": 0
}

# Future Improvements

- Add Authentication and Authorization to make sure we can verify the user trying to access a resource 
  and check that user has necessary permission to perform an action or access a resource.

- To make the error messages more helpful when something goes wrong in the application we could use custom error codes that give specific details about why an error happened.
  This way, it becomes easier for developers to figure out what went wrong and fix it.

- Integrating tools such as Grafana for performance monitoring can provide insights into the health and performance of the application.

- Continuous Integration (CI), Continuous Deployment (CD), and automated testing with tools like Jenkins.

# Epic description

If this were to be an epic some things to include would be a list of all endpoints that need to be implemented with all the required specifications.

Such as:

- Mandatory fields for request body for example.
- Complete list of errors that need to be handled.
- Database schema.
- How the response should look like.
- Specify if cache and cache dependencies are needed.
- Create a task to check if any common code is used among all endpoint and implement code in a shared folder if needed.

It would be beneficial to have a link in each story(each endpoint has its story ticket with sub-tasks) to a documentation page or design branch where all the specifications above are listed.

# Set up instructions
 - Clone repository
 - Run docker-compose up --build (this will run all the tests and start the application)