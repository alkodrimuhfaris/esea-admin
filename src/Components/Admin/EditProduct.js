/* eslint-disable no-nested-ternary */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
  Tooltip,
  Form,
  Spinner,
} from 'reactstrap';
import {AiOutlineCloseCircle, AiFillCloseCircle} from 'react-icons/ai';
import {Formik, Field} from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import * as Yup from 'yup';
import actions from '../../redux/actions';
import placeholderImage from '../../Assets/Images/placeHolder.png';
import ModalConfirm from '../Modal/ModalConfirm';
import ModalLoading from '../Modal/ModalLoading';

const schema = Yup.object().shape({
  productName: Yup.string('Input the right product name').required(
    'Product name is required!',
  ),
  price: Yup.number('Input the right price format!')
    .required('Price is required')
    .min(1, 'Price can not be zero!'),
  stocks: Yup.number('Input the right stock format!').required(
    'Stock is required!',
  ),
  sold: Yup.number('Input the right sold item format!').required(
    'Number of sold item is required!',
  ),
  category: Yup.string('Input the right category format!').required(
    'category is required!',
  ),
  description: Yup.string('Input the right description format!')
    .min(1, 'description is too short!')
    .max(250, 'Maximum word count has been reached')
    .required('description is required!'),
});

export default function EditProduct({modalOpen, setModalOpen}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const updateProduct = useSelector((state) => state.updateProduct);
  const query = useSelector((state) => state.querySearch.query);
  const categoryData = useSelector((state) => state.getAllCategories.data);
  const detailProduct = useSelector((state) => state.getProductDetails.data);
  const getProductDetails = useSelector((state) => state.getProductDetails);
  const [categoryOpt, setCategoryOpt] = React.useState([]);
  const [formReset, setFormReset] = React.useState({reset: () => {}});
  const [imageTest, setImageTest] = React.useState(true);
  const [openNotif, setOpenNotif] = React.useState(false);
  const [propsNotif, setPropsNotif] = React.useState({});
  const [picture, setPicture] = React.useState({
    file: {},
    name: '',
    uri: '',
    fromDB: false,
  });
  const [categoryValue, setCategoryValue] = React.useState({
    value: '',
    label: '',
  });
  const [initialValue, setInitialValue] = React.useState({
    productName: '',
    price: 0,
    stocks: 0,
    sold: 0,
    category: '',
    description: '',
  });
  const initialMount = React.useRef(true);
  const firstPicture = React.useRef('');

  const delPicture = () => {
    setPicture({
      file: {},
      uri: '',
      fromDB: false,
    });
  };

  React.useEffect(() => {
    if (initialMount.current) {
      if (!categoryData.length) {
        dispatch(actions.categoryActions.getAllCategories());
      }
      initialMount.current = false;
    }
  }, []);

  React.useEffect(() => {
    if (Object.keys(detailProduct.category).length) {
      const {category} = detailProduct;
      const selectedCategory = {
        value: category.categoryName,
        label: category.categoryName,
      };
      setCategoryValue(selectedCategory);
      firstPicture.current =
        process.env.REACT_APP_URL_BACKEND + detailProduct.product.picture;
    }
  }, [detailProduct]);

  React.useEffect(() => {
    const newOpt = categoryData.map((item) => {
      item = {
        value: item.name,
        label: item.name,
        id: item.id,
      };
      return item;
    });
    setCategoryOpt(newOpt);
  }, [categoryData]);

  // notification after posting
  React.useEffect(() => {
    if (updateProduct.success || updateProduct.error) {
      setPropsNotif({
        title: updateProduct.success ? 'Success!' : 'Fail!',
        content: updateProduct.message,
        useOneBtn: true,
        confirm: () => {
          dispatch(actions.productActions.clearUpdateMessage());
          setOpenNotif(false);
          if (updateProduct.success) {
            delPicture();
            formReset.reset();
            dispatch(
              actions.productActions.getProductDetails(
                detailProduct.product.id,
              ),
            );
            dispatch(actions.productActions.getAllProducts(query));
          }
        },
      });
      setOpenNotif(true);
    }
  }, [updateProduct.pending]);

  // initial value for create image
  React.useEffect(() => {
    const initialVal = {
      productName: detailProduct.product
        ? detailProduct.product.productName
        : '',
      price: detailProduct.product ? detailProduct.product.price : 0,
      stocks: detailProduct.product ? detailProduct.product.stocks : 0,
      sold: detailProduct.product ? detailProduct.product.sold : 0,
      category: Object.keys(detailProduct.category).length
        ? detailProduct.category.categoryName
        : '',
      description: detailProduct.product
        ? detailProduct.product.description
        : '',
    };
    setInitialValue(initialVal);
  }, [detailProduct]);

  // handling add products
  const handleAdd = (values) => {
    const val = {...values};
    const data = new FormData();
    if (picture.name && picture.uri) {
      data.append('picture', picture.file);
    }
    for (const [key, value] of Object.entries(val)) {
      data.append(key, value);
    }
    dispatch(
      actions.productActions.updateProduct(
        token,
        detailProduct.product.id,
        data,
      ),
    );
  };

  // styling for react-select component
  const selectStyle = {
    control: (provided, state) => ({
      ...provided,
      // eslint-disable-next-line no-nested-ternary
      borderColor: state.selectProps.error
        ? '#EF476F'
        : state.selectProps.touched
        ? '#06D6A0'
        : 'rgba(0,0,0,.2)',
    }),
  };

  const openDelPicture = () => {
    setPropsNotif({
      title: 'Warning',
      content: 'Are you sure want to delete this picture?',
      confirm: () => {
        delPicture();
        setOpenNotif(false);
      },
      close: () => {
        setOpenNotif(false);
      },
    });
    setOpenNotif(true);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const [file] = event.target.files;
      if (file.size > process.env.REACT_APP_MAX_FILE_SIZE * 1000 * 1024) {
        setPropsNotif({
          title: 'Warning',
          content: `Image must be less than ${process.env.REACT_APP_MAX_FILE_SIZE} MB!`,
          useOneBtn: true,
          confirm: () => {
            setOpenNotif(true);
          },
        });
        setOpenNotif(true);
      } else {
        setPicture({
          uri: URL.createObjectURL(file),
          name: 'productPicture',
          fromDB: false,
          file,
        });
        setImageTest(true);
      }
    }
  };

  return (
    <Modal size="lg" isOpen={modalOpen}>
      <ModalLoading modalOpen={updateProduct.pending} />
      <ModalConfirm modalOpen={openNotif} {...propsNotif} />
      {getProductDetails.pending ? (
        <ModalBody className="position-relative" style={{height: '50vh'}}>
          <Spinner
            className="spinner-modal-edit position-absolute"
            color="danger"
          />
        </ModalBody>
      ) : (
        <ModalBody className="kumbh-sans position-relative py-4">
          <Button
            color="danger"
            outline
            className="shadow-none position-absolute border-0 button-modal-close d-flex justify-content-center align-items-center"
            onClick={() => setModalOpen(false)}
          >
            <AiOutlineCloseCircle style={{fontSize: '2em'}} color="danger" />
          </Button>
          <div className="my-2 d-flex align-items-center justify-content-center">
            <h3>Edit Product</h3>
          </div>
          <Formik
            initialValues={initialValue}
            validationSchema={schema}
            validateOnBlur
            enableReinitialize
            onSubmit={(values, {resetForm}) => {
              handleAdd(values);
              setFormReset({
                reset: resetForm,
              });
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
                setFieldValue,
              } = props;
              return (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col
                      xs="12"
                      className="my-1 d-flex justify-content-center align-items-center"
                    >
                      {/* <div className="p-3">
                      </div> */}
                      {/* <div className="card">
                      </div> */}
                      <div className="w-50 d-flex flex-column justify-content-center align-items-center">
                        <div className="d-flex justify-content-center">
                          <text className="m-3 text-center">Product Image</text>
                        </div>
                        <div
                          id="photo-product"
                          className={`position-relative image-wrapper ${
                            picture.name || picture.uri ? 'shadow-main' : ''
                          }`}
                          style={
                            !imageTest
                              ? {borderColor: 'rgba(6,214,160,1)'}
                              : {borderColor: 'rgba(0,0,0,.2)'}
                          }
                        >
                          {picture.uri ? (
                            <Button
                              outline
                              color="danger"
                              type="button"
                              onClick={openDelPicture}
                              className="shadow-none button-picture-delete border-0 button-modal-close d-flex justify-content-center align-items-center"
                            >
                              <AiFillCloseCircle
                                color="white"
                                style={{fontSize: '1.5em'}}
                              />
                            </Button>
                          ) : null}
                          <img
                            className="position-absolute img-fluid center-img"
                            src={
                              picture.uri
                                ? picture.uri
                                : firstPicture.current
                                ? firstPicture.current
                                : placeholderImage
                            }
                            alt="product-new"
                          />
                        </div>
                        <label
                          htmlFor="product-picture"
                          className="btn btn-outline-secondary rounded-pill"
                        >
                          <span>Select File</span>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            id="product-picture"
                            name="product-picture"
                            onChange={(e) => onImageChange(e)}
                            style={{display: 'none'}}
                          />
                        </label>
                      </div>

                      {!imageTest ? (
                        <Tooltip
                          isOpen={imageTest}
                          placement="bottom"
                          target="photo-product"
                        >
                          Image product can not be empty!
                        </Tooltip>
                      ) : null}
                    </Col>
                    <Col xs="12" className="my-1">
                      <FormGroup>
                        <Label
                          for="productName"
                          className="small text-secondary"
                        >
                          Product Name
                        </Label>
                        <Input
                          type="text"
                          name="productName"
                          id="productName"
                          values={values.productName}
                          tag={Field}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          valid={!errors.productName && touched.productName}
                          invalid={errors.productName}
                        />
                        {errors.productName || touched.productName ? (
                          <FormFeedback invalid>
                            {errors.productName}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="7" className="my-1">
                      <FormGroup>
                        <Label
                          for="productName"
                          className="small text-secondary"
                        >
                          Price
                        </Label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            Rp
                          </InputGroupAddon>
                          <Input
                            tag={Field}
                            type="number"
                            name="price"
                            id="price"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            valid={!errors.price && touched.price}
                            invalid={errors.price}
                          />
                          <InputGroupAddon addonType="append">
                            .00
                          </InputGroupAddon>
                        </InputGroup>
                        {errors.price || touched.price ? (
                          <text className="error-form">{errors.price}</text>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="5" className="my-1">
                      <FormGroup>
                        <Label for="category">Category</Label>
                        <CreatableSelect
                          tag={Field}
                          id="category"
                          styles={selectStyle}
                          value={categoryValue}
                          error={errors.category}
                          touched={values.category}
                          onChange={(e) => {
                            setFieldValue('category', e.value);
                          }}
                          options={categoryOpt}
                        />
                        {errors.category || touched.category ? (
                          <text className="error-form">{errors.category}</text>
                        ) : null}
                      </FormGroup>
                    </Col>

                    <Col xs="6" className="my-1">
                      <FormGroup>
                        <Label for="stocks" className="small text-secondary">
                          Stock
                        </Label>
                        <Input
                          type="number"
                          name="stocks"
                          id="stocks"
                          value={values.stocks}
                          tag={Field}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          valid={!errors.stocks && touched.stocks}
                          invalid={errors.stocks}
                        />
                        {errors.stocks || touched.stocks ? (
                          <FormFeedback invalid>{errors.stocks}</FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col xs="6" className="my-1">
                      <FormGroup>
                        <Label for="sold" className="small text-secondary">
                          Number of sold items
                        </Label>
                        <Input
                          type="number"
                          name="sold"
                          id="sold"
                          tag={Field}
                          value={values.sold}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          valid={!errors.sold && touched.sold}
                          invalid={errors.sold}
                        />
                        {errors.sold || touched.sold ? (
                          <FormFeedback invalid>{errors.sold}</FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col xs="12" className="my-1">
                      <FormGroup>
                        <Label
                          for="description"
                          className="small text-secondary"
                        >
                          Description
                        </Label>
                        <Input
                          type="textarea"
                          aria-multiline
                          name="description"
                          id="description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          valid={!errors.description && touched.description}
                          invalid={errors.description}
                        />
                        <text
                          className={
                            errors.description
                              ? 'error-form'
                              : 'label-form text-secondary'
                          }
                        >
                          {values.description.length}/250{' '}
                          {errors.description || touched.description
                            ? errors.description
                            : ''}
                        </text>
                      </FormGroup>
                    </Col>
                    <Col
                      xs={12}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Button type="submit" color="esea-main px-5 rounded-pill">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </ModalBody>
      )}
    </Modal>
  );
}
