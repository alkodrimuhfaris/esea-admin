import React from 'react';
import {Button} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import eSeaLogo from '../../Assets/Icons/eSeaIcon.png';

export default function Home() {
  const history = useHistory();
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <div className="home-container kumbh-sans d-flex flex-column justify-content-center align-item-center">
      <div className="d-flex logo-login-wrapper align-items-center justify-content-center">
        <img src={eSeaLogo} alt="eSea-Logo" className="img-fluid logo" />
      </div>
      {isLogin ? (
        <Button
          className="my-5 p-5"
          color="esea-main"
          onClick={() => history.push('/admin')}
        >
          Admin
        </Button>
      ) : (
        <Button
          className="my-5 p-5"
          color="esea-main"
          onClick={() => history.push('/login')}
        >
          Login
        </Button>
      )}
    </div>
  );
}
