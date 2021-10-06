// by Deepa Krishnan and sindhu Pillai
const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { countDocuments } = require("../models/User");
const { signToken } = require("../utils/auth");
import * as Stripe from "stripe";
// Add Stripe  Key
const stripe = require("stripe")("sk_test_51Jh10GKqUGoZm9h8G0dbProrGNcnlkcxGAHWLej8NVOkMkJOkLtjwAuREx5KpWRUl4jZpxcj7783JAwweyHLVUM800pFeRBzMB");


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
    // app.post("/create-payment-intent", async (req, res) => {
    //   const { items } = req.body;
    //   // Create a PaymentIntent with the order amount and currency
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: 1000,
    //     currency: "usd"
    //   });
    
    //   res.send({
    //     clientSecret: paymentIntent.client_secret
    //   });
    // });
    payFine: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne(context.user._id);
        if (!user) {
          throw new Error("User not found!!!");
        }
        //const { data } = args.bookId;
        // create
        const paymentIntents = await stripe.paymentIntents.create({
          payment_method_types: ["card"],
          amount: 1000,
          currency: "usd",
          mode: "payment",
          
        });
        return paymentIntents;
      }
      throw new AuthenticationError("You need to be loggedin!!");
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
      if (context.user) {
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
        throw new Error("You need to be logged in !!");
      }
    },
    // check out a book ,by bookId
    checkoutBook: async (parent, { bookId }, context) => {
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
      if (context.user) {
        if (!context.user.admin) {
          throw new AuthenticationError(
            "You need to be an admin to add a book"
          );
        }
        const foundBook = await Book.findById(bookId);
        if (foundBook) {
          const updatedBook = await Book.findByIdAndUpdate(bookId, {
            stockCount: parseInt(foundBook.stockCount - 1),
          });
          if (updatedBook.stockCount <= 0) {
            updatedBook.delete();
          }
        } else {
          throw new Error("Book Not found!! ");
        }
      } else {
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
  Book: {
    borrowers: async (parent) => {
      const borrowers = await User.find().where("_id").in(parent.borrowers);
      return borrowers;
    },
  },
};

module.exports = resolvers;
