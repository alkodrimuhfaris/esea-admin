/* eslint-disable no-unused-vars */
import React from 'react';
import {Row, Col, Form, Button, Input, Label, FormGroup} from 'reactstrap';
import Select from 'react-select';
import {useSelector, useDispatch} from 'react-redux';
import {FiFilter} from 'react-icons/fi';
import Popover from '../HelperComponents/Popover';
import RowRegistrator from '../HelperComponents/RowRegistrator';
import useWindowDimensions from '../../Helpers/useWindowDimension';
import actions from '../../redux/actions';
import ModalLoading from '../Modal/ModalLoading';
import ModalConfirm from '../Modal/ModalConfirm';
import PaginationHook from '../HelperComponents/Pagination';
import DetailRegistrator from './DetailRegistrator';

export default function Registrations() {
  const {xs, sm} = useWindowDimensions();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const deleteRegistrator = useSelector((state) => state.deleteRegistrator);
  const getAllRegistrator = useSelector((state) => state.getAllRegistrator);
  const registratorData = useSelector((state) => state.getAllRegistrator.data);
  const pageInfo = useSelector((state) => state.getAllRegistrator.pageInfo);
  const path = 'registrations';
  const [query, setQuery] = React.useState({page: 1});
  const [search, setSearch] = React.useState('');
  const [filterPopOver, setFilterPopOver] = React.useState(false);
  const [sort, setSort] = React.useState({
    value: {sort: {createdAt: 'DESC'}},
    label: 'Terbaru',
  });
  const [before, setBefore] = React.useState('');
  const [after, setAfter] = React.useState('');
  const [openNotif, setOpenNotif] = React.useState(false);
  const [notifProps, setNotifProps] = React.useState({});
  const [openRegistrator, setOpenRegistrator] = React.useState(false);
  const [selectedPartner, setSelectedPartner] = React.useState({
    label: 'All Partners',
    value: '',
  });

  const dispatchSearch = (qry) => {
    dispatch(actions.registrationActions.getAllRegistrator(token, qry));
  };

  const sortOption = [
    {
      value: {sort: {createdAt: 'DESC'}},
      label: 'Terbaru',
    },
    {
      value: {sort: {createdAt: 'ASC'}},
      label: 'Terlama',
    },
    {
      value: {sort: {name: 'ASC'}},
      label: 'Nama dari A - Z',
    },
    {
      value: {sort: {name: 'DESC'}},
      label: 'Nama dari Z - A',
    },
  ];

  const partnerOption = [
    {
      label: 'All Partners',
      value: '',
    },
    {
      label: 'Nelayan',
      value: 'Nelayan',
    },
    {
      label: 'Pedagang',
      value: 'Pedagang',
    },
  ];

  const commitFilter = (e) => {
    e.preventDefault();
    const date = {before, after};
    const queryNew = {
      ...query,
      date,
      data: selectedPartner.value
        ? {partner: selectedPartner.value}
        : undefined,
      sort: Object.keys(sort).length ? sort.value.sort : undefined,
    };
    setQuery(queryNew);
  };

  const handleDefault = (e) => {
    e.preventDefault();
    setSort({
      value: {sort: {createdAt: 'DESC'}},
      label: 'Terbaru',
    });
    setSelectedPartner({
      label: 'All Partners',
      value: '',
    });
    setBefore('');
    setAfter('');
  };

  const doDelete = (id) => {
    setNotifProps({
      title: 'Warning',
      Content: 'Are you sure want to delete this registrator data?',
      confirm: () => {
        dispatch(actions.registrationActions.deleteRegistrator(token, id));
        setOpenNotif(false);
      },
      close: () => {
        setOpenNotif(false);
      },
    });
    setOpenNotif(true);
  };

  const openDetailRegistrator = (id) => {
    dispatch(actions.registrationActions.getDetailRegistrator(token, id));
    setOpenRegistrator(true);
  };

  React.useEffect(() => {
    if (deleteRegistrator.success || deleteRegistrator.error) {
      setNotifProps({
        title: deleteRegistrator.success ? 'Success!' : 'Failed!',
        content: deleteRegistrator.message,
        useOneBtn: true,
        confirm: () => {
          setOpenNotif(false);
          if (deleteRegistrator.success) {
            dispatchSearch(query);
          }
          dispatch(actions.registrationActions.clearDeleteMessage());
        },
      });
      setOpenNotif(true);
    }
  }, [deleteRegistrator.pending]);

  React.useEffect(() => {
    if (getAllRegistrator.error) {
      setNotifProps({
        title: 'Warning!',
        content: getAllRegistrator.message,
        useOneBtn: true,
        confirm: () => {
          setOpenNotif(false);
          dispatch(actions.registrationActions.clearGetMessage());
        },
      });
      setOpenNotif(true);
    }
  }, [getAllRegistrator.pending]);

  return (
    <div className="py-3">
      <ModalLoading
        modalOpen={getAllRegistrator.pending || deleteRegistrator.pending}
      />
      <ModalConfirm modalOpen={openNotif} {...notifProps} />
      <DetailRegistrator
        modalOpen={openRegistrator}
        setModalOpen={setOpenRegistrator}
      />
      <Form>
        <Row className="row no-gutters">
          <Col xs="7" className="pr-3">
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              color="esea-main"
              className="rounded-pill"
              placeholder="Search registrator here"
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
                left: '50%',
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
                      <Label for="dataKey">Partner</Label>
                      <Select
                        id="dataKey"
                        className="mb-4"
                        value={selectedPartner}
                        options={partnerOption}
                        onChange={(e) => setSelectedPartner(e)}
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
          Name
        </Col>
        <Col
          xs="3"
          sm="2"
          className="d-flex align-items-center justify-content-center border px-2 py-3"
        >
          Phone / E-mail
        </Col>
        <Col
          xs="2"
          className="d-flex align-items-center justify-content-center border px-2 py-3"
        >
          Partner
        </Col>
        <Col
          xs="3"
          className="d-flex align-items-center justify-content-center border px-2 py-3"
        >
          Action
        </Col>
      </Row>
      {registratorData.map((item, index) => {
        const numberRow =
          pageInfo.dataPerPage === '-'
            ? index + 1
            : index + 1 + pageInfo.dataPerPage * (pageInfo.currentPage - 1);
        return (
          <RowRegistrator
            item={item}
            numberRow={numberRow}
            openDetailRegistrator={openDetailRegistrator}
            deleteRegistrator={doDelete}
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
            editQuery={(qry) => setQuery(qry)}
            pageInfo={pageInfo}
            backendExtension={path}
          />
        </div>
      </div>
    </div>
  );
}
