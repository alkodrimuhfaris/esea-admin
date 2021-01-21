import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
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
import backgroundImage from '../../Assets/Images/signupBackground.png';
import useWindowDimension from '../../Helpers/useWindowDimension';
import ModalConfirm from '../Modal/ModalConfirm';

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required!.')
    .min(1, 'Name is too short.'),
  email: Yup.string()
    .email('Input the right format!')
    .required('Email is Required.'),
  password: Yup.string()
    .required('Input your password!')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
  phone: Yup.string()
    .required('Phone must be provided!')
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
      'Input right phone number format!',
    ),
});

const initialValue = {
  name: '',
  email: '',
  password: '',
  phone: '',
};

export default function Login2() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {sm, width, height} = useWindowDimension();
  const auth = useSelector((state) => state.auth);
  const signup = useSelector((state) => state.signup);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [propsNotif, setPropsNotif] = React.useState({});

  React.useEffect(() => {
    if (signup.isError || signup.userIsCreated) {
      setPropsNotif({
        useOneBtn: true,
        title: signup.isError ? 'Warning' : 'Success',
        content: signup.alertMsg,
        confirm: () => {
          setNotifOpen(false);
          if (signup.userIsCreated) {
            history.push('/login');
          }
        },
      });
      setNotifOpen(true);
    }
  }, [signup.isLoading]);

  const signupHandler = (values) => {
    dispatch(actions.signupActions.createUser(values));
  };

  return (
    <React.Fragment style={{height: '100vh'}} className="position-relative">
      <ModalConfirm modalOpen={notifOpen} {...propsNotif} />
      <div className="row no-gutters">
        {sm ? null : (
          <div className="col-12 col-md-6 col-lg-8 background-wrapper position-relative overflow-hidden">
            <div className="w-100 background-cover-login">&nbsp;</div>
            <img
              src={backgroundImage}
              alt="background-login"
              className={`position-absolute background-login ${
                (height * 2) / width > 0.6693 ? 'h-100' : 'w-100'
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
                  height / width > 0.6693 ? 'h-100' : 'w-100'
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
                  Sign up right now
                </text>
              </div>
            </div>

            <Formik
              initialValues={initialValue}
              validationSchema={schema}
              validateOnBlur
              onSubmit={(values) => {
                signupHandler(values);
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
                  <Form>
                    <FormGroup className="mt-1">
                      <Input
                        tag={Field}
                        value={values.name}
                        onChange={handleChange}
                        type="name"
                        name="name"
                        id="name"
                        placeholder="Name"
                        onBlur={handleBlur}
                      />
                      {errors.name || touched.name ? (
                        <div className="error-form">{errors.name}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="mt-1">
                      <Input
                        tag={Field}
                        value={values.email}
                        onChange={handleChange}
                        onBlir={handleBlur}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                      {errors.email || touched.email ? (
                        <div className="error-form">{errors.email}</div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="mt-1">
                      <Input
                        tag={Field}
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="name"
                        name="phone"
                        id="phone"
                        placeholder="Phone Number"
                      />
                      {errors.phone || touched.phone ? (
                        <div className="error-form">{errors.phone}</div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="mt-1">
                      <Input
                        tag={Field}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                      />
                      {errors.password || touched.password ? (
                        <div className="error-form">{errors.password}</div>
                      ) : null}
                    </FormGroup>
                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      className="mt-2 rounded-pill"
                      block
                      color="esea-main"
                    >
                      Register
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            <div className="text-center my-3">
              <text className={sm ? 'text-light' : 'text-dark'}>
                Already have eSea account?{' '}
                <span className="text-esea-main">
                  <Link to="/login" className="text-esea-main">
                    Login!
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
