import React,{ useContext } from 'react'
import NavContext from '../../NavContext'
import logo from "../../images/my_logo-removebg-preview.png"


export default function Footer() {

  let {hideFooter}=useContext(NavContext);

  return (
    <>
      <footer className={hideFooter===true?'d-none':'d-flex justify-content-center align-items-center flex-column'}>
       
       <div className='footer-logo-div'>
          <img src={logo} className='footer-logo' alt="" />
       </div>

        <div className='row justify-content-center align-items-center'>
          <h5 className=' col p-2'>Explore</h5>
          <h5 className=' col p-2'>Contact Us</h5>
          <h5 className=' col p-2'>Help Center</h5>
          <h5 className=' col p-2'>Apps</h5>
          <h5 className=' col p-2'>Terms & Conditions</h5>
          <h5 className=' col p-2'>Privacy Policy</h5>
        </div>
        <div className='footer-icons mt-2'>
            <i className='fab fa-facebook fa-2x'></i>
            <i className='fab fa-twitter fa-2x '></i>
            <i className='fab fa-tiktok fa-2x'></i>
            <i className='fab fa-youtube fa-2x'></i>
            <i className='fab fa-instagram fa-2x'></i>
        </div>
        <div className=' mt-2'>
          <p>All rights reserved Zixes-Movies 2023 ©</p>
        </div>
      </footer>
    </>
  )
}
