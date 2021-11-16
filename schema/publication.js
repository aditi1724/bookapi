const mongoose = require("mongoose");

//Publication Schema
const publicationSchema = mongoose.Schema({
    id:{
        type: Number,
        require:true,
     },
     name:{
         type:String,
         require:true,
     },
     books:[String],
 });

//Publication Model
const publicationModel = mongoose.model("publications", publicationSchema);

module.exports = publicationModel;