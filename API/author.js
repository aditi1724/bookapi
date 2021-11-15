const Router = require("express").Router();
const AuthorModel = require("../schema/author");

// Route            - /author
// Des              - to get all authors 
// Access           - Public 
// Method           - GET
// Parameter/params - none
// Body             - none
Router.get("/author", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});


// Route            - /author/new
// Des              - to add new author
// Access           - Public 
// Method           - POST
// Parameter/params - none
Router.post("/author/new", (req,res) => {
    const {newAuthor} = req.body;

    AuthorModel.create(newAuthor);

    return res.json({ message: "Author added to the database" });
});


// TODO Student task
//Route             - /author/update
// Des              - update any details of the author
// Access           - Public 
// Method           - PUT
// Parameter/params - id
//params in the req.body are always in string format
Router.put(' ' , (req,res) => {
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

//Route             - /author/delete
// Des              - to delete an author 
// Access           - Public 
// Method           - DELETE
// Parameter/params - id
Router.delete("/author/delete/:id", (req, res) => {
    const {id} = req.params;

    const filteredAuthors = Database.Author.filter(
        (author) => author.id !== parseInt(id)
    );

    Database.Author = filteredAuthors;

    return res.json(Database.Author);
});


module.exports = Router;