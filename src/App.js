/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import PrivateRoute from './Components/Auth/PrivateRoute';
import Admin from './Components/Admin/Admin';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/SignUp';

import './App.css';

import authAction from './redux/actions/auth';
// Import store
import store from './redux/store';

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      if (!this.props.auth.isLogin) {
        const credential = {
          token: localStorage.getItem('token'),
        };
        this.props.setToken(credential);
      }
    }
  }

  componentDidUpdate() {
    if (localStorage.getItem('token')) {
      if (!this.props.auth.isLogin) {
        const credential = {
          token: localStorage.getItem('token'),
        };
        this.props.setToken(credential);
      }
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            Tuku! Shopping online with trusted seller! Shopping? Nengdi Wae!
          </title>
        </Helmet>
        <BrowserRouter>
          <Switch>
            <Redirect from="/" to="/admin" exact />
            <PrivateRoute path="/admin">
              <>
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>Admin || Tuku!</title>
                </Helmet>
                <Admin />
              </>
            </PrivateRoute>
            <PrivateRoute path="/product">
              <>
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>Admin || Tuku!</title>
                </Helmet>
                <Admin />
              </>
            </PrivateRoute>
            <PrivateRoute path="/registration">
              <>
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>Admin || Tuku!</title>
                </Helmet>
                <Admin />
              </>
            </PrivateRoute>
            <Route
              path="/login"
              render={(props) => (
                <>
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>Login || Tuku!</title>
                  </Helmet>
                  <Login {...props} />
                </>
              )}
              exact
            />
            <Route
              path="/signup"
              render={(props) => (
                <>
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>Sign Up || Tuku!</title>
                  </Helmet>
                  <Signup {...props} />
                </>
              )}
              exact
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  token: state.auth.token,
});

const mapDispatchToProps = {
  setToken: authAction.setToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App
