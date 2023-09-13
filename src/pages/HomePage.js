import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button, Form, Table, Pagination, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Product = ({ product, onDelete, onEdit }) => {
  const { id, name, price, category, quantity, description } = product;

  return (
    <tr>
      <td>{name}</td>
      <td>${price}</td>
      <td>{category}</td>
      <td>{quantity}</td>
      <td>{description}</td>
      <td className='d-flex gap-2'>
        <Button className='py-2 px-3' variant="outline-danger" onClick={() => onDelete(id)}>
          Delete
        </Button>
        <Button className='py-2 px-3' variant="outline-primary" onClick={() => onEdit(product)}>
          Edit
        </Button>
      </td>
    </tr>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

const HomePage = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    return savedProducts;
  });
  const [newProduct, setNewProduct] = useState({});
  const [editedProduct, setEditedProduct] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredCategory, setFilteredCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('filteredCategory', filteredCategory);
  }, [filteredCategory]);

  const addProduct = () => {
    if (validateProduct(newProduct)) {
      const updatedProducts = [...products, { ...newProduct, id: Date.now() }];
      setProducts(updatedProducts);
      setNewProduct({});
      updateCategoryFilters(newProduct.category);
    } else {
      alert('Please fill in all fields.');
    }
  };

  const editProduct = () => {
    if (validateProduct(editedProduct)) {
      const updatedProducts = products.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      );
      setProducts(updatedProducts);
      setEditedProduct({});
    } else {
      alert('Please fill in all fields.');
    }
  };

  const deleteProduct = (id) => {
    const deletedProduct = products.find((product) => product.id === id);
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    removeCategoryFilter(deletedProduct.category);
  };

  const updateCategoryFilters = (category) => {
    if (!categoryExistsInFilters(category)) {
      setCategoryFilters([...categoryFilters, category]);
    }
  };

  const removeCategoryFilter = (category) => {
    setCategoryFilters(categoryFilters.filter((filter) => filter !== category));
  };

  const categoryExistsInFilters = (category) => {
    return categoryFilters.includes(category);
  };

  const validateProduct = (product) => {
    return (
      product.name &&
      product.price &&
      product.category &&
      product.quantity &&
      product.description
    );
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (filteredCategory !== 'All') {
      filtered = filtered.filter((product) => product.category === filteredCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [products, filteredCategory, searchTerm]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      return (a.price - b.price) * multiplier;
    });
  }, [filteredProducts, sortOrder]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const [categoryFilters, setCategoryFilters] = useState([]);

  return (
    <div className="container products">
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newProduct.name || editedProduct.name || ''}
                onChange={(e) => {
                  if (editedProduct.id) {
                    setEditedProduct({ ...editedProduct, name: e.target.value });
                  } else {
                    setNewProduct({ ...newProduct, name: e.target.value });
                  }
                }}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={newProduct.price || editedProduct.price || ''}
                onChange={(e) => {
                  if (editedProduct.id) {
                    setEditedProduct({ ...editedProduct, price: e.target.value });
                  } else {
                    setNewProduct({ ...newProduct, price: e.target.value });
                  }
                }}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={newProduct.category || editedProduct.category || ''}
                onChange={(e) => {
                  if (editedProduct.id) {
                    setEditedProduct({ ...editedProduct, category: e.target.value });
                  } else {
                    setNewProduct({ ...newProduct, category: e.target.value });
                  }
                }}
              />
            </Form.Group>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={newProduct.quantity || editedProduct.quantity || ''}
                onChange={(e) => {
                  if (editedProduct.id) {
                    setEditedProduct({ ...editedProduct, quantity: e.target.value });
                  } else {
                    setNewProduct({ ...newProduct, quantity: e.target.value });
                  }
                }}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={newProduct.description || editedProduct.description || ''}
                onChange={(e) => {
                  if (editedProduct.id) {
                    setEditedProduct({ ...editedProduct, description: e.target.value });
                  } else {
                    setNewProduct({ ...newProduct, description: e.target.value });
                  }
                }}
              />
            </Form.Group>
            {editedProduct.id ? (
              <Button variant="outline-info w-100 mt-3 py-2 px-5" onClick={editProduct}>
                Edit Product
              </Button>
            ) : (
              <Button variant="outline-primary w-100 mt-3 py-2 px-5" onClick={addProduct}>
                Add Product
              </Button>
            )}
          </Form>
        </div>
        <div className="col-md-8 col-sm-12">
          <div className="filter-sort row">
            <Form.Group className="col-4" controlId="search">
              <Form.Control
                type="text"
                className='w-100'
                placeholder="Search by Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="col-4" controlId="categoryFilter">
              <Form.Control
                as="select"
                className='w-100'
                value={filteredCategory}
                onChange={(e) => setFilteredCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categoryFilters.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="col-4" controlId="priceSort">
              <Form.Control
                className='w-100'
                as="select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Sort Ascending</option>
                <option value="desc">Sort Descending</option>
              </Form.Control>
            </Form.Group>
          </div>
          <Table hover striped bordered >
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
                <Product
                  key={product.id}
                  product={product}
                  onDelete={deleteProduct}
                  onEdit={setEditedProduct}
                />
              ))}
            </tbody>
          </Table>
          {!currentProducts.length && <Alert className='w-100 text-center' variant="danger">Not found!</Alert>}
          <Pagination>
            {Array.from({ length: totalPages }).map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
