import { gql } from '@apollo/client';

// Query a User 
export const QUERY_ME = gql`
{
  me {
    _id
    username
    email
    bookCount
    booksCheckedOut {
        bookId
        author
        title
        description
        category
    }
  }
}`;

// Query users and books they checked out 
export const QUERY_USERS =gql`
{
    users{
      _id
      booksCheckedOut{
        title
        _id
        ISBN
        author
        borrowers{
          username
          _id
        }
      }
    }
  }
`;

// Query all Books 
export const QUERY_BOOK = gql`
{
    books {
      ISBN
      _id
      title
      borrowers{
        _id
        username
      }
    }
  }
`;

  // Query by userName 
export const QUERY_BYUSERNAME =gql`
    
     

`;