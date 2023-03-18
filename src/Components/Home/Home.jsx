import React, { useContext, useEffect } from "react";
import imgsec1 from "../../images/Game of Thrones - Season I.jpeg";
import googleplay from "../../images/google_en.png";
import store from "../../images/store_en.png";
import logo from "../../images/logo.webp";
import kids from "../../images/Home-kids.png";
import sec3 from "../../images/sec3 img.webp";
import NavContext from "../../NavContext";
import OffcanvasSlide from "./../OffcanvasSlide/OffcanvasSlide";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";
import Slider from "../Slider/Slider";

export default function Home() {
  let {
    trendingMovies,
    trendingTv,
    trendingPeople,
    changeNavbar,
    changeFooter,
    getUserInfo,
    preventScroll,
    changeLoadingState,
    loading,
    userInfo,
  } = useContext(NavContext);
  let imgPrefix = "https://image.tmdb.org/t/p/w500";
  console.log(trendingMovies);
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
    preventScroll(true);
    changeLoadingState(true);
    changeNavbar(true);
    changeFooter(false);
    getUserInfo();
    setLoad();
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [userInfo]);

  return (
    <>
      <Helmet>
        <title>Zixes | Home</title>
      </Helmet>

      {loading === true ? <LoadingScreen /> : ""}
      <header>
        <div className="header text-center">
          <div className="home-footer">
            <img src={logo} alt="logo" />
            <h1>Unlimited movies, TV shows, and more</h1>
            <h3>Watch anywhere. Cancel anytime.</h3>
          </div>
        </div>
      </header>
      {userInfo !== null ? (
        // with login--------------------------------------------------------
        <>
        <div className="my-5">
          <h2 className="title-type">Trending Movies</h2>
         <Slider>
            {trendingMovies
              ? trendingMovies.map((movie, index) => (
                  <div className="home-card" key={movie.id}>
                    <img
                      src={`${imgPrefix}${movie.poster_path}`}
                      alt=""
                      className="w-100"
                    />
                  </div>
                ))
              : ""}
          </Slider>
          </div>
         
            <div className='my-5'>
              <h2 className="title-type">Trending  Tv Shows</h2>
                <Slider>
                  {trendingTv ? trendingTv.map((movie) =>
                    <div className="home-card" key={movie.id}>
                            <img className='w-100' src={`${imgPrefix}${movie.poster_path}`} alt="" />
                    </div>
                  ) : ''}
                </Slider>
            </div> 
          

            <div className='my-5'>
             <h2 className="title-type">Trending People</h2>
              <Slider>
               {trendingPeople ? trendingPeople.map((movie) =>
                    <div className="home-card" key={movie.id}>
                        <img className='w-100' src={imgPrefix + movie.profile_path} alt="" />
                    </div>
                ) : ''}
              </Slider>
             


            </div> 
        </>
      ) : (
        // without login--------------------------------------------------------

        <>
          <section className="container-fluid  p-5 sec1">
            <div className="row">
              <div className=" col-md-6 ">
                <div>
                  <img className="w-100" src={imgsec1} alt="game of thrones" />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center flex-column justify-content-center">
                <div className="text-center">
                  <h2 className="sec1-title mb-5">Watch everywhere.</h2>
                  <h3 className="special-color">
                    Stream unlimited movies and TV shows on your phone, tablet,
                    laptop, and TV without paying more.
                  </h3>
                </div>
                <div className="text-center pt-3">
                  <h2 className="special-color">Download Our App</h2>
                  <div className="d-flex justify-content-center align-items-center py-4">
                    <div className="download-img">
                      <img
                        className="download-img"
                        src={googleplay}
                        alt="download on google play"
                      />
                    </div>
                    <div className="download-img">
                      <img
                        className="download-img"
                        src={store}
                        alt="download on app store"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="sec2 mt-5">
            <div className="container-fluid">
              <div className="row sec2-row align-items-center justify-content-center">
                <div className="  col-md-6 d-flex align-items-center flex-column justify-content-center">
                  <div className="text-center">
                    <h2 className="sec1-title mb-3">
                      Create profiles for kids
                    </h2>
                    <h3 className="special-color">
                      Send kids on adventures with their favorite characters in
                      a space made just for them—free with your membership
                    </h3>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <img className="w-100" src={kids} alt="Kidsphoto" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="sec3 pt-5 my-5">
            <div className="text-center">
              <h2 className="sec1-title">Watch the way you want</h2>
              <h3 className="special-color">
                Discover the world's greatest stories,all in one place.
              </h3>
            </div>
            <div className="m-auto w-75">
              <img className="w-100" src={sec3} alt="watch the way you want" />
            </div>
          </section>
        </>
      )}

      <OffcanvasSlide />
    </>
  );
}
