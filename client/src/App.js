import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
// import ApolloClient from 'apollo-boost';
import { useState } from 'react';
import ModalDialog from './components/ModalDialog';
import PrimarySearchAppBar from '././components/Navbar'
import EnhancedTable from './components/BookTable';
import SimplePaper from './components/SearchedBooks';
import Cart from './components/Checkout';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  // request: operation => {
  //   const token = localStorage.getItem('id_token');

  //   operation.setContext({
  //     headers: {
  //       authorization: token ? `Bearer ${token}` : ''
  //     }
  //   });
  // },
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  // declare a new state variable for modal open
  const [open, setOpen] = useState(true);

  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ApolloProvider client={client}>
    <div className="App">
      <div>
      <ModalDialog open={open} handleClose={handleClose} />
      <PrimarySearchAppBar />
      </div>
      <div><SimplePaper /></div>
      <div><EnhancedTable /></div>
      {/* <div><Cart /></div> */}
    </div>
    </ApolloProvider>
  );
};

export default App;

