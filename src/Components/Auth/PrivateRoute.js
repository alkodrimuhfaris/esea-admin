import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class PrivateRoute extends Component {
  componentDidMount() {
    console.log(this.props.location);
  }

  render() {
    return (
      <Route
        render={(props) => {
          const childWithProps = React.Children.map(
            this.props.children,
            (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, props);
              }
              return child;
            },
          );
          if (this.props.auth.isLogin) {
            console.log('cek dulu apakah masuk private route berulang')
            return childWithProps;
          }
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  alert: 'Login first!',
                  color: 'danger',
                  from: this.props.location,
                },
              }}
            />
          );
        }}
      />
    );
  }
}

const mapStateToProps = (state) => ({auth: state.auth});

export default connect(mapStateToProps)(PrivateRoute);
