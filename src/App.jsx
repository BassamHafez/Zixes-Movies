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
                <Route path='/Zixes-Movie/Movies' element={<ProtectedRout val={'/Zixes-Movie/Movies'}/>} />
                <Route path='/Zixes-Movie/Tv' element={<ProtectedRout val={'/Zixes-Movie/Tv'}/>} />
                <Route path='/Zixes-Movie/' element={<Home/>}/>
                <Route path='/Zixes-Movie/login' element={<Login/>}/>
                <Route path='/Zixes-Movie/Signup' element={<Signup/>}/>
                <Route path='/' element={<Navigate to='/Zixes-Movie/'/>}/>
                {/* <Route path='/Zixes-Movie/' element={<Navigate to='/Home'/>}/> */}
                <Route path='*' element={<Nopage/>}/>
              </Routes>
            <Footer/>
          </BrowserRouter> 
     </NavContextProvider> 
    </>
  )
}
