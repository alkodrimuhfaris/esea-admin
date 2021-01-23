/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Modal,
  ModalBody,
  Spinner,
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import moment from 'moment';
import ModalConfirm from '../Modal/ModalConfirm';
import actions from '../../redux/actions';
import capitalizeFirstLetter from '../../Helpers/capitalizeFirstLetter';

export default function DetailRegistrator({modalOpen = false, setModalOpen}) {
  const dispatch = useDispatch();
  const getRegistratorDetails = useSelector(
    (state) => state.getRegistratorDetails,
  );
  const registratorData = useSelector(
    (state) => state.getRegistratorDetails.data,
  );
  const [openNotif, setOpenNotif] = React.useState(false);
  const [propsNotif, setPropsNotif] = React.useState({});

  React.useEffect(() => {
    if (getRegistratorDetails.error) {
      setPropsNotif({
        useOneBtn: true,
        title: 'Warning!',
        content: getRegistratorDetails.message,
        confirm: () => {
          dispatch(actions.registrationActions.clearGetMessage());
          setOpenNotif(false);
          setModalOpen(false);
        },
      });
      setOpenNotif(true);
    }
  }, [getRegistratorDetails.pending]);

  return (
    <Modal size="lg" isOpen={modalOpen}>
      <ModalConfirm modalOpen={openNotif} {...propsNotif} />
      {getRegistratorDetails.pending ? (
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
            <h3>Detail Registrator</h3>
          </div>
          <Container>
            {Object.keys(registratorData).length
              ? Object.entries(registratorData).map(([key, value]) => {
                  key = capitalizeFirstLetter(key);
                  value = moment(value, moment.ISO_8601, true).isValid()
                    ? moment(value).format('DD MMMM, YYYY')
                    : value;
                  return (
                    <Row className="border-bottom my-1">
                      <Col xs="4" sm="2">
                        <text className="text-scondary">{key}</text>
                      </Col>
                      <Col xs="8" sm="10">
                        <text>
                          <strong>{value}</strong>
                        </text>
                      </Col>
                    </Row>
                  );
                })
              : null}
          </Container>
        </ModalBody>
      )}
    </Modal>
  );
}
