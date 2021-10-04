import gql from 'graphql-tag';

export const LOGIN_USER =gql`
mutation login($email:String!,$password:String!){
    login(email:$email,password:$password){
        token
        user{
        _id
        username
        }
    }
}`;
// First last name to be included ??
export const ADD_USER= gql`
mutation addUser($username:String!, $email:String!, $password:String!){
    addUser(username:$username,email:$email,password:$password){
        token
        user{
            _id
            username
            email
        }
       
    }
}`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;


export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }

 
`;

export const ADD_BOOK =gql` 
mutation addBook($addBookInput: BookInput!) {
    addBook(input: $addBookInput) {
      ISBN
      title
      author
      stockCount
      category
      _id
    }
  }
`;

export const CHECKOUT_BOOK =gql`
mutation checkoutBook($checkoutBookBookId: String!) {
    checkoutBook(bookId: $checkoutBookBookId) {
      _id
      ISBN
      title
      author
      stockCount
    }
  }`;