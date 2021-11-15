require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');


// database
const Database = require("./database"); //storing list of books auth publi

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connection established!"))
    .catch((err) => {
        console.log(err);
    });

 
//initialization
const OurAPP = express();

OurAPP.use(express.json());

OurAPP.get("/", (request,response) => {      //get-HTTP method
    response.json({ message: "Server is working!!!!"});
});

//root Route- localhost:4000/


// Route            - /book  
// Des              - to get all books
// Access           - Public ie. publically accessible
// Method           - GET
// Parameter/params - none
// Body             - none
OurAPP.get("/book", (req, res) => {
    return res.json({ books: Database.Book});
});


// Route            - /book/:bookID
// Des              - to get a book based on ISBN
// Access           - Public 
// Method           - GET
// Parameter/params - bookID
// Body             - none
OurAPP.get("/book/:bookID", (req, res) => {
    const getBook = Database.Book.filter(
        (book) => book.ISBN === req.params.bookID
    );

    return res.json({ book : getBook });
});


//No 2 routes should have a same structure eg /book/:bookID and /book/:category
// as they will collide


// Route            - /book/c/:category
// Des              - to get a list of all books based on category
// Access           - Public 
// Method           - GET
// Parameter/params - category
// Body             - none
OurAPP.get("/book/c/:category", (req, res) => {
    const getBook = Database.Book.filter((book) => 
      book.category.includes(req.params.category) 
    );

    return res.json({ book : getBook });
});

// Route            - /author
// Des              - to get all authors 
// Access           - Public 
// Method           - GET
// Parameter/params - none
// Body             - none
OurAPP.get("/author", (req, res) => {
    return res.json({ authors: Database.Author});
});



// Route            - /book/new
// Des              - to add new book
// Access           - Public 
// Method           - POST
// Parameter/params - none
OurAPP.post("/book/new", (req, res) => {
    const { newBook } = req.body;

    //add new data
    Database.Book.push(newBook);

    return res.json(Database.Book);
});

// Route            - /author/new
// Des              - to add new author
// Access           - Public 
// Method           - POST
// Parameter/params - none
OurAPP.post("/author/new", (req,res) => {
    const {newAuthor} = req.body;

    Database.Author.push(newAuthor);

    return res.json(Database.Author);
});


//TODO Student TAsk
// Route            - /publication/new
// Des              - to add new publication
// Access           - Public 
// Method           - POST
// Parameter/params - none
OurAPP.post("/publication/new" , (req, res) => {
    const {newPublication} = req.body;

    Database.Publication.push(newPublication);

    return res.json(Database.Publication);
});




//Route             - /book/update
// Des              - to update book details
// Access           - Public 
// Method           - PUT
// Parameter/params - ISBN
OurAPP.put("/book/update/:isbn",(req,res) => {
    const {updatedBook} = req.body;
    const {isbn} = req.params;

    const book = Database.Book.map((book) => {
        if(book.ISBN === isbn) {
            console.log({...book, ...updatedBook});
            return { ...book, ...updatedBook };
        }
        return book;
    });

    return res.json(book);
});


//Route             - /bookAuthor/update/:ISBN
// Des              - to update/add new author
// Access           - Public 
// Method           - PUT
// Parameter/params - ISBN
OurAPP.put('/bookAuthor/update/:isbn', (req,res) => {
    const {newAuthor} = req.body;
    const {isbn} = req.params;

    // updating book database object 
    Database.Book.forEach((book) => {
        // check if the ISBN match 
        if(book.ISBN === isbn){
            // check if the author already exist
            if(!book.authors.includes(newAuthor)){
                //if not, then push new author
                book.authors.push(newAuthor);
                return book;
            }
            //else return
            return book;
        }
        return book;
    });
    //updating author Database object
    Database.Author.forEach((author) => {
        //check if author ID match
        if(author.id === newAuthor) {
            //check if book already exist
            if(!author.books.includes(isbn)){
                //if not, then push new book
                return author.books.push(isbn);
            }
            //else return 
            return author;
        }
        return author;
    });

    return res.json({ book: Database.Book, author: Database.Author});
});


// TODO Student task
//Route             - /author/update
// Des              - update any details of the author
// Access           - Public 
// Method           - PUT
// Parameter/params - id
//params in the req.body are always in string format





OurAPP.put(' ' , (req,res) => {
    const {updateAuthor} = req.body;
    const {id} = req.params;

    const author = Database.Author.map((author) => {
        if(author.id === parseInt(id)){
            return {...author, ...updateAuthor };
        }
        return author;
    });
    return res.json(author);
});


//Route             - /book/delete/:ISBN
// Des              - to delete a book
// Access           - Public 
// Method           - DELETE
// Parameter/params - isbn
OurAPP.delete("/book/delete/:isbn", (req, res) => {
    const { isbn } = req.params;

    const filteredBooks = Database.Book.filter((book) => book.ISBN !== isbn);

    Database.Book = filteredBooks;

    return res.json(Database.Book);
});


//Route             - /book/deleter/author
// Des              - to delete an author from a book
// Access           - Public 
// Method           - DELETE
// Parameter/params - isbn , id
OurAPP.delete('/book/delete/author/:isbn/:id', (req, res) => {
    const {isbn , id} = req.params;

    //updating book database object
    Database.Book.forEach((book) => {
        if(book.ISBN === isbn){
            if(!book.authors.includes(parseInt(id))){
                return;
            }

            book.authors = book.authors.filter(
                (databaseId) => databaseId !== parseInt(id)
            );

            return book;
        }
        return book;
    });

    Database.Author.forEach((author) => {
        if(author.id === parseInt(id)){
            if(!author.books.includes(isbn)){
                return; 
            }
            author.books = author.books.filter((book) => book !== isbn);

            return author;
        }
    });

    return res.json({book: Database.Book, author: Database.Author });
});



//Route             - /author/delete
// Des              - to delete an author 
// Access           - Public 
// Method           - DELETE
// Parameter/params - id
OurAPP.delete("/author/delete/:id", (req, res) => {
    const {id} = req.params;

    const filteredAuthors = Database.Author.filter((author) => author.id !== parseInt(id));

    Database.Author = filteredAuthors;

    return res.json(Database.Author);
});



//Route             - /publication/delete
// Des              - to delete an publication
// Access           - Public 
// Method           - DELETE
// Parameter/params - id
OurAPP.delete('/publication/delete/:id', (req, res) => {
    const {id} = req.params;

    const filteredPub = Database.Publication.filter((pub) => pub.id !== parseInt(id));

    Database.Publication = filteredPub;

    return res.json(Database.Publication);
});


//Route             - /publication/delete/book
// Des              - to delete a book from a publication
// Access           - Public 
// Method           - DELETE
// Parameter/params - id, isbn
OurAPP.delete("/publication/delete/book/:isbn/:id", (req, res) => {
    const {isbn, id } = req.params;

    Database.Book.forEach((book) => {
        if(book.ISBN === isbn){
            book.publication = 0;
            return book;
        }
        return book;
    });

    Database.Publication.forEach((publication) => {
        if(publication.id= parseInt(id)){
            const filteredBooks = publication.books.filter(
                (book) => book !== isbn
            );
            publication.books = filteredBooks;
            return publication;
        }
        return publication;
    });

    return res.json({book: Database.Book, publication: Database.Publication});
});








OurAPP.listen(4000 , () => console.log("Server is running"));