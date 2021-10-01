const express = require("express");

//initialization
const OurAPP = express();

OurAPP.get("/", (request,response) => {      //get-HTTP method
    response.json({ message: "Request Served!!!!!!!!!"});
});

//root Route- localhost:3000


OurAPP.listen(4000 , () => console.log("Server is running"));