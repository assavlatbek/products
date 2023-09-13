import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ProductFilter = ({ products, setFilteredProducts }) => {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [priceSort, setPriceSort] = useState('asc');

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setCategoryFilter(category);
        filterProducts(category, priceSort);
    };

    const handlePriceSortChange = (e) => {
        const sortType = e.target.value;
        setPriceSort(sortType);
        filterProducts(categoryFilter, sortType);
    };

    const filterProducts = (category, sortType) => {
        let filtered = products;

        if (category) {
            filtered = filtered.filter((product) => product.category === category);
        }

        if (sortType === 'asc') {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (sortType === 'desc') {
            filtered = filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(filtered);
    };

    return (
        <div className='row'>
            <div className="form-group col-md-6">
                <label>Category:</label>
                <select className="form-control w-100" onChange={handleCategoryChange} value={categoryFilter}>
                    <option value="">All</option>
                    {Array.from(new Set(products.map((product) => product.category))).map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group col-md-6">
                <label>Sort by Price:</label>
                <select className="form-control w-100" onChange={handlePriceSortChange} value={priceSort}>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
            </div>
        </div>
    );
};

ProductFilter.propTypes = {
    products: PropTypes.array.isRequired,
    setFilteredProducts: PropTypes.func.isRequired,
};

export default ProductFilter;
