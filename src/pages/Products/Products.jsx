import React, { useEffect, useState } from 'react';
import useReturnData from '../../hooks/useReturnData';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import './Products.css';

export default function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [returnedErrors, setReturnedErrors] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3; // Number of products per page

    const { data, errors, isLoading } = useReturnData(`/products?page=${currentPage}&limit=${pageSize}`);

    useEffect(() => {
        if (data && data.products) {
            setProducts(data.products);
        }
        if (errors) {
            setReturnedErrors(errors);
        }
    }, [data, errors]);

    const handleClick = (id) => {
        navigate(`/product/${id}`);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="productsSection container">
            <div className="sectionHeader">
                <span>Our Products</span>
                <h2>Explore Our Products</h2>
            </div>
            <div className="productsContainer gap-xxl-3 gap-xl-3 justify-content-between">
                {(returnedErrors && returnedErrors.message === "Network Error") ? (
                    <div className='errorReterned text-danger fs-4 m-auto mt-5 mb-5'>Server error, please try again later</div>
                ) : (products && products.length > 0) ? (
                    products.map(product => (
                        <div className="product col-xxl-3 col-xl-3 col-lg-5 col-md-5 col-sm-12" key={product._id} onClick={() => handleClick(product._id)}>
                            <img src={product.mainImage.secure_url} alt="" />
                            <div className="productDescre p-3 d-flex gap-2 justify-content-between">
                                <h5 className='text-capitalize'>{product.name}</h5>
                                <span className='price w-50 fs-4'>{product.price} $</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2 className='container m-auto mt-5 mb-5'>There are no products</h2>
                )}
            </div>
            {(products && products.length > 0) && (
                <nav className='d-flex justify-content-center'>
                    <ul className="pagination">
                        <li className="page-item">
                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                <span aria-hidden="true">«</span>
                            </button>
                        </li>
                        {Array.from({ length: Math.ceil(data.total / pageSize) }, (_, index) => (
                            <li className="page-item" key={index}>
                                <button className={`page-link ${currentPage === index+1 ? 'activePage' : ''}`}onClick={() => handlePageChange(index + 1)}>
                                    {
                                        index + 1
                                    }

                                </button>
                            </li>
                        ))}
                        <li className="page-item">
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(data.total / pageSize)}>
                                <span aria-hidden="true">»</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}
