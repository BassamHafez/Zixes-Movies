import React,{useEffect,useContext,useState} from 'react'
import NavContext from "../../NavContext";
import logo from "../../images/logo.webp";
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';
import OffcanvasSlide from '../OffcanvasSlide/OffcanvasSlide';
import LoadingScreen from './../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';

export default function Tv() {
  let {changeNavbar,changeFooter,selectedMovie,getUserInfo,preventScroll,changeLoadingState,loading} = useContext(NavContext)
  let[searchKey,setSearchKey]=useState('');
  let [movies,setMovies]=useState([]);
  let[officialTrailer,setofficialTrailer]=useState('');
  let[currentPage,setCurrentPage]=useState(1);
  let[noTrailer,setnoTrailer]=useState(false);
  let[toggleCanvas,setToggleCanvas]=useState(true);
  let[selectType,setSelectType]=useState("");



  async function getMovies(searchkey){
    preventScroll(true);
    changeLoadingState(true);
    let type =searchkey?'search':"discover"
    let page= currentPage;
    let {data:{results}}= await axios.get(`${process.env.REACT_APP_MOVIE_URL}/${type}/tv`,{
     params:{
    api_key:process.env.REACT_APP_Movie_Key,
    append_to_response:'videos',
    query:searchkey,
    page:page
      }
    })
      setMovies(results);
      preventScroll(false);
      changeLoadingState(false);
  }


  async function fetchSingleMovie(){
    if(selectedMovie.id){
      let {data}= await axios.get(`${process.env.REACT_APP_MOVIE_URL}/tv/${selectedMovie.id}`,{
        params:{
          api_key:process.env.REACT_APP_Movie_Key,
          append_to_response:'videos',
         }
       })
       if(data.videos.results.length!==0){
        if(data.videos.results.find(vid=> vid.name==='Official Trailer')){
          setofficialTrailer(data.videos.results.find(vid=> vid.name==='Official Trailer').key)
          setnoTrailer(false)
        }
        else{
          setofficialTrailer(data.videos.results[0].key)
          setnoTrailer(false)
        }
       }
       else{
        setnoTrailer(true)
       }
       
       
    }
 }

  function searchMovie(e){
    e.preventDefault();
    getMovies(searchKey);
  }


 function selectingType(e){
    setSelectType(e.target.name)
  }
  
   async function getTypesOfMovies() {
      preventScroll(true);
      changeLoadingState(true);
      let type = selectType?selectType:'discover';
      let page = currentPage;
      let {data:{results}} = await axios.get(selectType?`${process.env.REACT_APP_MOVIE_URL}/tv/${type}`:`${process.env.REACT_APP_MOVIE_URL}/${type}/tv`, {
        params: {
          api_key: process.env.REACT_APP_Movie_Key,
          page: page,
        },
      });
      setMovies(results);
      preventScroll(false);
      changeLoadingState(false);
    }
  
  function removeContentOfSelectType(){
    setSelectType('');
  }


  function displayMovies(){
    <MovieCard callTrailer={fetchSingleMovie()}></MovieCard>
    return movies.map((movie)=><MovieCard  key={movie.id} movie={movie}/>)
  }
  function clearOfficialTrailer (){
    setofficialTrailer('');
  }

  function changeCurrentPage(number){
    let page={...currentPage};
    page=number;
    setCurrentPage(page)
  }
  function incrementCurrentPage(){
    setCurrentPage(++currentPage)
  }
   function decrementCurrentPage(){
    if(currentPage===1){
      setCurrentPage(1)
    }
    else{
      setCurrentPage(--currentPage)
    }
    
  }

  function toggleSortingCanvas(){
    setToggleCanvas(current=>!current)
  }
 


  useEffect(() => {
    changeNavbar(true);
    changeFooter(false);
    getUserInfo();
    getMovies();
  },[]);

  useEffect(() => {
    {selectType?getTypesOfMovies():getMovies()}
  },[currentPage]);

  useEffect(() => {
    getTypesOfMovies();
    }, [selectType]);

  return (
    <>
      <Helmet>
        <title>Zixes | Tv show</title>
      </Helmet>
        {loading===true?<LoadingScreen/>:''}
           <header>
        <div className='movie-header text-center'>
        <div className="home-footer">
            <img src={logo} alt="logo" />
            <h1>Unlimited movies, TV shows, and more</h1>
            <h3>Watch anywhere. Cancel anytime.</h3>
            <form onSubmit={searchMovie} className="mt-5 px-5 search-form">
                <div className=" input-group ">
                  <input onChange={(e)=>setSearchKey(e.target.value)}  type="text" className='form-control' name='search' placeholder="Search Movie" aria-describedby="button-addon" />
                  <button type="submit" className="submit-button" id="button-addon" >search</button>
              </div>              
            </form>
          </div>
        </div>
           </header>
          <div className="container">

          <div className="controls d-flex justify-content-center align-items-center mt-5">

            <div aria-label="Page navigation example choosing-page bg-warning">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <button
                    onClick={decrementCurrentPage}
                    className="page-link"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true" className="incre-and-dec-span">
                      &laquo;
                    </span>
                  </button>
                </li>
                <li className="page-item">
                  <button
                    onClick={() => changeCurrentPage(1)}
                    className="page-link"
                  >
                    1
                  </button>
                </li>
                <li className="page-item">
                  <button
                    onClick={() => changeCurrentPage(2)}
                    className="page-link"
                  >
                    2
                  </button>
                </li>
                <li className="page-item">
                  <button
                    onClick={() => changeCurrentPage(3)}
                    className="page-link"
                  >
                    3
                  </button>
                </li>
                <li className="page-item">
                  <button
                    onClick={() => changeCurrentPage(4)}
                    className="page-link"
                  >
                    4
                  </button>
                </li>
                <li className="page-item">
                  <button
                    onClick={() => changeCurrentPage(5)}
                    className="page-link"
                  >
                    5
                  </button>
                </li>
                <li className="page-item">
                  <button
                    onClick={() => changeCurrentPage(6)}
                    className="page-link"
                  >
                    6
                  </button>
                </li>
                <li className="page-item">
                  <button
                    onClick={incrementCurrentPage}
                    className="page-link"
                    aria-label="Next"
                  >
                    <span aria-hidden="true" className="incre-and-dec-span">
                      &raquo;
                    </span>
                  </button>
                </li>
              </ul>
            </div>
            </div>

            <h2 className="title-type">{selectType?selectType:"Discover"}</h2>   

            <div className="row my-3">
              {displayMovies()}
            </div>
          </div>

          <div aria-label="Page navigation example choosing-page">
          <ul className="pagination mb-5  justify-content-center">
                <li className="page-item">
                  <button onClick={decrementCurrentPage} className="page-link"  aria-label="Previous">
                    <span aria-hidden="true" className="incre-and-dec-span">&laquo;</span>
                  </button>
                </li>
                <li className="page-item"><button onClick={()=>changeCurrentPage(1)} className="page-link" >1</button></li>
                <li className="page-item"><button onClick={()=>changeCurrentPage(2)} className="page-link">2</button></li>
                <li className="page-item"><button onClick={()=>changeCurrentPage(3)} className="page-link">3</button></li>
                <li className="page-item"><button onClick={()=>changeCurrentPage(4)} className="page-link">4</button></li>
                <li className="page-item"><button onClick={()=>changeCurrentPage(5)} className="page-link">5</button></li>
                <li className="page-item"><button onClick={()=>changeCurrentPage(6)} className="page-link">6</button></li>
                <li className="page-item">
                  <button onClick={incrementCurrentPage} className="page-link" aria-label="Next">
                    <span aria-hidden="true" className="incre-and-dec-span">&raquo;</span>
                  </button>
                </li>
          </ul>
         </div>
          <div className="modal fade" id="trailerModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                  <div className="modal-content">
                    <div className="modal-body p-5 d-flex align-items-center justify-content-center modal-trailer-body">
                     {noTrailer===false? <iframe title="trailer" src={`https://www.youtube.com/embed/${officialTrailer}`} className='ifram-trailer'></iframe>:
                     <div className='h-100 d-flex justify-content-center align-items-center'>
                        <h3>we are sorry Trailer not Available :(</h3>
                     </div>
                     }
                     
                      <button onClick={clearOfficialTrailer} type="button" className="btn-close btn-trailer" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                  </div>
                </div>
              </div>


              <div className={toggleCanvas?"sorting-offcanvas-parent d-flex align-items-center sorting-container show-sorting-canvas":"sorting-offcanvas-parent d-flex align-items-center sorting-container"}>
               
               <div className="sorting-offcanvas my-5">
                   <div className="sorting-offcanvas-layer d-flex align-items-center">
                     <ul className="ul fa-ul">
                         <li><span className="fa-li"><i className="fa-solid fa-fire"></i></span> <button onClick={removeContentOfSelectType}>Discover </button>  </li>
                         <li><span className="fa-li"> <i className="fa-solid fa-heart-circle-plus"></i></span><button onClick={selectingType} name="popular">Popular</button> </li>
                         <li><span className="fa-li"><i className="fa-solid fa-star"></i></span><button onClick={selectingType} name="top_rated">Top Rated </button> </li>
                         <li><span className="fa-li"><i className="fa-solid fa-circle-play"></i></span><button onClick={selectingType} name="on_the_air">On the air </button> </li>
                         <li><span className="fa-li"><i className="fa-solid fa-bomb"></i></span><button onClick={selectingType} name="airing_today">Airing today </button> </li>
                       </ul>
                     </div>
               </div>
     
               <div className=" sorting-button-div">
                 <div className="sorting-button">    
                   <button onClick={toggleSortingCanvas}><i className="fa fa-gear"></i></button>
                   </div>
               </div>  
     
             </div>

              <OffcanvasSlide/>
    </>
  )
}
