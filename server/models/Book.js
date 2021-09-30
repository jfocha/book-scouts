const { Schema } = require('mongoose');


const bookSchema = new Schema({
    authors: [
        {
            type: String,
        },
    ],
    description: {
        type: String,
        required: true,
    },
    // saved book id from Amazon or google  if using endpoint 
    bookId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    stockCount: {
        type: Int,
	required :true,
    },
    title: {
        type: String,
        required: true,
    },
});

module.exports = bookSchema;