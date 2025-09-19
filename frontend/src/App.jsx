import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router'
import Home from './page/Home'
import Result from './page/Result'
import BuyCredits from './page/BuyCredits'
import Navbar from './components/Navbar';
import Footer from './components/Footer'


  import { ToastContainer,  } from 'react-toastify';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buyCredits' element={<BuyCredits />} />

      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App
