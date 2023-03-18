import React from 'react'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import Home from './Components/Home/Home.jsx'
import Login from './Components/Login/Login.jsx'
import Movies from './Components/Movies/Movies.jsx'
import Nav from './Components/Nav/Nav.jsx'
import Tv from './Components/Tv/Tv.jsx'
import Signup from './Components/Signup/Signup';
import Nopage from './Components/Nopage/Nopage';
import Footer from './Components/Footer/Footer.jsx'
import { NavContextProvider} from './NavContext';
import ProtectedRout from './Components/ProtectedRout/ProtectedRout.jsx'

export default function App() {

  return (
    <>
    <NavContextProvider>
       <BrowserRouter>
            <Nav/>
            <Routes>
                <Route path='/Movies' element={<ProtectedRout val={'/Movies'}/>} />
                <Route path='/Tv' element={<ProtectedRout val={'/Tv'}/>} />
                <Route path='/Home' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/Signup' element={<Signup/>}/>
                <Route path='/' element={<Navigate to='/Home'/>}/>
                <Route path='*' element={<Nopage/>}/>
              </Routes>
            <Footer/>
          </BrowserRouter> 
     </NavContextProvider> 
    </>
  )
}
