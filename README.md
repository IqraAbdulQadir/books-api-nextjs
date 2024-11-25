

# Sample Books API

This project is a simple RESTful API built using **Node.js** and **Express** that provides access to a collection of sample books. It supports basic CRUD (Create, Read, Update, Delete) operations for managing books, including information like title, author, genre, and publication year.

## Features

- **GET**: Retrieve a list of all books or a specific book by its ID.
- **POST**: Add a new book to the collection.
- **PUT**: Update the details of an existing book.
- **DELETE**: Remove a book from the collection.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side API.
- **Express**: Web framework for building the API.
- **Postman/Insomnia**: Tools for testing the API endpoints.

## Installation & Setup

Follow the steps below to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sample-books-api.git
   cd sample-books-api
   ```

2. **Install dependencies:**
   Ensure you have **Node.js** installed, then run:
   ```bash
   npm install
   ```

3. **Start the server:**
   Run the following command to start the API server:
   ```bash
   npm start
   ```

   The server will start on `http://localhost:5000`.

4. **Test the API:**
   You can test the API using tools like **Postman** or **Insomnia**. Here are some sample requests:

   - **GET all books**:
     ```
     GET http://localhost:5000/api/books
     ```
   - **GET a specific book**:
     ```
     GET http://localhost:5000/api/books/:id
     ```
   - **POST a new book**:
     ```
     POST http://localhost:5000/api/books
     Body: {
       "title": "Book Title",
       "author": "Book Author",
       "genre": "Genre",
       "year": "2024"
     }
     ```
   - **PUT to update a book**:
     ```
     PUT http://localhost:5000/api/books/:id
     Body: {
       "title": "Updated Title",
       "author": "Updated Author",
       "genre": "Updated Genre",
       "year": "2025"
     }
     ```
   - **DELETE a book**:
     ```
     DELETE http://localhost:5000/api/books/:id
     ```

## API Endpoints

- **GET /api/books**: Fetches a list of all books.
- **GET /api/books/:id**: Fetches a single book by its ID.
- **POST /api/books**: Adds a new book to the collection.
- **PUT /api/books/:id**: Updates the details of an existing book.
- **DELETE /api/books/:id**: Deletes a book from the collection.

## Example Response

```json
{
  "id": "1",
  "title": "Sample Book Title",
  "author": "Sample Author",
  "genre": "Fiction",
  "year": 2024
}
```

## License

This project is open-source and available under the [MIT License](LICENSE).


This `README.md` provides a good overview of your **Sample Books API** project, explaining its purpose, how to install and run it, and examples of how to use the API.
