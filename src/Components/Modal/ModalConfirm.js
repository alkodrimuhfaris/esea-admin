import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';

export default function ModalConfirm({
  modalOpen = false,
  title = 'Warning',
  content = 'Are you sure want to delete this?',
  confirm = () => {},
  confirmTxt = 'Yes',
  close = () => {},
  closeTxt = 'No',
  useOneBtn = false,
}) {
  const [openThis, setThisOpen] = React.useState(false);

  React.useEffect(() => {
    setThisOpen(modalOpen);
  }, [modalOpen]);

  const doConfirm = (e) => {
    e.preventDefault();
    confirm();
    setThisOpen(false);
  };

  const doCancel = (e) => {
    e.preventDefault();
    close();
    setThisOpen(false);
  };

  return (
    <>
      <Modal className="kumbh-sans" isOpen={openThis}>
        <ModalHeader>
          <div className="d-flex align-items-center">
            <text>{title}</text>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex align-items-center">
            <text>{content}</text>
          </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-around">
          <Button
            color="esea-main"
            onClick={(e) => doConfirm(e)}
            className="rounded-pill"
          >
            {confirmTxt}
          </Button>
          {useOneBtn ? null : (
            <Button
              color="danger"
              onClick={(e) => doCancel(e)}
              className="rounded-pill"
            >
              {closeTxt}
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
}
