import { useEffect, useState } from 'react'

// Services
import ProductsService from '../services/ProductsService'

//Components
import ProductCardComponent from '../components/ProductCardComponent'

// Toastify
import { toast } from 'react-toastify'

// MUI
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ProductsService.getAllProducts()
      .then((res) => {
        setAllProducts(res.data.products)
        setIsLoading(true)
        toast.success('Data has been loaded!')
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
        {
          isLoading
          ?
          (
          <div className='container mx-auto flex flex-wrap justify-between gap-4'>
            {allProducts.map((el) => (
              <ProductCardComponent key={el.id} product={el} />
            ))}
          </div>
          )
          :
          (
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
          )
        }
    </div>
  )
}

export default ProductsPage