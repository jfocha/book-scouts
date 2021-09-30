// By sindhu and deepa 
// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type Book {
  bookId: String
  title: String!
  author: String
  description: String
  stockCount: int
  location:int
}

type User {
  _id: ID
  firstName :String,
  lastName :String,
  username: String!
  email: String!
  bookCount: Int
  booksCheckedOut: [Book]
}

type Borrow {
 person : User,
 books :[book],
 returned:Boolean
}

type Query{

  me:User
  user(username: String!): User
  books:Book
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  removeBook(bookId:String!):User
  checkoutBook(bookId:String!):User
  returnBook(bookId:String!):User

}

type Auth {
token: ID!
user: User
}
`;

// export the typeDefs
module.exports = typeDefs;