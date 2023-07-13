import React,{ useContext, useEffect,useState } from 'react'
import ParticlesBackground from '../Particels/ParticlesBackground'
import NavContext from "../../NavContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from "../LoadingScreen/LoadingScreen";



export default function Signup() {

  let {changeNavbar,changeFooter,changeParticleColor,loading,preventScroll,changeLoadingState} = useContext(NavContext)
  let[user,setUser]=useState({
    first_name:'',last_name:'',email:'',password:'',age:''
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
    changeNavbar(true)
    changeFooter(true)
    changeParticleColor(false);
    changeLoadingState(true);
    setLoad();
  },[]);



  function getUserData(e){
   let myUser={...user};
   myUser[e.target.name]=e.target.value;
   setUser(myUser);
  }

  function validation(){

  const Joi = require('joi');

    const schema= Joi.object({
      first_name:Joi.string().min(3).max(10).required(),
      last_name:Joi.string().min(3).max(10).required(),
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      age:Joi.number().min(10).max(90).required()

    })
    return schema.validate(user,{abortEarly:false});
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
      let {data}= await axios.post('https://movies-api.routemisr.com/signup',user);
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
          <input onChange={getUserData} title='first name' type="text" id='floatingInput' className='form-control' name='first_name' placeholder="Enter your first name" />
          <label className='label' htmlFor='floatingInput'>first name</label>
        </div>
        <div className="form-floating mb-3">
          <input onChange={getUserData} title='last name' type="text" id='floatingInputLast' className='form-control' name='last_name' placeholder="Enter your last name" />
          <label className='label' htmlFor='floatingInputLast'>last name</label>
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
          <input onChange={getUserData} title='your age' type="age" id='floatingAge' className='form-control' name='age' placeholder="Enter your first Age" />
          <label htmlFor='floatingAge'> Your Age</label>
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
          <input onChange={getUserData} title='first name' type="text" id='floatingInput' className='form-control' name='first_name' placeholder="Enter your first name" />
          <label className='label' htmlFor='floatingInput'>first name</label>
        </div>
        <div className="form-floating mb-3">
          <input onChange={getUserData} title='last name' type="text" id='floatingInputLast' className='form-control' name='last_name' placeholder="Enter your last name" />
          <label className='label' htmlFor='floatingInputLast'>last name</label>
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
          <input onChange={getUserData} title='your age' type="age" id='floatingAge' className='form-control' name='age' placeholder="Enter your first Age" />
          <label htmlFor='floatingAge'> Your Age</label>
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
