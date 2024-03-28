import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useReturnData from '../../hooks/useReturnData';
import Loader from '../../components/Loader';

export default function ProductsCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
    const {data,errors,isLoading}=useReturnData(`/products/category/${id}`)
    const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(data.products);
  }, [data]);
  const handleClick = (id) => {
    navigate(`/product/${id}`);
}
  if (isLoading) {
    return<Loader/>
  }

    return (
      <>
        {
          (products && products.length > 0) ?
          <div className="products" >
          {
            
            products?.map(product =>
              <div className="product" key={product._id} onClick={()=>handleClick(product._id)}>
                <h2>{product.name}</h2>
                <img src={product.mainImage.secure_url} alt="" />
              </div>
              )
          }
        </div>
          : <h3>ther is no products</h3>
        }
      </>
  )
}
