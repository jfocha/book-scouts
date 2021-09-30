//Deepa 
const { Schema } = require('mongoose');


const bookSchema = new Schema({
    title: 
    {
        type: String,
        required: true,
    },
    author:
    {
        type: String
    },
    description: 
    {
        type: String,
        default :'None'
    },
    //ISBN number 
    bookId: {
        type: String,
        required: true,
    },
    stockCount: {
        type: Number,
	required :true,
    },
    location:{
        type:Number,
        required:true
    }   
}, { timestamps:true});

module.exports = bookSchema;