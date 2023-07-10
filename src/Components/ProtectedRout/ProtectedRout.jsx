import React from 'react'
import { useContext} from 'react'
import NavContext from '../../NavContext'
import Movies from './../Movies/Movies';
import {Navigate } from 'react-router-dom'
import Tv from './../Tv/Tv';


export default function ProtectedRout({val}) {
    let {userInfo}=useContext(NavContext)

    if(userInfo!==null||localStorage.getItem('UserToken')){
        if(val==='/Zixes-Movie//Movies'){
            return (<Movies/>);
        }
        else if (val==='/Zixes-Movie//Tv'){
            return (<Tv/>);
        }
    }
    else{
        return (<Navigate to='/Zixes-Movie//Login'/>);
    }

}
