/* eslint-disable no-unused-vars */
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Row, Col, Form, Input, Label, FormGroup} from 'reactstrap';
import Select from 'react-select';
import {FiFilter} from 'react-icons/fi';
import {BiLayerPlus} from 'react-icons/bi';
import actions from '../../redux/actions/index';
import Popover from '../HelperComponents/Popover';
import useWindowDimensions from '../../Helpers/useWindowDimension';
import sortOption from '../../Helpers/sortOption';
import RowProduct from '../HelperComponents/RowProduct';
import ModalLoading from '../Modal/ModalLoading';
import ModalConfirm from '../Modal/ModalConfirm';
import PaginationHook from '../HelperComponents/Pagination';
import NewProduct from './NewProduct';
import EditProduct from './EditProduct';
// import Pagination from '../HelperComponents/Pagination';

export default function Products() {
  const {sm, xs} = useWindowDimensions();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const categories = useSelector((state) => state.getAllCategories.data);
  const getAllCategories = useSelector((state) => state.getAllCategories);
  const getAllProducts = useSelector((state) => state.getAllProducts);
  const dataProducts = useSelector((state) => state.getAllProducts.data);
  const pageInfo = useSelector((state) => state.getAllProducts.pageInfo);
  const query = useSelector((state) => state.querySearch.query);
  const deleteProduct = useSelector((state) => state.deleteProduct);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openProductEdit, setOpenProductEdit] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState({
    value: 0,
    label: 'All Categories',
  });
  const [categoryOption, setCategoryOption] = React.useState([
    {
      value: 0,
      label: 'All Categories',
    },
  ]);
  const [sort, setSort] = React.useState({
    value: {sort: {createdAt: 'DESC'}},
    label: 'Terbaru',
  });
  const [before, setBefore] = React.useState('');
  const [after, setAfter] = React.useState('');
  const [filterPopOver, setFilterPopOver] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [propsAlert, setPropsAlert] = React.useState({});

  React.useEffect(() => {
    dispatch(actions.categoryActions.getAllCategories());
  }, []);

  React.useEffect(() => {
    if (getAllCategories.success && categories.length) {
      const firstCategory = {...categoryOption[0]};
      const nextCategories = categories.map((item) => {
        item = {
          value: item.id,
          label: item.categoryName,
        };
        return item;
      });
      const categoryOpt = [firstCategory, ...nextCategories];
      setCategoryOption(categoryOpt);
    }
  }, [getAllCategories.pending]);

  React.useEffect(() => {
    if (deleteProduct.success || deleteProduct.error) {
      setPropsAlert({
        title: deleteProduct.success ? 'Success!' : 'Failed!',
        content: deleteProduct.message,
        useOneBtn: true,
        confirm: () => {
          dispatch(actions.productActions.clearDeleteMessage());
          setOpenAlert(false);
          if (deleteProduct.success) {
            dispatch(actions.productActions.getAllProducts(query));
          }
        },
      });
      setOpenAlert(true);
    }
  }, [deleteProduct]);

  const commitFilter = (e) => {
    e.preventDefault();
    const date = {before, after};
    const queryNew = {
      ...query,
      date,
      data: selectedCategory.value
        ? {categoryId: selectedCategory.value}
        : undefined,
      sort: Object.keys(sort).length ? sort.value.sort : undefined,
    };
    dispatch(actions.querySearchActions.querySearch(queryNew));
  };

  const handleDefault = (e) => {
    e.preventDefault();
    setSelectedCategory({
      value: 0,
      label: 'All Categories',
    });
    setSort({
      value: {sort: {createdAt: 'DESC'}},
      label: 'Terbaru',
    });
    setBefore('');
    setAfter('');
  };

  const doSearch = () => {
    const newQuery = {...query, search: {productName: search}};
    dispatch(actions.querySearchActions.querySearch(newQuery));
  };

  const dispatchSearch = (qry) => {
    dispatch(actions.productActions.getAllProducts(qry));
  };

  const doDeleteProduct = (id) => {
    setPropsAlert({
      title: 'Warning',
      content: 'Are you sure want to delete the product?',
      confirm: () => {
        dispatch(actions.productActions.deleteProduct(token, id));
        setOpenAlert(false);
      },
      close: () => {
        setOpenAlert(false);
      },
    });
    setOpenAlert(true);
  };

  const openDetailProduct = (id) => {
    dispatch(actions.productActions.clearProductDetails());
    dispatch(actions.productActions.getProductDetails(id));
    setOpenProductEdit(true);
  };

  return (
    <div className="py-3">
      <NewProduct modalOpen={openCreate} setModalOpen={setOpenCreate} />
      <EditProduct
        modalOpen={openProductEdit}
        setModalOpen={setOpenProductEdit}
      />
      <ModalLoading
        modalOpen={getAllProducts.pending || deleteProduct.pending}
      />
      <ModalConfirm modalOpen={openAlert} {...propsAlert} />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          doSearch();
        }}
      >
        <Row className="row no-gutters">
          <Col
            xs="2"
            className="d-flex justify-content-center align-items-center"
          >
            <Button
              onClick={() => setOpenCreate(true)}
              color="esea-main"
              className="square-1p5-em-padding rounded-circle position-relative"
            >
              <BiLayerPlus className="absolute-centering" />
            </Button>
          </Col>
          <Col xs="7" className="pr-3">
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              color="esea-main"
              className="rounded-pill"
              placeholder="Search product here"
            />
          </Col>
          <Col
            xs="3"
            className="d-flex justify-content-center align-items-center"
          >
            <div
              className="position-absolute"
              style={{
                zIndex: 3,
                top: '50%',
                left: xs || sm ? '10%' : '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className="my-3 position-relative"
                style={{display: 'inline-block'}}
              >
                <Button
                  type="button"
                  id="filterBtn"
                  name="filterBtn"
                  onClick={() => setFilterPopOver((prevState) => !prevState)}
                  outline
                  color="esea-main"
                  className={`btn-popover ${
                    sm ? 'btn-popover-md' : 'btn-popover-lg'
                  }`}
                >
                  <FiFilter
                    size={sm ? '0.75em' : '1em'}
                    className="filter-icon"
                  />
                </Button>
                <Popover isOpen={filterPopOver}>
                  <div className="pt-2 px-2 bg-white">
                    <Form>
                      <Label for="dataKey">Categories</Label>
                      <Select
                        id="dataKey"
                        className="mb-4"
                        value={selectedCategory}
                        options={categoryOption}
                        onChange={(e) => setSelectedCategory(e)}
                      />
                      <Label for="sortKey">Sort By</Label>
                      <Select
                        id="sortKey"
                        className="mb-4"
                        value={sort}
                        options={sortOption}
                        onChange={(e) => setSort(e)}
                      />
                      <FormGroup>
                        <Label for="filterDateFrom">From Date</Label>
                        <Input
                          type="date"
                          name="dateFromVal"
                          id="filterDateFrom"
                          value={after}
                          onChange={(e) => setAfter(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="filterDateTo">To Date</Label>
                        <Input
                          type="date"
                          name="dateToVal"
                          id="filterDateTo"
                          value={before}
                          onChange={(e) => setBefore(e.target.value)}
                        />
                        <div className="d-flex justify-content-between">
                          <Button
                            color="esea-main"
                            className="my-3 mr-1"
                            onClick={commitFilter}
                          >
                            Apply
                          </Button>
                          <Button
                            outline
                            color="danger"
                            className="ml-1 my-3"
                            onClick={handleDefault}
                          >
                            Abort All
                          </Button>
                        </div>
                      </FormGroup>
                    </Form>
                  </div>
                </Popover>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
      <Row className="mt-3 no-gutters">
        <Col
          xs="1"
          className="d-flex align-items-center justify-content-center border"
        >
          No.
        </Col>
        <Col
          xs="3"
          sm="4"
          className="d-flex align-items-center justify-content-center border px-2 py-3"
        >
          Product Name
        </Col>
        <Col
          xs="2"
          className="d-flex align-items-center justify-content-center border px-2 py-3"
        >
          Sold / Stock
        </Col>
        <Col
          xs="3"
          className="d-flex align-items-center justify-content-center border px-2 py-3"
        >
          Price
        </Col>
        <Col
          xs="3"
          sm="2"
          className="d-flex align-items-center justify-content-center border px-2 py-3"
        >
          Action
        </Col>
      </Row>
      {dataProducts.map((item, index) => {
        const numberRow =
          pageInfo.dataPerPage === '-'
            ? index + 1
            : index + 1 + pageInfo.dataPerPage * (pageInfo.currentPage - 1);
        return (
          <RowProduct
            item={item}
            numberRow={numberRow}
            openDetailProduct={openDetailProduct}
            deleteProduct={doDeleteProduct}
          />
        );
      })}
      <div className="position-relative">
        <div
          className="position-absolute mb-5 w-100"
          style={{left: '50%', transform: 'translate(-50%, 0)', zIndex: 1}}
        >
          <PaginationHook
            query={query}
            dispatchSearchQuery={dispatchSearch}
            editQuery={(qry) =>
              dispatch(actions.querySearchActions.querySearch(qry))
            }
            pageInfo={pageInfo}
            backendExtension="products"
          />
        </div>
      </div>
    </div>
  );
}
