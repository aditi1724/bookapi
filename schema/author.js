const mongoose = require("mongoose");

//Author Schema
const AuthorSchema = mongoose.Schema({
    id: {
        type: Number,
        require: true,
    
    },

    name:{
        type:String,
        require:true,
    },
   
    books: [String],
});

//Author Model
const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;