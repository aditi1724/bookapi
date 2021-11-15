require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');


//API
const Book = require("./API/book");
const Author = require("./API/author");
const Publication = require("./API/publication");


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

// Microservices
OurAPP.use("/book", Book);
OurAPP.use("/author", Author);
OurAPP.use("/publication", Publication);



OurAPP.get("/", (request,response) => {      //get-HTTP method
    response.json({ message: "Server is working!!!!"});
});

//root Route- localhost:4000/

//No 2 routes should have a same structure eg /book/:bookID and /book/:category
// as they will collide

OurAPP.listen(4000 , () => console.log("Server is running"));