import React,{ useContext} from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../../images/my_logo-removebg-preview.png"
import NavContext from '../../NavContext'
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  let {changeNav,userInfo,logOut}=useContext(NavContext)
  let Navigate=useNavigate();

  function navigateToHome(){
    Navigate('/Home');
    logOut();
  }

  return (
    <>
       
        <nav className={changeNav===true?'fixed-top navbarr navbar navbar-expand-lg bg-body-tertiary navbar-dark':'navbarr navbar navbar-expand-lg bg-body-tertiary navbar-dark'}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/Home"><img className='logo' src={logo} alt="logo" /></NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {userInfo!==null? 
          // log in done---------------------------------------------------------------
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">  
              <li className="nav-item px-3">
                <NavLink className="nav-link active" aria-current="page" to="/Zixes-Movie/">Home</NavLink>
              </li>
              <li className="nav-item px-3">
                <NavLink  className="nav-link " aria-current="page" to="/Zixes-Movie/Movies">Movies</NavLink>
              </li>
              <li className="nav-item px-3">
                <NavLink className="nav-link " aria-current="page" to="/Zixes-Movie/Tv">Tv show</NavLink>
              </li>
            </ul>
            //No log in ---------------------------------------------------------------
            :null}
            {userInfo!==null?
            // log in done---------------------------------------------------------------
            <ul className='navbar-nav ms-auto  mb-lg-0 px-5'>
                <li><button onClick={navigateToHome} className="log-out mx-2" >Log out</button></li>
                <li><button data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" title='view profile'  className="profile mx-2" ><i className="fa-solid fa-user"></i></button></li>
            </ul>
             //No log in ---------------------------------------------------------------
            :<ul className='navbar-nav ms-auto mb-2 mb-lg-0 px-5'>
            <li ><NavLink className="nav-link mx-2" to='/Zixes-Movie/login'>Log in</NavLink></li> 
            <li><NavLink className="nav-link  mx-2" to='/Zixes-Movie/Signup'>sign up</NavLink></li>
        </ul>}
          </div>
        </div>
      </nav> 



    </>
  )
}
