import React from 'react';
import Home from './modules/home/Home';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core';
import {theme} from './Theme';
import {ApolloProvider} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://warpfrontendtestserver.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Redirect exact={true} path="/" to="/home" />
            <Route exact={true} path={['/home']} component={Home} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default App;
