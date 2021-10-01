// by Deepa Krishnan and sindhu Pillai
const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find().select("-__v -password");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).select("-__v -password");
    },
    books: async () => {
      return await Book.find();
    },
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
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addBook: async (parent, args, context) => {
      console.log(context);
      // if(context.user){
      //   if(!context.user.admin){
      //   throw new AuthenticationError("You need to be an admin to add a book");
      //   }
      // }
      try {
        const newBook = await Book.create(args.input);
        return newBook;
      } catch (err) {
        throw new Error(err);
      }
    },
    // check out a book
    checkoutBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const foundBook = await Book.findById(bookId);
        if (foundBook.stockCount === 0) {
          throw new AuthenticationError("Sorry! No Books left!");
        }
        const isBorrowedByUser = await Book.findOne()
          .where("_id")
          .equals(bookId)
          .where("borrowers")
          .in(context.user._id);
        if (!isBorrowedByUser) {
          foundBook.borrowers.push(context.user._id);
          foundBook.stockCount--;
          await foundBook.save();
          return foundBook;
        }
        throw new Error(
          "You have already borrowed this book!"
        );
         
      }
      throw new AuthenticationError(
        "checkout resolver function : -You need to be logged in!"
      );
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    returnBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
          //decrement book count
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  User: {
    bookCount: (parent) => {
      return parent.booksCheckedOut.length;
    },
    booksCheckedOut: async (parent) => {
      const books = await Book.find().where("borrowers").in(parent._id);
      return books;
    },
  },
  Book:{

      borrowers : async (parent) =>{
        const borrowers = await User.find().where("_id").in(parent.borrowers)
         return borrowers;
      }
  }
};

module.exports = resolvers;
