import React from 'react';
import PropsTypes from 'prop-types';
import _ from 'lodash';
const Pagination = props => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li
            className={page === currentPage ? 'page-item active' : 'page-item'}
            key={page}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propsTypes = {
  itemsCount: PropsTypes.number.isRequired,
  pageSize: PropsTypes.number.isRequired,
  onPageChange: PropsTypes.func.isRequired,
  currentPage: PropsTypes.number.isRequired
};
export default Pagination;
