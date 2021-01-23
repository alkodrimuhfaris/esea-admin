import React from 'react';
import {Pagination, PaginationItem, PaginationLink, Input} from 'reactstrap';
import Select from 'react-select';
import qs from 'qs';
import {useHistory} from 'react-router-dom';
import useWindowDimension from '../../Helpers/useWindowDimension';

export default function PaginationHook({
  query,
  pageInfo,
  editQuery = (qry) => qry,
  dispatchSearchQuery = (qry) => qry,
  backendExtension,
}) {
  const {sm} = useWindowDimension();
  const history = useHistory();
  const [optionPage, setOptionPage] = React.useState([]);
  const [limit, setLimit] = React.useState(10);
  const isInitialMount = React.useRef(true);
  // const isInitialMount2 = React.useRef(true);

  const dispatchSearch = () => {
    dispatchSearchQuery(query);
    history.push({search: qs.stringify(query)});
  };

  React.useEffect(() => {
    let queryNew = {};
    if (limit === '-') {
      queryNew = {
        ...query,
        page: 1,
        limit,
      };
    } else if (pageInfo.currentPage > Math.ceil(pageInfo.count / limit)) {
      queryNew = {
        ...query,
        page: Math.ceil(pageInfo.count / limit),
        limit,
      };
    } else {
      queryNew = {
        ...query,
        limit,
      };
    }
    editQuery(queryNew);
  }, [limit]);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      dispatchSearch();
    }
  }, [query]);

  React.useEffect(() => {
    const allpage = [...Array(pageInfo.pages).keys()].map((option) => {
      option += 1;
      option = {
        value: option,
        label: option,
      };
      return option;
    });
    setOptionPage(allpage);
  }, [pageInfo]);

  const handleChoosePage = (e) => {
    const newQuery = {
      ...query,
      page: e.value,
    };
    editQuery(newQuery);
  };

  const getArrLink = () => {
    let link = [];
    if (Object.keys(pageInfo).length) {
      const {currentPage} = pageInfo;
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        link.push(i);
      }
      link = link.map((item) => {
        if (item < 1 || item > pageInfo.pages) {
          item = ['', '#'];
        } else {
          item = [
            item,
            `${`${
              process.env.REACT_APP_URL_BACKEND + backendExtension
            }?${qs.stringify({
              ...query,
              ...{page: item},
            })}`}`,
          ];
        }
        return item;
      });
    } else {
      link = [];
    }
    return link;
  };

  const handlePageClick = (page, key) => {
    key.preventDefault();
    const queryPage = {
      ...query,
      page,
      limit,
    };
    editQuery(queryPage);
  };

  const getMid = () => {
    const mid = Object.keys(pageInfo).length
      ? getArrLink().map((item, index) => {
          if (item[0] === pageInfo.currentPage) {
            return (
              <PaginationItem key={index + 1} active>
                <PaginationLink
                  onClick={(e) => handlePageClick(item[0], e)}
                  href={item[1]}
                >
                  {item[0]}
                </PaginationLink>
              </PaginationItem>
            );
          }
          if (item[0]) {
            return (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={(e) => handlePageClick(item[0], e)}
                  href={item[1]}
                >
                  {item[0]}
                </PaginationLink>
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={index + 1} disable>
              <PaginationLink href={item[1]}>&nbsp;</PaginationLink>
            </PaginationItem>
          );
        })
      : null;
    return mid;
  };

  const getPrev = () => {
    let prev = null;
    if (Object.keys(pageInfo).length) {
      if (pageInfo.currentPage > 1) {
        prev = (
          <>
            <PaginationItem>
              <PaginationLink
                color="success"
                first
                onClick={(e) => handlePageClick(1, e)}
                href={`${
                  process.env.REACT_APP_URL_BACKEND +
                  backendExtension +
                  qs.stringify({
                    ...query,
                    page: 1,
                  })
                }`}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                color="success"
                previous
                onClick={(e) => handlePageClick(pageInfo.currentPage - 1, e)}
                href={pageInfo.prefLink}
              />
            </PaginationItem>
          </>
        );
      } else {
        prev = (
          <>
            <PaginationItem disabled>
              <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem disabled>
              <PaginationLink previous href="#" />
            </PaginationItem>
          </>
        );
      }
    } else {
      prev = null;
    }
    return prev;
  };

  const getNext = () => {
    let next = null;
    if (Object.keys(pageInfo).length) {
      if (pageInfo.currentPage < pageInfo.pages) {
        next = (
          <>
            <PaginationItem>
              <PaginationLink
                next
                onClick={(e) => handlePageClick(pageInfo.currentPage + 1, e)}
                href={pageInfo.nextLink}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                last
                onClick={(e) => handlePageClick(pageInfo.pages, e)}
                href={`${
                  process.env.REACT_APP_URL_BACKEND +
                  backendExtension +
                  qs.stringify({
                    ...query,
                    limit,
                    page: pageInfo.pages,
                  })
                }`}
              />
            </PaginationItem>
          </>
        );
      } else {
        next = (
          <>
            <PaginationItem disabled>
              <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem disabled>
              <PaginationLink last href="#" />
            </PaginationItem>
          </>
        );
      }
    }
    return next;
  };

  return (
    <>
      {Object.keys(pageInfo).length ? (
        <div className="my-3 d-flex align-items-center justify-content-center">
          <text>Displaying</text>
          <div className="limit-wrapper">
            <Input
              type="select"
              name="limit"
              id="limit"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            >
              <option value={5} selected>
                5
              </option>
              <option value={10} selected>
                10
              </option>
              <option value={25} selected>
                25
              </option>
              <option value="-" selected>
                All
              </option>
            </Input>
          </div>
          <text>
            from{' '}
            {Object.keys(pageInfo).length ? `${pageInfo.count} items` : '-'}
          </text>
        </div>
      ) : null}
      <div className="my-3 row no-gutters justify-content-center">
        <div
          className={`col-12 col-md-5 d-flex justify-content-${
            sm ? 'center' : 'end'
          }`}
        >
          <Pagination
            aria-label="Page navigation"
            className="d-flex align-items-center"
          >
            {getPrev()}
            {getMid()}
            {getNext()}
          </Pagination>
        </div>
        {Object.keys(pageInfo).length ? (
          <div
            className={`col-12 col-md-4 d-flex align-items-start justify-content-${
              sm ? 'center' : 'start'
            }`}
          >
            <div className="d-flex align-items-center">
              <text>page</text>
              <Select
                className="page-select-wrapper"
                placeholder="page"
                value={{
                  value: pageInfo.currentPage,
                  label: pageInfo.currentPage,
                }}
                options={optionPage}
                onChange={handleChoosePage}
              />
              <text>of {pageInfo.pages}</text>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
