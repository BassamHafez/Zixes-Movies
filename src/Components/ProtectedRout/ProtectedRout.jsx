import React from 'react'
import { useContext} from 'react'
import NavContext from '../../NavContext'
import Movies from './../Movies/Movies';
import {Navigate } from 'react-router-dom'
import Tv from './../Tv/Tv';


export default function ProtectedRout({val}) {
    let {userInfo}=useContext(NavContext)

    if(userInfo!==null||localStorage.getItem('UserToken')){
        if(val==='/Movies'){
            return (<Movies/>);
        }
        else if (val==='/Tv'){
            return (<Tv/>);
        }
    }
    else{
        return (<Navigate to='/Login'/>);
    }

}
