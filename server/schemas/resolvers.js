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
    // Add Book to Library - Book details passed in args
    addBook: async (parent, args, context) => {
      
      if (context.user) 
      {
        if (!context.user.admin) {
          throw new AuthenticationError(
            "You need to be an admin to add a book"
          );
        }
          
        try {
            const newBook = await Book.create(args.input);
            return newBook;
          } catch (err) {
            throw new Error(err);
        }
        throw new Error("You need to be logged in !!")
      }
    },
    // check out a book ,by bookId
    checkoutBook: async (parent, { bookId }, context) => {
      console.log("what is this?" + bookId)
      if (context.user) {
        const foundBook = await Book.findById(bookId);
        if (foundBook.stockCount === 0) {
          throw new Error("Sorry! No Books left!");
        }
        if (context.user._id.bookCount > 3) {
          throw new Error(
            "You have exceed the limit! Please return the books that you borrowed inorder to checkout"
          );
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
        throw new Error("You have already borrowed this book!");
      }
      throw new AuthenticationError(
        "checkout resolver function : -You need to be logged in!"
      );
    },

    // remove a book from Library by bookId
    removeBook: async (parent, { bookId }, context) => {
      console.log("removeBook " + bookId);
      if (context.user) 
      {
        if (!context.user.admin) {
          throw new AuthenticationError(
            "You need to be an admin to add a book"
          );
        }
      const foundBook = await Book.findById(bookId);
      if(foundBook)
          {
              const updatedBook = await Book.findByIdAndUpdate(bookId,{stockCount:parseInt(foundBook.stockCount-1)});
              if(updatedBook.stockCount<=0){
                    updatedBook.delete();
              }
          }
          else {
          throw new Error("Book Not found!! ");  }
      }      
      else{  
      throw new AuthenticationError("You need to be logged in!");
      }
    },

    //return books by book Id
    returnBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const foundBook = await Book.findById(bookId);
        const isBorrowedByUser = await Book.findOne()
          .where("_id")
          .equals(bookId)
          .where("borrowers")
          .in(context.user._id);
        if (isBorrowedByUser) {
          foundBook.stockCount++;
          foundBook.borrowers.pull(context.user._id);
          await foundBook.save();
          return foundBook;
        }
        throw new Error("You have not borrowed this book!");
      }
      throw new AuthenticationError(
        "checkout resolver function : -You need to be logged in!"
      );
    }
  },
  User: {
    bookCount: (parent) => {
      return parent.booksCheckedOut;
    },
    booksCheckedOut: async (parent) => {
      const books = await Book.find().where("borrowers").in(parent._id);
      return books;
    },
  },
  Book: {
    borrowers: async (parent) => {
      const borrowers = await User.find().where("_id").in(parent.borrowers);
      return borrowers;
    },
  },
};

module.exports = resolvers;
