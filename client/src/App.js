import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrimarySearchAppBar from '././components/Navbar'
import EnhancedTable from './components/BookTable';
import SimplePaper from './components/SearchedBooks';
import Cart from './components/Checkout';
import { setContext } from '@apollo/client/link/context';
import LandingPage from './components/LandingPage';
import NoMatch from './components/NoMatch';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Book: {
        fields: {
            merge: true,
        },
      },
    },
  }),
});

const App = () => {
  const [categories] = useState([
    { name: 'Book Scouts', description: "/" },
    { name: 'Search Books', description: "/search" },
    {
      name: 'My Account',
      description: "/account/:username?",
    },
    { name: 'Pay Page', description: "/pay" },

  ]);

  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  return (
    <ApolloProvider client={client}>
      <Router>
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
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/search" component={SimplePaper} />
              <Route exact path="/account/:username?" component={EnhancedTable} />
              <Route exact path="/pay" component={Cart} />

              <Route component={NoMatch} />
            </Switch>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;

