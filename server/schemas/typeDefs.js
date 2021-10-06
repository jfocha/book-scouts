// By sindhu and deepa 
// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type Book {
  _id:ID
  ISBN: String
  title: String
  author: String
  description: String
  stockCount: Int
  category:String
  borrowers:[User]
  

}

type User {
  _id: ID
  username: String!
  email: String!
  admin :User
  bookCount: Int
  booksCheckedOut: [Book]
  paid:Boolean
}
input BookInput{
  ISBN: String
  title: String!
  author: String
  description: String
  stockCount: Int
  category:String
  
}

type Query{

  me:User
  user(username: String!): User
  books:[Book]
  users:[User]
}
type Session{
  session :ID
}

type Auth {
token: ID!
user: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  removeBook(bookId:String!):Book
  checkoutBook(bookId:String!):Book
  returnBook(bookId:String!):Book
  addBook(input:BookInput!):Book
  payFine(bookId:String!):Session 
}


`;

// export the typeDefs
module.exports = typeDefs;
