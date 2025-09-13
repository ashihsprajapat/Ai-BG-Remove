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
    </div>
  )
}

export default App
