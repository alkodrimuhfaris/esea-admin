import React, {useEffect, useState} from 'react';
import {Container, Col, Row, Media, Nav, NavItem} from 'reactstrap';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {FaPencilAlt, FaRegClipboard} from 'react-icons/fa';
import {FiUser} from 'react-icons/fi';
import {BsFillPeopleFill} from 'react-icons/bs';
import profileAction from '../../redux/actions/profile';
import NavBar from '../NavBar/NavBar';
import ProfileComponent from './Profile';
import ProductComponent from './Products';
import RegistrationComponent from './Registrations';
import useWindowDimension from '../../Helpers/useWindowDimension';
import placeholder from '../../Assets/Images/profile.jpg';

export default function Profile() {
  const {sm, lg} = useWindowDimension();
  const token = useSelector((state) => state.auth.token);
  // const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.getProfile.data);
  const userUpdated = useSelector((state) => state.updateProfile.success);
  const dispatch = useDispatch();
  const history = useHistory();
  const thisPath = useLocation().pathname;
  const [name, setName] = useState('');
  const [showAvatar, setShowAvatar] = useState('');
  const [choosenPath, setChoosenPath] = useState(0);

  useEffect(() => {
    switch (thisPath) {
      case '/admin': {
        setChoosenPath(0);
        break;
      }
      case '/product': {
        setChoosenPath(1);
        break;
      }
      case '/registration': {
        setChoosenPath(2);
        break;
      }
      default: {
        setChoosenPath(0);
        break;
      }
    }
    // if (auth.isLogin) {
    // }
  }, []);

  useEffect(() => {
    dispatch(profileAction.getProfile(token));
  }, [token]);

  useEffect(() => {
    if (userUpdated) {
      dispatch(profileAction.getProfile(token));
    }
  }, [userUpdated]);

  useEffect(() => {
    setName(user.name);
    setShowAvatar(
      user.avatar
        ? `${process.env.REACT_APP_URL_BACKEND}${user.avatar}`
        : placeholder,
    );
  }, [user]);

  const linkArr = [
    {
      name: 'My Profile',
      path: '/admin',
      Icon: ({color}) => (
        <FiUser color={color} className="rounded-circle img-center" />
      ),
      bgColor: {backgroundColor: '#456BF3'},
    },
    {
      name: 'Manage Products',
      path: '/product',
      Icon: ({color}) => (
        <FaRegClipboard color={color} className="rounded-circle img-center" />
      ),
      bgColor: {backgroundColor: '#F36F45'},
    },
    {
      name: 'Manage Registration',
      path: '/registration',
      Icon: ({color}) => (
        <BsFillPeopleFill color={color} className="rounded-circle img-center" />
      ),
      bgColor: {backgroundColor: '#F3456F'},
    },
  ];

  const component = (className = 'my-3') => {
    switch (thisPath) {
      case '/admin': {
        return <ProfileComponent className={className} />;
      }
      case '/product': {
        return <ProductComponent className={className} />;
      }
      case '/registration': {
        return <RegistrationComponent className={className} />;
      }
      default: {
        return <ProfileComponent className={className} />;
      }
    }
  };

  const heading = {
    title: () => {
      switch (thisPath) {
        case '/admin': {
          return 'My Profile';
        }
        case '/product': {
          return 'Manage All products';
        }
        case '/registration': {
          return 'Manage proposed partners';
        }
        default: {
          return 'My Profile';
        }
      }
    },
    subTitle: () => {
      switch (thisPath) {
        case '/admin': {
          return 'Manage your profile information';
        }
        case '/product': {
          return 'Manage all of eSea products';
        }
        case '/registration': {
          return 'List of all proposed partners';
        }
        default: {
          return 'Manage your profile information';
        }
      }
    },
  };

  const goToProfile = (e, index, path) => {
    e.preventDefault();
    setChoosenPath(index);
    history.push(path);
  };

  return (
    <>
      <NavBar />
      <Row
        className={sm ? 'no-gutters' : ''}
        style={{width: '100%', margin: '0'}}
      >
        <Col
          xs="12"
          md="3"
          className={`py-2 px-4 ${
            sm
              ? 'fixed-bottom justify-content-around w-100 bg-white bottom-shadow'
              : null
          }`}
        >
          {!sm ? (
            <Media className="align-items-center my-3">
              <Media left>
                <div className="position-relative rounded-circle overflow-hidden border-circle square3p5em">
                  <Media
                    object
                    src={showAvatar}
                    className="img-fluid img-center"
                  />
                </div>
              </Media>
              <Media body className="ml-3">
                <div className="strong h5">{name}</div>
                <div className="text-muted small">
                  <span>
                    <FaPencilAlt />
                  </span>{' '}
                  Ubah profil
                </div>
              </Media>
            </Media>
          ) : null}
          <Nav
            vertical={!sm}
            horizontal={sm}
            className="row justify-content-center"
          >
            {linkArr.map((item, index) => {
              const {name: pathName, path, Icon, bgColor} = item;
              // eslint-disable-next-line no-nested-ternary
              const color = !lg
                ? 'white'
                : index === choosenPath
                ? 'white'
                : 'black';
              // eslint-disable-next-line no-nested-ternary
              const background = !lg
                ? bgColor
                : index === choosenPath
                ? {backgroundColor: '#06D6A0'}
                : {backgroundColor: 'white'};

              return (
                <NavItem className="col-3 col-md-12">
                  <Media className="align-items-center my-2 w-100">
                    <Link
                      onClick={(e) => goToProfile(e, index, path)}
                      to="/admin"
                      style={{textDecoration: 'none'}}
                      className={`d-flex align-items-center ${
                        lg ? 'w-100 flex-column justify-content-center' : ''
                      }`}
                    >
                      <Media
                        left
                        className="position-relative square-1-5em rounded-circle"
                        style={background}
                      >
                        <Icon color={color} />
                      </Media>
                      {!lg ? (
                        <Media body className="ml-2">
                          <text
                            className={
                              choosenPath === index
                                ? 'small text-dark font-weight-bold'
                                : 'small text-dark '
                            }
                          >
                            {pathName}
                          </text>
                        </Media>
                      ) : null}
                    </Link>
                  </Media>
                </NavItem>
              );
            })}
          </Nav>
        </Col>
        <Col
          xs="12"
          md="9"
          style={{backgroundColor: '#f5f5f5', height: 'calc(100vh - 6.3em)'}}
          className={sm ? '' : 'p-5'}
        >
          <div
            className={`w-100 h-100 overflow-auto ${sm ? 'py-4 px-3' : 'p-5'}`}
            style={{backgroundColor: '#fff'}}
          >
            <div className="border-bottom pb-3">
              <div className="h4">{heading.title()}</div>
              <div className="text-muted small">{heading.subTitle()}</div>
            </div>
            <Container>{component()}</Container>
          </div>
        </Col>
      </Row>
    </>
  );
}
