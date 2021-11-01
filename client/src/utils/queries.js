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
        _id
        author
        title
        description
    }
  }
}`;

// Query users and books they checked out 
export const QUERY_USERS =gql`
{
    users{
      _id
      username 
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
      author
      description
      borrowers{
        _id
        username
      }
    }
  }
`;
