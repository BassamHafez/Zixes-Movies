import jwtDecode from 'jwt-decode';
import { createContext,useState} from 'react';
import React, {useEffect } from "react";
import  axios  from 'axios';

const NavContext = createContext()

export function NavContextProvider(props) {

    
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTv, setTrendingTv] = useState([]);
    const [trendingPeople, setTrendingPeople] = useState([]);
    let [changeNav, setChangeNav] = useState(true);
    let[hideFooter,setHideFooter]=useState(false);
    let[particleColor,setParticleColor]=useState("");
    let[userInfo,setUserInfo]=useState(null);
    let[selectedMovie,setSelectedMovie]=useState({});
    let[userInformation,setUserInformation]=useState({});
    let[loading,setLoading]=useState(false);
    let [showing,setShowing]=useState();


    function changeNavbar(x){
            if(x===true){
                setChangeNav(true)
               
            }
            else{
                setChangeNav(false)
                
            }
           
    }

    function changeFooter(x){
        if(x===true){
            setHideFooter(true)
           
        }
        else{
            setHideFooter(false)
            
        }
    }
    function changeParticleColor(x){
        if(x===true){
            setParticleColor("ff0000")
           
        }
        else{
            setParticleColor("ffffff")
        }
    }
   async function getUserInfo(){
        let codedInfo=localStorage.getItem("UserToken")
        setUserInfo(codedInfo);
        if(userInfo!==null){
            let decodedInfo= await jwtDecode(codedInfo);
            setUserInformation(decodedInfo);
            return decodedInfo;
        }
    }
    function logOut(){
        localStorage.removeItem('UserToken');
        setUserInfo(null);
    }

    function preventScroll(x){
        if(x===true){
            document.body.style.overflow='hidden'
        }
        else{
            document.body.style.overflow='auto'
        }
    }
    function changeLoadingState(x){
        if(x===true){
            setLoading(true)
        }
        else{
            setLoading(false)
        }
    }
    
    async function getTrendingMedia(mediaType, callback) {
        let { data } = await axios.get(`${process.env.REACT_APP_MOVIE_URL}/trending/${mediaType}/week`,{
            params:{
                api_key: process.env.REACT_APP_Movie_Key,
            }
        });
        callback(data.results);
    }


    useEffect(() => {
        getTrendingMedia('movie', setTrendingMovies);
        getTrendingMedia('tv', setTrendingTv);
        getTrendingMedia('person', setTrendingPeople);
    }, []);



    return (
      <NavContext.Provider value={{changeNav,changeNavbar,changeFooter,hideFooter,particleColor,changeParticleColor,getUserInfo,userInfo,logOut,selectedMovie,setSelectedMovie,userInformation,changeLoadingState,preventScroll,loading,setShowing,showing, trendingMovies, trendingTv, trendingPeople }}>
        {props.children}
      </NavContext.Provider> 
    );
  }

export default NavContext;