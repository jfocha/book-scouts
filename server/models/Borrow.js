// Deepa 
const { Schema, SchemaTypes } = require('mongoose');

const borrowSchema = new Schema({
    
    person : {

        type:SchemaTypes.ObjectId,
        ref : 'User',
        required: true
    },
    book :
    {
        type:SchemaTypes.ObjectId,
        ref:'Book',
        required: true

    },
    returned : 
    {
        type: Boolean,
        default:false
    }
},
    { timestamps:true }


);