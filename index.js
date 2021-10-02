const express = require("express");

// database
const Database = require("./database");

//initialization
const OurAPP = express();

OurAPP.get("/", (request,response) => {      //get-HTTP method
    response.json({ message: "Server is working!!!!"});
});

//root Route- localhost:3000


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












OurAPP.listen(4000 , () => console.log("Server is running"));