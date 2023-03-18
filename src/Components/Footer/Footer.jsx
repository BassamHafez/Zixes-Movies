import React,{ useContext } from 'react'
import NavContext from '../../NavContext'


export default function Footer() {

  let {hideFooter}=useContext(NavContext);

  return (
    <>
      <footer className={hideFooter===true?'d-none':'d-flex justify-content-center align-items-center flex-column'}>
        <div>
            <h2 className='h1'>CONTACT US</h2>
        </div>
        <div className='footer-icons mt-2'>
            <i className='fab fa-facebook fa-2x'></i>
            <i className='fab fa-twitter fa-2x '></i>
            <i className='fab fa-tiktok fa-2x'></i>
            <i className='fab fa-youtube fa-2x'></i>
            <i className='fab fa-instagram fa-2x'></i>
        </div>
      </footer>
    </>
  )
}
