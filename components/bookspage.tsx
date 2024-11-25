// 'use client';

// import React, { useEffect, useState } from 'react';

// type Book = {
//   id: number;
//   title: string;
//   author: string;
//   available: boolean;
// };

// const BooksManager = () => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [formData, setFormData] = useState<Partial<Book>>({ title: '', author: '', available: true });

//   // Fetch books from the API
//   const fetchBooks = async () => {
//     try {
//       const response = await fetch('/api/books');
//       if (!response.ok) throw new Error('Failed to fetch books');
//       const data: Book[] = await response.json();
//       setBooks(data); // Ensure the response is an array of Book objects
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add a new book
//   const addBook = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.title || !formData.author) {
//       setError('Title and author are required.');
//       return;
//     }
//     try {
//       const response = await fetch('/api/books', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) throw new Error('Failed to add book');
//       const newBook: Book = await response.json();
//       setBooks((prev) => [...prev, newBook]);
//       setFormData({ title: '', author: '', available: true });
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   // Update a book
//   const updateBook = async (id: number) => {
//     try {
//       const existingBook = books.find((b) => b.id === id);
//       if (!existingBook) return;

//       const updatedBook = { ...existingBook, available: !existingBook.available };
//       const response = await fetch('/api/books', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedBook),
//       });
//       if (!response.ok) throw new Error('Failed to update book');
//       setBooks((prev) => prev.map((book) => (book.id === id ? updatedBook : book)));
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   // Delete a book
//   const deleteBook = async (id: number) => {
//     try {
//       const response = await fetch('/api/books', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ id }),
//       });
//       if (!response.ok) throw new Error('Failed to delete book');
//       setBooks((prev) => prev.filter((book) => book.id !== id));
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   if (loading) return <div className="text-center text-lg">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center">{error}</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold text-center mb-6">Books Manager</h1>

//       {/* Add Book Form */}
//       <form onSubmit={addBook} className="mb-8 bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             type="text"
//             placeholder="Title"
//             value={formData.title || ''}
//             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             className="p-2 border border-gray-300 rounded"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Author"
//             value={formData.author || ''}
//             onChange={(e) => setFormData({ ...formData, author: e.target.value })}
//             className="p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div className="mt-4 flex items-center">
//           <label className="mr-2">Available:</label>
//           <input
//             type="checkbox"
//             checked={formData.available || false}
//             onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
//             className="w-5 h-5"
//           />
//         </div>
//         <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//           Add Book
//         </button>
//       </form>

//       {/* Book List */}
//       <h2 className="text-2xl font-semibold mb-4">Book List</h2>
//       {books.length === 0 ? (
//         <p className="text-center">No books available</p>
//       ) : (
//         <ul className="space-y-4">
//   {books.map((book) => (
//     <li key={book.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
//       <div>
//         <h3 className="text-lg font-bold">{book.title}</h3>
//         <p className="text-sm text-gray-600">
//           by {book.author} ({book.available ? 'Available' : 'Not Available'})
//         </p>
//       </div>
//       <div className="space-x-2">
//         <button
//           onClick={() => updateBook(book.id)}
//           className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//         >
//           Toggle Availability
//         </button>
//         <button
//           onClick={() => deleteBook(book.id)}
//           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//         >
//           Delete
//         </button>
//       </div>
//     </li>
//   ))}
// </ul>

//       )}
//     </div>
//   );
// };

// export default BooksManager;

'use client'

import { useState, useEffect } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', available: true });
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Fetch books on component mount
  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  const handleAddBook = async () => {
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    });
    if (res.ok) {
      const message = await res.json();
      console.log(message);
      setBooks([...books, { ...newBook, id: books.length + 1 }]);
      setNewBook({ title: '', author: '', available: true });
    } else {
      console.error('Failed to add book:', res.statusText);
    }
  };

  const handleDeleteBook = async (id: number) => {
    const res = await fetch('/api/books', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
  };

  const handleUpdateBook = async () => {
    if (!editingBook) return;

    const res = await fetch('/api/books', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingBook),
    });
    if (res.ok) {
      const message = await res.json();
      console.log(message);
      setBooks(books.map(book => (book.id === editingBook.id ? editingBook : book)));
      setEditingBook(null);
    } else {
      console.error('Failed to update book:', res.statusText);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <ul className="mb-4">
        {books.map(book => (
          <li key={book.id} className="flex justify-between border p-2 mb-2">
            <div>
              <strong>{book.title}</strong> by {book.author} ({book.available ? 'Available' : 'Unavailable'})
            </div>
            <div>
              <button className="text-blue-500 mr-2" onClick={() => handleEditBook(book)}>Edit</button>
              <button className="text-red-500" onClick={() => handleDeleteBook(book.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={editingBook ? editingBook.title : newBook.title}
          onChange={e => editingBook ? setEditingBook({ ...editingBook, title: e.target.value }) : setNewBook({ ...newBook, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={editingBook ? editingBook.author : newBook.author}
          onChange={e => editingBook ? setEditingBook({ ...editingBook, author: e.target.value }) : setNewBook({ ...newBook, author: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={editingBook ? handleUpdateBook : handleAddBook}
        >
          {editingBook ? 'Update Book' : 'Add Book'}
        </button>
      </div>
    </div>
  );
}
