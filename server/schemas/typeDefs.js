// sindhu 
// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type Book {
  bookId: String
  authors: String
  description: String
  image: String
  stockCount: int
  link: String
  title: String
}

type User {
  _id: ID
  username: String!
  email: String!
  bookCount: Int
  booksCheckedOut: [Book]
}
type Query{

  me:User
  user(username: String!): User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  removeBook(bookId:String!):User
  checkoutBook(bookId:String!):User
}

type Auth {
token: ID!
user: User
}
`;

// export the typeDefs
module.exports = typeDefs;