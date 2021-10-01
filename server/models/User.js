// Deepa 
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { SchemaMetaFieldDef } = require('graphql');


const userSchema = new Schema(
    {
        firstName :{
            type:String,
            
        },
        lastName :{
            type:String,
            
        }, 
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        admin:   {
            type: Boolean,
            default: false
        },
        // // set books checkout  to be an array of data that adheres to the bookSchema
        // booksCheckedOut: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref:'Book'
        //     }
        // ],
    }
    // ,Can be implememted in Graph ql 
    // // set this to use virtual below
    // {
    //     toJSON: {
    //         virtuals: true,
    //     },
    // }
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// // when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
// userSchema.virtual('bookCount').get(function () {
//     return this.booksCheckedOut.length;
// });

const User = model('User', userSchema);

module.exports = User;