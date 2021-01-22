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
} from 'reactstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import {Formik, Field} from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import * as Yup from 'yup';
import actions from '../../redux/actions';

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

export default function NewProduct({modalOpen, setModalOpen}) {
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.getAllCategories.data);
  const [categoryOpt, setCategoryOpt] = React.useState([]);
  const [imageTest, setImageTest] = React.useState(false);
  const initialMount = React.useRef(true);

  React.useEffect(() => {
    console.log(categoryData);
    if (initialMount.current) {
      if (categoryData) {
        dispatch(actions.categoryActions.getAllCategories());
      }
      initialMount.current = false;
    }
  }, []);

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

  const initialValue = {
    productName: '',
    price: 0,
    stocks: 0,
    sold: 0,
    category: '',
    description: '',
  };
  const handleAdd = (values) => {
    console.log(values);
  };
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

  return (
    <Modal size="lg" isOpen={modalOpen}>
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
          <h3>Create New Product</h3>
        </div>
        <Formik
          initialValues={initialValue}
          validationSchema={schema}
          validateOnBlur
          onSubmit={(values) => {
            handleAdd(values);
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
              <Row form onSubmit={handleSubmit}>
                <Col xs="12" className="my-1">
                  <div className="p-3 col-6">
                    <div
                      className="card p-3"
                      id="photo-product"
                      style={
                        !imageTest
                          ? {borderColor: '#EF476F'}
                          : {borderColor: 'rgba(0,0,0,.2)'}
                      }
                    >
                      {/* <div className="d-flex justify-content-center">
                        <text className="m-3 text-center">Product Image</text>
                      </div>
                      <div className="position-relative image-wrapper">
                        {item.product_image ? (
                          <button
                            type="button"
                            onClick={() => this.openDeleteImage(index)}
                            className="btn close-btn"
                          >
                            <AiFillCloseCircle color="white" size="1em" />
                          </button>
                        ) : null}
                        <img
                          className="position-absolute img-fluid center-img"
                          src={
                            item.product_image
                              ? item.product_image
                              : placeholderImage
                          }
                          alt={
                            item.product_image
                              ? `${Object.keys(item.product_image)[0]}_${index}`
                              : ''
                          }
                        />
                      </div>
                      <label
                        htmlFor={`product_image_${index + 1}`}
                        className="btn btn-outline-secondary rounded-pill"
                      >
                        <span>Select File</span>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          id={`product_image_${index + 1}`}
                          name={`product_image_${index + 1}`}
                          onChange={(e) => this.onImageChange(e, index)}
                          style={{display: 'none'}}
                        />
                      </label>
                     */}
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
                  </div>
                </Col>
                <Col xs="12" className="my-1">
                  <FormGroup>
                    <Label for="productName" className="small text-secondary">
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
                      <FormFeedback invalid>{errors.productName}</FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col xs="12" sm="7" className="my-1">
                  <FormGroup>
                    <Label for="productName" className="small text-secondary">
                      Price
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">Rp</InputGroupAddon>
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
                      <InputGroupAddon addonType="append">.00</InputGroupAddon>
                    </InputGroup>
                    {errors.price || touched.price ? (
                      <text className="error-form">{errors.price}</text>
                    ) : null}
                  </FormGroup>
                  <Col xs="12" sm="5" className="my-1">
                    <FormGroup>
                      <Label for="categoryName">Category</Label>
                      <CreatableSelect
                        tag={Field}
                        id="categoryName"
                        styles={selectStyle}
                        error={errors.categoryName}
                        touched={values.categoryName}
                        onChange={(e) => {
                          setFieldValue('categoryName', e.value);
                        }}
                        options={categoryOpt}
                      />
                      {errors.categoryName || touched.categoryName ? (
                        <text className="error-form">
                          {errors.categoryName}
                        </text>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Col>
                <Col xs="6" className="my-1">
                  <FormGroup>
                    <Label for="productName" className="small text-secondary">
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
                    <Label for="productName" className="small text-secondary">
                      Number of sold items
                    </Label>
                    <Input
                      type="number"
                      name="sold"
                      id="sold"
                      tag={Field}
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
                    <Label for="productName" className="small text-secondary">
                      Description
                    </Label>
                    <Input
                      type="text area"
                      name="description"
                      id="description"
                      tag={Field}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={!errors.description && touched.description}
                      invalid={errors.description}
                    />
                    <text
                      className={
                        errors.description || touched.description
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
            );
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
}
