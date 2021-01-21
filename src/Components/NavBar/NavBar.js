import React from 'react';
import {Container, Navbar, NavbarBrand, Button} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import {BrowserRouter as Router, useHistory} from 'react-router-dom';
import actions from '../../redux/actions/index';

// Import store
import useWindowDimension from '../../Helpers/useWindowDimension';

// import icon
import brandIcon from '../../Assets/Icons/eSeaIcon.png';

export default function NavbarClient() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {md} = useWindowDimension();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const logout = () => {
    dispatch(actions.authActions.logout());
    history.push('/login');
  };

  const login = () => {
    history.push('/login');
  };

  return (
    <Router>
      <Navbar
        className="w-100 kumbh-sans bg-white kumbh-sans text-dark shadow justify-content-start sticky-top"
        light
        expand="md"
      >
        <Container className="d-flex justify-content-between align-items-center">
          <NavbarBrand style={{width: md ? '20%' : '15%'}}>
            <Button
              style={{
                width: '100%',
                minWidth: '75px',
                backgroundColor: '#fff',
                border: 'none',
              }}
              className="shadow-none"
            >
              <img src={brandIcon} className="img-fluid" alt="logo" />
            </Button>
          </NavbarBrand>
          {isLogin ? (
            <Button
              onClick={logout}
              color="esea-main"
              className="p-2 login-btn"
            >
              Logout
            </Button>
          ) : (
            <Button onClick={login} color="esea-main" className="p-2 login-btn">
              Login
            </Button>
          )}
        </Container>
      </Navbar>
    </Router>
  );
}
