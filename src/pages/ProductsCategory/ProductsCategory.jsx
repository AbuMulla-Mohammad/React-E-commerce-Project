import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useReturnData from '../../hooks/useReturnData';
import Loader from '../../components/Loader';
import './ProductsCategory.css'
export default function ProductsCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, errors, isLoading } = useReturnData(`/products/category/${id}`);
  const [returnedErrors, setReturnedErrors] = useState({});
    const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(data.products);
    setReturnedErrors(errors);
  }, [data,errors]);
  const handleClick = (id) => {
    navigate(`/product/${id}`);
}
  if (isLoading) {
    return<Loader/>
  }

    return (
      <>
        <div className="productsCategorySection container">
          <div className="sectionHeader">
                      <span>Categories</span>
                      <h2>Browse By Category</h2>
                  </div>
          
          {
              (returnedErrors&&returnedErrors.message=="Network Error") ? <div  className='errorReterned text-danger fs-4 container'> server errore pleas try again later </div>
              :(products && products.length > 0) ?
              <div className="productsContainer gap-xxl-3 gap-xl-3 justify-content-between">
              {
                
                products?.map(product =>
                  <div className="product col-xxl-3 col-xl-3 col-lg-5 col-md-5 col-sm-12" key={product._id} onClick={()=>handleClick(product._id)}>
                    <img src={product.mainImage.secure_url} alt="" />
                    <div className="productDescre p-3 d-flex gap-2 justify-content-between">
                                <h5 className='text-capitalize'>{product.name}</h5>
                                <span className='price w-50 fs-4'>{product.price} $</span>
                            </div>
                  </div>
                  )
              }
            </div>
              : <h3>ther is no products</h3>
              }
            
          </div>
      </>
  )
}
