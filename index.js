const express = require("express");

// database
const Database = require("./database");

//initialization
const OurAPP = express();

OurAPP.get("/", (request,response) => {      //get-HTTP method
    response.json({ message: "Server is working!!!!"});
});

//root Route- localhost:3000


OurAPP.get("/book", (req, res) => {
    return res.json({ books: Database.Book});
});

OurAPP.listen(4000 , () => console.log("Server is running"));