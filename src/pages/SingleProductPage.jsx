// React
import { useState, useEffect } from 'react'

// Router
import { useParams } from 'react-router-dom'

// Services
import ProductsService from '../services/ProductsService';

// Toastify
import { toast } from 'react-toastify'

// MUI
import Rating from '@mui/material/Rating'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Icons
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

function SingleProductPage() {
  const {id} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [currentImage, setCurrentImage] = useState(0);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    ProductsService.getSingleProduct(id)
      .then((res) => {
        setProduct(res.data)
        // console.log(res.data)
        setIsLoading(true)
        toast.success('Data has been loaded!')
      })
      .catch((err) => console.log(err))
  },[id])

  function handleCurrentImage(i) {
    setCurrentImage(i)
  }
  function handleIncrease() {
    if(counter < product.stock){
      setCounter(counter+1)
    }
  }
  function handleDecrease() {
    if(counter > 1){
      setCounter(counter-1)
    }
  }

  return (
    <div className='container mx-auto'>
        {/* ProductsPage */}
        {
        isLoading 
        ?
        <div className='flex justify-between gap-8'>
          <div className="flex flex-col gap-6 flex-1">
            <img 
            src={product.images[currentImage]} 
            alt={product.title} 
            />

            <div className="flex gap-2">
              {product.images.map((el, i) => {
                return (
                  <img 
                  key={i}
                  src={el}
                  className='w-[20%] border border-slate-500 object-containt'
                  onClick={() => handleCurrentImage(i)}
                  />
                )
              })}
            </div>
          </div>
          <div className="content flex-1">
            <div className="border-b-2 border-black p-8">
              <h3>{product.title}</h3>
              <h4>Price: ${product.price}</h4>
              <p>Description: {product.description}</p>
            </div>
            <div className="p-8 mt-8">

              <p className='flex items-center gap-[10px]'> 
                Stock:
                {product.stock > 0 
                ?
                  <p className='flex items-center gap-[10px] text-green-500'>In Stock: {product.stock} <FaCheck /></p>
                  :
                  <p className='flex items-center gap-[10px] text-red-500'>Out of Stock: {product.stock} <ImCross /></p> 
                }
              </p>

              <p>Brand: {product.brand}</p>

              <div className='flex items-center gap-[10px]'>
                <p>Rating:</p>
                <Rating 
                  name="half-rating-read" 
                  defaultValue={product.rating} 
                  precision={0.5} 
                  readOnly 
                />
              </div>
              
              <div className='flex items-center mt-[20px]'>
                <button 
                className='p-5 bg-slate-300 rounded-l-xl border-2 border-black'
                onClick={handleIncrease}
                >
                  +
                </button>
                <span 
                className='p-5 bg-slate-300 border-t-2 border-b-2 border-black'>
                  {counter}
                </span>
                <button 
                className='p-5 bg-slate-300 rounded-r-xl border-2 border-black'
                onClick={handleDecrease}
                >
                  -
                </button>
              </div>
            </div>
          </div>

          {/* {allProducts.map((el, i) => (
            <ProductCardComponent key={i} product={el} />
          ))} */}
        </div>
        :
        <Box 
          sx=
            {{
              display: 'flex',
              justifyContent: 'center',
              alignItems:'center'
            }}
            >
          <CircularProgress />
        </Box> 
        }
    </div>
  )
}

export default SingleProductPage