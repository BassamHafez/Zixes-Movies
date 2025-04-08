import React,{ useContext, useEffect,useState } from 'react'
import ParticlesBackground from '../Particels/ParticlesBackground'
import NavContext from "../../NavContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from "../LoadingScreen/LoadingScreen";



export default function Signup() {

  let {changeNavbar,changeFooter,changeParticleColor,loading,preventScroll,changeLoadingState} = useContext(NavContext)
  let[user,setUser]=useState({
    name:'',email:'',password:'',rePassword:'',phone:''
  });
  let[error,setError]=useState('');
  let[onload,setOnLoad]=useState(false);
  let[errorList,setErrorList]=useState([]);
  let Navigate=useNavigate();


  function setLoad() {
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      preventScroll(false);
      changeLoadingState(false);
    }
  }

  
  useEffect(() => {
    changeLoadingState(true);
    setLoad();
    changeNavbar(true)
    changeFooter(true)
    changeParticleColor(false);
  },[]);



  function getUserData(e){
   let myUser={...user};
   myUser[e.target.name]=e.target.value;
   setUser(myUser);
  }

  function validation() {
    const Joi = require('joi');
  
    const schema = Joi.object({
      name: Joi.string().min(3).max(10).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
      rePassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match password' }),
      phone: Joi.string()
        .pattern(/^01[0125][0-9]{8}$/)
        .required()
        .messages({ 'string.pattern.base': 'Phone number must be a valid Egyptian mobile number' }),
    });
  
    return schema.validate(user, { abortEarly: false });
  }

  async function hasFormSubmit(e){
    e.preventDefault();
    setOnLoad(true)
    let response=validation();
    setError('')
    setErrorList([]);

    if(response.error){
      setOnLoad(false)
      changeParticleColor(true);
      setErrorList(response.error.details)
    }
    else{
      let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',user);
        if(data.message==='success'){
          changeParticleColor(false);
          setError('');
          setOnLoad(false)
          Navigate("/Login")
        }

        else{
          setError(data.message.slice(data.message.indexOf(',')+1))
          changeParticleColor(true);
          setOnLoad(false)
    }
    }
  
  }



  return (
    <>
  {loading === true ? <LoadingScreen/> : ""}
  <ParticlesBackground/>
  {errorList.length>0||error?
    // error case---------------------------------------------------------
  <div className='signup-layer p-5 '>
  <div className='container-fluid'>
    <div className='row sign-up-row'>
    
    <form className='col-md-7 p-5 form-error' onSubmit={hasFormSubmit}>
        <div className="form-floating mb-3">
          <input onChange={getUserData} title='Name' type="text" id='floatingInput' className='form-control' name='name' placeholder="Enter your Name" />
          <label className='label' htmlFor='floatingInput'>Name</label>
        </div>

        <div className="form-floating mb-3">
          <input onChange={getUserData} title='your email' type="email" id='floatingEmail' className='form-control' name='email' placeholder="Enter your email" />
          <label htmlFor='floatingEmail'>Email</label>
        </div>
        <div className="form-floating mb-3">
          <input onChange={getUserData} title='your password' type="password" id='floatingPass' className='form-control' name='password' placeholder="Enter your password" />
          <label htmlFor='floatingPass'>Password</label>
        </div>
        <div className="form-floating mb-3">
          <input onChange={getUserData} title='Confirm Password' type="password" id='floatingConfirmPass' className='form-control' name='rePassword' placeholder="Confirm Password" />
          <label htmlFor='floatingConfirmPass'>Confirm Password</label>
        </div>
        <div className="form-floating mb-3">
          <input onChange={getUserData} title='Phone' type="tel" id='floatingPhone' className='form-control' name='phone' placeholder="Enter your Phone" />
          <label htmlFor='floatingPhone'>Phone</label>
        </div>
        <div className='w-100 m-auto d-flex justify-content-center'>
            <button className='submit-button w-50 ' type='submit'>{onload===true?<i className="fa-solid fa-spin fa-yin-yang"></i>:"Register"}</button>
        </div>
    </form>

      
      <div className=' col-md-5 error-card p-5 text-center'>
        <ul>
            {error?<li><div className='alert alert-danger error-list'>{error}</div></li>:''}
            {errorList.map((error,index)=>error.message.includes("password")?<li key={index} ><div className='alert alert-danger error-list'>Password should have at min three char</div></li>:<li key={index} ><div className='alert alert-danger error-list'> {error.message}</div></li>)}
        </ul>
      </div>
      </div>
    </div>
  </div>:
  // good case---------------------------------------------------------
  
  <div className='signup-layer p-5 '>
  <div className='container-fluid'>
    <div className='row sign-up-row'>
    
    <form className='col-md-7 p-5' onSubmit={hasFormSubmit}>
        <div className="form-floating mb-3">
          <input onChange={getUserData} title='Name' type="text" id='floatingInput' className='form-control' name='name' placeholder="Enter your name" />
          <label className='label' htmlFor='floatingInput'>Name</label>
        </div>
        <div className="form-floating mb-3">
          <input onChange={getUserData} title='your email' type="email" id='floatingEmail' className='form-control' name='email' placeholder="Enter your email" />
          <label htmlFor='floatingEmail'>Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input onChange={getUserData} title='your password' type="password" id='floatingPass' className='form-control' name='password' placeholder="Enter your password" />
          <label htmlFor='floatingPass'>Password</label>
        </div>
        <div className="form-floating mb-3">
          <input onChange={getUserData} title='Confirm Password' type="password" id='floatingConfirmPass' className='form-control' name='rePassword' placeholder="Confirm Password" />
          <label htmlFor='floatingConfirmPass'>Confirm Password</label>
        </div>
        <div className="form-floating mb-3">
          <input onChange={getUserData} title='Phone' type="password" id='floatingPhone' className='form-control' name='phone' placeholder="Phone" />
          <label htmlFor='floatingPhone'>Phone</label>
        </div>
        <div className='w-100 m-auto d-flex justify-content-center'>
            <button className='submit-button w-50 ' type='submit'>{onload===true?<i className="fa-solid fa-spin fa-yin-yang"></i>:"Register"}</button>
        </div>
    </form>

    
      <div className=' col-md-5 noterror-card'><h2 className='form-title text-center'><span className='blue-color'>Sign</span> Up  or <span className='blue-color'>Log</span>  In</h2></div>
      </div>
    </div>
  </div>
  
  }

  
    </>
  )
}
