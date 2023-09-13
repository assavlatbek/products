import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import ProductFilter from './ProductFilter';
import Pagination from './Pagination';
import PropTypes from 'prop-types';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);

    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(savedProducts);
        setFilteredProducts(savedProducts);
    }, []);

    const addProduct = (newProduct) => {
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const editProduct = (editedProduct) => {
        const updatedProducts = products.map((product) =>
            product.id === editedProduct.id ? editedProduct : product
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const deleteProduct = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='row'>
            <div className="col-lg-4 col-sm-12">
                <ProductForm addProduct={addProduct} />
            </div>
            <div className="col-lg-8 col-sm-12">
                <ProductFilter products={products} setFilteredProducts={setFilteredProducts} />
                <table className="table mt-0">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product) => (
                            <tr key={product.id}>
                                <td className='fs-5'>{product.name}</td>
                                <td className='fs-5'>${product.price.toFixed(2)}</td>
                                <td className='fs-5'>{product.category}</td>
                                <td className='fs-5'>{product.quantity}</td>
                                <td className='fs-5'>{product.description}</td>
                                <td className='d-flex gap-2'>
                                    <button
                                        className="btn btn-outline-warning mr-2"
                                        onClick={() => editProduct(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-outline-danger ml-2"
                                        onClick={() => deleteProduct(product.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='d-flex justify-content-center'>
                    <Pagination
                        productsPerPage={productsPerPage}
                        totalProducts={filteredProducts.length}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                </div>
            </div>
        </div>
    );
};

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
};

export default ProductList;
