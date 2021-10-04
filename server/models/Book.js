//Deepa 
const { Schema, SchemaTypes,model } = require('mongoose');


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
    ISBN: {
        type: String,
        required: true,
    },
    stockCount: {
        type: Number,
	required :true,
    },
    // location:{
    //     type:Number,
    //     required:true
    // },
    category: {
        type: String,
        enum: ['IT','Management','Science','Mathematics','Fiction','Biography','Language','Arts','Other'],
        required: true
    }, 
    borrowers:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    
}, { timestamps:true});

module.exports =model('Book',bookSchema);