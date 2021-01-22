/* eslint-disable no-unused-vars */
import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import {AiOutlineDelete} from 'react-icons/ai';
import {BiDetail} from 'react-icons/bi';
import currencyFormat from '../../Helpers/currencyFormat';
import useWindowDimension from '../../Helpers/useWindowDimension';

export default function RowProduct({
  item = {
    productName: 'ikan',
    price: 10000,
    stocks: 5,
    sold: 12,
    id: 1,
  },
  page = 100,
  openDetailProduct = (id) => console.log(id),
  deleteProduct = (id) => console.log(id),
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
            {page}
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
            {item.productName}
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
            lineHeight: xs || sm ? '0.625em' : '0.9em',
          }}
        >
          <text
            style={{
              fontSize: xs || sm ? '0.5em' : '0.75em',
            }}
          >
            <strong>{item.sold}</strong> / <strong>{item.stocks}</strong>
          </text>
        </div>
      </Col>
      <Col
        xs="3"
        className="d-flex align-items-center justify-content-center border px-2 py-3"
      >
        <div
          className="text-center"
          style={{
            lineHeight: xs || sm ? '0.625em' : '0.9em',
          }}
        >
          <text
            className="text-center"
            style={{
              fontSize: xs || sm ? '0.5em' : '0.75em',
            }}
          >
            {currencyFormat(item.price)}
          </text>
        </div>
      </Col>
      <Col
        xs="3"
        sm="2"
        className="d-flex align-items-center justify-content-center border"
      >
        <div className="d-flex align-items-center justify-content-center mx-1 my-1">
          <Button
            onClick={() => openDetailProduct(item.id)}
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
            onClick={() => deleteProduct(item.id)}
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
