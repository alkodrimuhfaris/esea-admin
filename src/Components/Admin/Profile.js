import React, {useEffect, useState} from 'react';
import {
  Input,
  Col,
  Row,
  Media,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {Formik, Field} from 'formik';
import {AiFillCloseCircle} from 'react-icons/ai';
import placeholder from '../../Assets/Images/profile.jpg';
import profileAction from '../../redux/actions/profile';
import ModalLoading from '../Modal/ModalLoading';
import ModalConfirm from '../Modal/ModalConfirm';
import useWindowDimension from '../../Helpers/useWindowDimension';
import ChangePassword from './ChangePassword';

const schema = Yup.object().shape({
  name: Yup.string('Input the right value!')
    .min(2, 'Name is too short!')
    .nullable(),
  email: Yup.string('Input the right value!')
    .email('Input valid email!')
    .nullable(),
  phone: Yup.string('Input the right value!')
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
      'Input right phone number format!',
    )
    .nullable(),
});

export default function Profile() {
  const {md} = useWindowDimension();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.getProfile.data);
  const profile = useSelector((state) => state.getProfile);
  const updateProfile = useSelector((state) => state.updateProfile);
  const userUpdated = useSelector((state) => state.updateProfile.success);
  const delAvatar = useSelector((state) => state.deleteAvatar);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState({
    uriAvatar: placeholder,
    file: {},
  });
  const [notifSuccess, setNotifSuccess] = useState(false);
  const [propsNotifSuccess, setPropsNotifSuccess] = useState({});
  const [notifForImg, setNotifForImg] = useState(false);
  const [propsNotifImg, setPropsNotifImg] = useState({});
  const [notifDeleteAva, setNotifDeleteAva] = useState(false);
  const [propsNotifAvaDelete, setPropsNotifDeleteAva] = useState({});

  useEffect(() => {
    dispatch(profileAction.getProfile(token));
    return () => {
      // dispatch(profileAction.clearPasswordMessage());
      dispatch(profileAction.clearUpdateMessage());
      dispatch(profileAction.clearDelAvaMessage());
    };
  }, [token]);

  useEffect(() => {
    if (userUpdated || updateProfile.error) {
      dispatch(profileAction.getProfile(token));
      setPropsNotifSuccess({
        useOneBtn: true,
        title: userUpdated ? 'Success!' : 'Failed',
        content: updateProfile.message,
        confirm: () => {
          dispatch(profileAction.clearUpdateMessage());
          setNotifSuccess(false);
        },
      });
      setNotifSuccess(true);
    }
  }, [updateProfile.pending]);

  useEffect(() => {
    setAvatar({
      uriAvatar: user.avatar
        ? `${process.env.REACT_APP_URL_BACKEND}/${user.avatar}`
        : placeholder,
      fromDB: true,
      file: {},
    });
  }, [user]);

  useEffect(() => {
    if (delAvatar.success || delAvatar.error) {
      dispatch(profileAction.getProfile(token));
      setPropsNotifDeleteAva({
        useOneBtn: true,
        title: delAvatar.success ? 'Success!' : 'Fail!',
        content: delAvatar.message,
        confirm: () => {
          dispatch(profileAction.clearDelAvaMessage());
          setNotifDeleteAva(false);
        },
      });
      setNotifDeleteAva(true);
    }
  }, [delAvatar.pending]);

  const saveChange = (e) => {
    // eslint-disable-next-line no-undef
    const formData = new FormData();
    formData.append('avatar', avatar.file);
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(e)) {
      if (value) {
        formData.append(key, value);
      }
    }
    dispatch(profileAction.updateProfile(token, formData));
  };

  const avatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const [file] = event.target.files;
      if (file.size > 500 * 1024) {
        setPropsNotifImg({
          title: 'Warning!',
          content: 'Avatar size can not be more than 5 MB!',
          close: () => setNotifForImg(false),
          confirm: () => setNotifForImg(false),
        });
        setNotifForImg(true);
      } else {
        setAvatar({
          uriAvatar: URL.createObjectURL(file),
          file,
        });
      }
    }
  };

  const deleteAvatar = () => {
    if (avatar.fromDB) {
      dispatch(profileAction.deleteAvatar(token));
    }
    setAvatar({
      uriAvatar: placeholder,
      file: {},
    });
    setNotifDeleteAva(false);
  };

  const openDelAva = (e) => {
    e.preventDefault();
    setPropsNotifDeleteAva({
      title: 'Warning!',
      content: 'Are you sure want to delete your avatar?',
      close: () => setNotifDeleteAva(false),
      confirm: () => deleteAvatar(),
    });
    setNotifDeleteAva(true);
  };

  const initialValue = {
    name: user.name,
    email: user.email,
    phone: user.phone,
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValue}
        validationSchema={schema}
        validateOnBlur
        onSubmit={(values) => {
          saveChange(values);
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
            <Form className="my-3 montserrat" onSubmit={handleSubmit}>
              <Row>
                <Col xs="12" md="8" className="mb-3">
                  <FormGroup row>
                    <Label
                      className={!md ? 'text-right' : 'text-left'}
                      for="name"
                      sm={3}
                      xs={12}
                    >
                      Name
                    </Label>
                    <Col sm={9}>
                      <Input
                        tag={Field}
                        type="name"
                        name="name"
                        id="name"
                        placeholder="Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        valid={!errors.name && touched.name}
                        invalid={errors.name}
                      />
                      {errors.name || touched.name ? (
                        <FormFeedback invalid>{errors.name}</FormFeedback>
                      ) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      className={!md ? 'text-right' : 'text-left'}
                      for="email"
                      sm={3}
                      xs={12}
                    >
                      Email
                    </Label>
                    <Col sm={9}>
                      <Input
                        tag={Field}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        valid={!errors.email && touched.email}
                        invalid={errors.email}
                      />
                      {errors.email || touched.email ? (
                        <FormFeedback invalid>{errors.email}</FormFeedback>
                      ) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      className={!md ? 'text-right' : 'text-left'}
                      for="phone"
                      sm={3}
                      xs={12}
                    >
                      Phone Number
                    </Label>
                    <Col sm={9}>
                      <Input
                        tag={Field}
                        type="number"
                        name="phone"
                        id="phone"
                        placeholder="Phone Number"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        valid={!errors.phone && touched.phone}
                        invalid={errors.phone}
                      />
                      {errors.phone || touched.phone ? (
                        <FormFeedback invalid>{errors.phone}</FormFeedback>
                      ) : null}
                    </Col>
                  </FormGroup>
                </Col>

                <Col xs="12" md="4">
                  <Media className="flex-column align-items-center">
                    <Media
                      top
                      className="position-relative"
                      style={{width: '7em', height: '7em'}}
                    >
                      {avatar.uriAvatar !== placeholder ? (
                        <Button
                          type="button"
                          color="white"
                          onClick={(e) => openDelAva(e)}
                          className="close-btn"
                        >
                          <AiFillCloseCircle
                            className="position-relative"
                            color="#7C4935"
                            size="1em"
                          />
                        </Button>
                      ) : null}
                      <div
                        className="rounded-circle  position-relative overflow-hidden"
                        style={{width: '100%', height: '100%'}}
                      >
                        <Media
                          object
                          src={avatar.uriAvatar}
                          className="position-absolute img-fluid"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                          }}
                        />
                      </div>
                    </Media>
                    <Media body className="my-3">
                      <Label
                        for="avatar"
                        className="btn btn-outline-secondary rounded-pill"
                      >
                        <span>Select File</span>
                        <Input
                          onChange={avatarChange}
                          type="file"
                          id="avatar"
                          accept=".jpg,.jpeg,.png"
                          style={{display: 'none'}}
                        />
                        <ModalConfirm
                          modalOpen={notifDeleteAva}
                          {...propsNotifAvaDelete}
                        />
                        <ModalConfirm
                          modalOpen={notifForImg}
                          {...propsNotifImg}
                        />
                        <ModalLoading modalOpen={profile.deleteAvaPending} />
                      </Label>
                    </Media>
                  </Media>
                </Col>

                <Col xs="12" md="8" className="mb-3">
                  <FormGroup row>
                    <Col
                      md={{size: 9, offset: 3}}
                      sm={12}
                      className={
                        md
                          ? 'd-flex align-items-center justify-content-center'
                          : ''
                      }
                    >
                      <Button
                        color="success"
                        type="submit"
                        className="rounded-pill"
                      >
                        Submit
                      </Button>
                    </Col>
                  </FormGroup>
                </Col>

                <ModalLoading
                  modalOpen={profile.pending || updateProfile.pending}
                />
                <ModalConfirm modalOpen={notifSuccess} {...propsNotifSuccess} />
              </Row>
            </Form>
          );
        }}
      </Formik>
      <ChangePassword md={md} />
    </>
  );
}
