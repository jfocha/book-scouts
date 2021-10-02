// import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';


// const httpLink = createHttpLink({
//   uri: 'http://localhost:3001/graphql',
// });

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });


import { useState } from 'react';
import ModalDialog from './components/ModalDialog';
import PrimarySearchAppBar from '././components/Navbar';

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
    <div className="App">
      <ModalDialog open={open} handleClose={handleClose} />
      <PrimarySearchAppBar />
    </div>
  );
};

export default App;

