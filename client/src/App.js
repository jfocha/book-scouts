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
import LandingPage from './components/LandingPage';
import Gallery from './components/Gallery';

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
  const [categories] = useState([
    { name: 'Book Scouts', description: <LandingPage /> },
    { name: 'Search Books', description: <SimplePaper /> },
    {
      name: 'My Account',
      description: <EnhancedTable />,
    },
    { name: 'Pay Page', description: <Cart /> },

  ]);

  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  return (
    <ApolloProvider client={client}>
      <div className="App">

        <header>
          <PrimarySearchAppBar
            component={'span'}
            categories={categories}
            setCurrentCategory={setCurrentCategory}
            currentCategory={currentCategory}
          ></PrimarySearchAppBar>
        </header>
        <main>
          <Gallery currentCategory={currentCategory}></Gallery>
        </main>
        {/* <div><SimplePaper /></div> */}
        {/* <div><EnhancedTable /></div> */}
        {/* <div><Cart /></div> */}

      </div>
    </ApolloProvider>
  );
};

export default App;

