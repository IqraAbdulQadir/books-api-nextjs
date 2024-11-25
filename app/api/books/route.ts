import { NextResponse } from "next/server";


let books = [
  {
    id: 1,
    title: "Harry Potter",
    author: "J.K Rowling",
    available: true,
  },

  {
    id: 2,
    title: "The Hobbit",
    author: "J.R.R Tolkien",
    available: true,
  },

  {
    id: 3,
    title: "The Lord of the Rings",
    author: 'J.R.R Tolkien',
    available: false,
  },
];

export async function GET () {
  
    console.log('API HAS BEEN CONNECTED');
    try {
        
        return NextResponse.json(books, { status: 200});
    }
    catch (error) { 
        return NextResponse.json(
            {message: "Error fetching books"},
            { status: 500 }
        );
};
};


  

export async function POST (request : Request) {
    try {
        const newBook = await request.json();
        books.push({...newBook, id: books.length + 1});
        return NextResponse.json(
            {message: "Books added sucessfully"},
            {status: 202},
        )
    }

    catch(error) {
        return NextResponse.json(
            {message: "Error adding book"},
            {status: 500},
        );
    };
};

export async function PUT (request: Request) {
    try {
        const updatedBook = await request.json();
        books = books.map(book=> (book.id === updatedBook.id ? updatedBook : book ) );
        return NextResponse.json(
            {message: "Book sucessfully updated"},
            {status:200},
        );
    }

    catch(error) {
        return NextResponse.json(
            {message: "Error updating books"},
            {status: 500}
        )
    }

}

export async function DELETE (request: Request) {
    try {
      const { id } = await request.json();
      books = books.filter(book => book.id !== id);
      return NextResponse.json(
        { message: "Book deleted successfully" },
        {status: 200},
      )

    }

    catch (error) {
        return NextResponse.json (
            {message: "Error deleting book"},
            {status: 200},
        )
    }

}

