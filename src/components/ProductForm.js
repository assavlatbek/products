import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ProductForm = ({ addProduct }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        quantity: '',
        description: '',
    });

    const { name, price, category, quantity, description } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic form validation
        if (!name || !price || !category || !quantity || !description) {
            return;
        }

        const newProduct = {
            id: Date.now(),
            name,
            price: parseFloat(price),
            category,
            quantity: parseInt(quantity),
            description,
        };

        addProduct(newProduct);

        setFormData({
            name: '',
            price: '',
            category: '',
            quantity: '',
            description: '',
        });
    };

    return (
        <div>
            <form className='container' onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-sm-12 col-md-6">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group col-sm-12 col-md-6">
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={category}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group col-sm-12 col-md-6">
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={price}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group col-sm-12 col-md-6">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={quantity}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={description}
                            rows="5"
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

ProductForm.propTypes = {
    addProduct: PropTypes.func.isRequired,
};

export default ProductForm;
