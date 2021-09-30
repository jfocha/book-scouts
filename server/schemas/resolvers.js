// by Deepa Krishnan and sindhu Pillai 
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password');
         
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password');
        
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password');
       
    }
   
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
     // check out a book 
  checkoutBook(parent,{bookId},context){

    if (context.user) {
    const checkoutBooks = await User.findOneAndUpdate(  
       { _id: context.user._id },
       // check for book id 
       // decrement the book count 
       { new: true, runValidators: true }
      );
      return checkoutBooks;
  }
  throw new AuthenticationError("checkout resolver function : -You need to be logged in!");    
  },
  removeBook: async (parent, { bookId }, context) => {
    if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: {bookId: bookId } } },
            { new: true }
        );
        return updatedUser;        
    }
    throw new AuthenticationError("You need to be logged in!");
  }   
}
}


module.exports = resolvers;
