import React from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './utils/auth';
import Homepage from './components/Homepage';
import Workspace from './components/Workspace';
import NoMatch from './components/NoMatch';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token') || "";
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const loggedIn = (Auth.loggedIn());

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path='/'> 
            {loggedIn ? <Redirect to ="/workspace" /> : <Homepage />}
          </Route>         
          <Route exact path='/workspace'>
            {loggedIn ? <Workspace /> : <Redirect to ="/" />}
          </Route>
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
