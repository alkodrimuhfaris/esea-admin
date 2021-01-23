import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Alert,
  Button,
  Form,
  Input,
  FormGroup,
  Container,
  // Row,
} from 'reactstrap';
import {Link, useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import {Formik, Field} from 'formik';
import eSeaLogo from '../../Assets/Icons/eSeaIcon.png';
import actions from '../../redux/actions/index';
import ModalLoading from '../Modal/ModalLoading';
import backgroundImage from '../../Assets/Images/fisherMan.jpg';
import useWindowDimension from '../../Helpers/useWindowDimension';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Input the right format!')
    .required('Email is Required.'),
  password: Yup.string()
    .required('Input your password!')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
});

const initialForm = {
  email: '',
  password: '',
};

export default function Login({location = {state: ''}}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {sm, width, height} = useWindowDimension();
  const auth = useSelector((state) => state.auth);

  React.useEffect(() => {
    const {state} = location;
    const path = state ? state.from.pathname : '/admin';
    if (auth.isLogin) {
      history.push(path);
    }
  }, [auth.isLogin]);

  const login = (values) => {
    dispatch(actions.authActions.login(values));
  };

  return (
    <React.Fragment style={{height: '100vh'}} className="position-relative">
      <div className="row no-gutters">
        {sm ? null : (
          <div className="col-12 col-md-6 col-lg-8 background-wrapper position-relative overflow-hidden">
            <div className="w-100 background-cover-login">&nbsp;</div>
            <img
              src={backgroundImage}
              alt="background-login"
              className={`position-absolute background-login ${
                (height * 2) / width > 1.5002 ? 'h-100' : 'w-100'
              }`}
            />
          </div>
        )}
        <div className="col-12 col-md-6 col-lg-4 position-relative">
          {sm ? (
            <div className="w-100 background-wrapper position-relative overflow-hidden">
              <div className="w-100 background-cover-login">&nbsp;</div>
              <img
                src={backgroundImage}
                alt="background-login"
                className={`position-absolute background-login ${
                  height / width > 1.5002 ? 'h-100' : 'w-100'
                }`}
              />
            </div>
          ) : null}
          <Container
            style={{
              width: 350,
              top: '50%',
              left: '50%',
              transform: `translateX(-50%) translateY(-50%)`,
            }}
            className="position-absolute container-login"
          >
            <div className="d-flex align-items-center flex-column">
              <div className="d-flex logo-login-wrapper align-items-center justify-content-center">
                <img
                  src={eSeaLogo}
                  alt="eSea-Logo"
                  className="img-fluid logo"
                />
              </div>
              <div className="text-center my-4 h6">
                <text className={sm ? 'text-light' : 'text-dark'}>
                  Please Log in with your Account
                </text>
              </div>
            </div>

            <Alert
              color={auth.isError ? 'danger' : 'esea-main'}
              isOpen={auth.isError || auth.alertMsg !== ''}
            >
              {auth.alertMsg}
            </Alert>
            <Formik
              initialValues={initialForm}
              validationSchema={schema}
              validateOnBlur
              onSubmit={(values) => {
                login(values);
              }}
            >
              {(props) => {
                const {
                  touched,
                  errors,
                  handleSubmit,
                  values,
                  handleChange,
                  handleBlur,
                } = props;

                return (
                  <Form onSubmit={handleSubmit}>
                    <FormGroup className="mt-2">
                      <Input
                        value={values.email}
                        tag={Field}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                      {errors.email || touched.email ? (
                        <div className="error-form">{errors.email}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="mt-2">
                      <Input
                        value={values.password}
                        tag={Field}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                      />
                      {errors.password || touched.password ? (
                        <div className="error-form">{errors.password}</div>
                      ) : null}
                    </FormGroup>
                    <div className="text-right">
                      <Link to="/" className="ml-auto text-esea-main">
                        Forgot Password
                      </Link>
                    </div>
                    <Button
                      type="submit"
                      className="my-3 rounded-pill"
                      block
                      color="esea-main"
                    >
                      Login
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            <div className="text-center my-3">
              <text className={sm ? 'text-light' : 'text-dark'}>
                Don&apos;t have a eSea account?{' '}
                <span className="text-esea-main">
                  <Link to="/signup" className="text-esea-main">
                    Register!
                  </Link>
                </span>
              </text>
            </div>
            <ModalLoading modalOpen={auth.isLoading} />
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
}
