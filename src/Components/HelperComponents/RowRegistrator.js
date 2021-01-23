/* eslint-disable no-unused-vars */
import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import {AiOutlineDelete} from 'react-icons/ai';
import {BiDetail} from 'react-icons/bi';
import useWindowDimension from '../../Helpers/useWindowDimension';

export default function RowRegistrator({
  item = {
    id: 1,
    name: '',
    phone: '',
    email: '',
    partner: '',
    createdAt: new Date(),
  },
  numberRow = 1,
  openDetailRegistrator = (id) => id,
  deleteRegistrator = (id) => id,
}) {
  const {xs, sm} = useWindowDimension();

  return (
    <Row className="no-gutters">
      <Col
        xs="1"
        className="d-flex align-items-center justify-content-center border"
      >
        <div
          className="text-center"
          style={{
            lineHeight: xs || sm ? '0.625em' : '0.9em',
          }}
        >
          <text
            style={{
              fontSize: xs || sm ? '0.5em' : '0.75em',
            }}
          >
            {numberRow}
          </text>
        </div>
      </Col>
      <Col
        xs="3"
        sm="4"
        className="d-flex align-items-center justify-content-center border px-2 py-3"
      >
        <div
          className="text-center"
          style={{
            lineHeight: xs || sm ? '0.625em' : '0.9em',
          }}
        >
          <text
            style={{
              fontSize: xs || sm ? '0.5em' : '0.75em',
            }}
          >
            {item.name}
          </text>
        </div>
      </Col>
      <Col
        xs="3"
        sm="2"
        className="d-flex flex-column align-items-center justify-content-center border py-3"
      >
        <div
          className="text-center w-100"
          style={{
            lineHeight: xs || sm ? '0.625em' : '0.9em',
          }}
        >
          <text
            style={{
              fontSize: xs || sm ? '0.5em' : '0.75em',
            }}
          >
            {item.phone}
          </text>
        </div>
        <div
          className="text-center w-100"
          style={{
            lineHeight: xs || sm ? '0.625em' : '0.9em',
          }}
        >
          <text
            style={{
              fontSize: xs || sm ? '0.5em' : '0.75em',
            }}
          >
            {item.email}
          </text>
        </div>
      </Col>
      <Col
        xs="2"
        className="d-flex align-items-center justify-content-center border px-2 py-3"
      >
        <div
          className="text-center"
          style={{
            lineHeight: xs || sm ? '0.65em' : '1em',
          }}
        >
          <text
            className="text-center"
            style={{
              fontSize: xs || sm ? '0.5em' : '0.75em',
            }}
          >
            {item.partner}
          </text>
        </div>
      </Col>
      <Col
        xs="3"
        className="d-flex align-items-center justify-content-center border"
      >
        <div className="d-flex align-items-center justify-content-center mx-1 my-1">
          <Button
            onClick={() => openDetailRegistrator(item.id)}
            color="esea-main"
            style={{
              fontSize: xs || sm ? '0.5em' : '0.75em',
            }}
          >
            <BiDetail />
          </Button>
        </div>
        <div className="d-flex align-items-center justify-content-center mx-1 my-1">
          <Button
            onClick={() => deleteRegistrator(item.id)}
            color="danger"
            style={{
              fontSize: xs || sm ? '0.5em' : '0.75em',
            }}
          >
            <AiOutlineDelete />
          </Button>
        </div>
      </Col>
    </Row>
  );
}
