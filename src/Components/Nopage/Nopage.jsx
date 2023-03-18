import React,{ useContext, useEffect } from 'react'
import NavContext from "../../NavContext";
import errorImg from '../../images/boy_for_error_4042.png'


export default function Nopage() {

  let {changeNavbar,changeFooter} = useContext(NavContext)

  useEffect(() => {
    changeNavbar(false)
    changeFooter(true)
  });

  return (
    <>
     <div className='container'>
        <div className='row'>
          <div className='col-md-6 d-flex justify-content-center align-items-center'>
            <div className='text-center'>
              <h2 className='error-title'>404 PAGE NOT FOUND</h2>
              <h4 className='error-subtitle'>Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific.</h4>
            </div>
          </div>
          <div className='col-md-6'>
            <img src={errorImg} alt="error 404" />
          </div>
        </div>
     </div>
    </>
  )
}
