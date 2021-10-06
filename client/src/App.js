import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { useState } from 'react';
import ModalDialog from './components/ModalDialog';
import PrimarySearchAppBar from '././components/Navbar'
import EnhancedTable from './components/BookTable';
import SimplePaper from './components/SearchedBooks';
import Cart from './components/Checkout';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const App = () => {
  // declare a new state variable for modal open
  const [open, setOpen] = useState(false);

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
      <div><Cart /></div>
    </div>
    </ApolloProvider>
  );
};

export default App;

