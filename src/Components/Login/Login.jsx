import React, { useContext, useEffect, useState } from "react";
import ParticlesBackground from "../Particels/ParticlesBackground";
import NavContext from "../../NavContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function Login() {
  let { changeNavbar, changeFooter, changeParticleColor,loading,preventScroll,changeLoadingState }=useContext(NavContext);
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  let [error, setError] = useState('');
  let [onload, setOnLoad] = useState(false);
  let [errorList, setErrorList] = useState([]);
  let Navigate = useNavigate();


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
    changeNavbar(true);
    changeFooter(true);
    changeParticleColor(false);
    preventScroll(false);
  }, []);

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  function validation() {
    const Joi = require("joi");

    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    return schema.validate(user, { abortEarly: false });
  }

  async function hasFormSubmit(e) {
    e.preventDefault();
    setOnLoad(true);
    let response = validation();
    setError("");
    setErrorList([]);

    if (response.error) {
      setOnLoad(false);
      changeParticleColor(true);
      setErrorList(response.error.details);
    } else {

      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",user);

      if (data.message === "success") {
        changeParticleColor(false);
        setError("");
        setOnLoad(false);
        localStorage.setItem('UserToken',data.token);
        Navigate("/home");
      } else {
        setError(data.message.slice(data.message.indexOf(",") + 1));
        changeParticleColor(true);
        setOnLoad(false);
      }
    }
  }

  return (
    <>
    {loading === true ? <LoadingScreen /> : ""}
      <ParticlesBackground />
      {errorList.length>0||error?
    // error case---------------------------------------------------------
  <div className='login-layer p-5'>
  <div className='container-fluid '>
    <div className='row  log-in-row'>
    
    <form className='col-md-7 p-5 form-error' onSubmit={hasFormSubmit}>
        
        <div className="form-floating mb-3 mt-5">
          <input onChange={getUserData} title='your email' type="email" id='floatingEmail' className='form-control' name='email' placeholder="Enter your email" />
          <label htmlFor='floatingEmail'>Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input onChange={getUserData} title='your password' type="password" id='floatingPass' className='form-control' name='password' placeholder="Enter your password" />
          <label htmlFor='floatingPass'>Password</label>
        </div>
        <div className='w-100 m-auto d-flex justify-content-center'>
            <button className='submit-button w-50 ' type='submit'>{onload===true?<i className="fa-solid fa-spin fa-yin-yang"></i>:"Log in"}</button>
        </div> 
    </form>

    
      <div className=' col-md-4 error-card-login p-2'>
        <ul>
            {error?<li><div className='alert alert-danger error-list'>{error}</div></li>:''}
            {errorList.map((error,index)=>error.message.includes("password")?<li key={index} ><div className='alert alert-danger error-list'>Password should have at min three char</div></li>:<li key={index} ><div className='alert alert-danger error-list'> {error.message}</div></li>)}
        </ul>
      </div>
      </div>
    </div>
  </div>:
  // good case---------------------------------------------------------
  
  <div className='login-layer p-5 '>
  <div className='container-fluid'>
    <div className='row log-in-row'>
    
    <form className='col-md-7 p-5' onSubmit={hasFormSubmit}>
        <div className="form-floating mb-3 mt-5">
          <input onChange={getUserData} title='your email' type="email" id='floatingEmail' className='form-control' name='email' placeholder="Enter your email" />
          <label htmlFor='floatingEmail'>Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input onChange={getUserData} title='your password' type="password" id='floatingPass' className='form-control' name='password' placeholder="Enter your password" />
          <label htmlFor='floatingPass'>Password</label>
        </div>
        <div className='w-100 m-auto d-flex justify-content-center'>
            <button className='submit-button w-50 ' type='submit'>{onload===true?<i className="fa-solid fa-spin fa-yin-yang"></i>:"Log in"}</button>
        </div>
    </form>

    
      <div className=' col-md-4 noterror-card-login over-flow-hidden'><h2 className='form-title text-center mt-5'><span className='blue-color'>log in</span> and enjoy your <span className='blue-color'>movie</span></h2></div>
      </div>
    </div>
  </div>
  
  }
      </>
  );
}
