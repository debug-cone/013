// Axios
import axios from 'axios'
axios.defaults.baseURL = 'https://dummyjson.com'

// Outlet React-Router
import { Outlet } from 'react-router-dom'

// Components
import NavbarComponent from './components/NavbarComponent'

// Toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div>
      <NavbarComponent />

      <Outlet />

      <ToastContainer />
    </div>
  )
}

export default App
