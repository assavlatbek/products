import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    productsPerPage: PropTypes.number.isRequired,
    totalProducts: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
};

export default Pagination;
