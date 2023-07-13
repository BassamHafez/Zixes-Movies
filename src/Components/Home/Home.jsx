import React, { useContext, useEffect } from "react";
import imgsec1 from "../../images/Game of Thrones - Season I.jpeg";
import googleplay from "../../images/google_en.png";
import store from "../../images/store_en.png";
import logo from "../../images/logo.webp";
import kids from "../../images/Home-kids.png";
import sec3 from "../../images/sec3 img.webp";
import cov1 from "../../images/cov1.jpeg";
import cov2 from "../../images/cov2.jpeg";
import cov3 from "../../images/cov3.jpeg";
import cov4 from "../../images/cov4.jpeg";
import cov5 from "../../images/cov5.jpeg";
import cov6 from "../../images/cov6.jpeg";

import NavContext from "../../NavContext";
import OffcanvasSlide from "./../OffcanvasSlide/OffcanvasSlide";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";
import Slider from "../Slider/Slider";
import MoviesVote from "../MoviesVote/MoviesVote";

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
    console.log(trendingMovies)
    console.log(trendingPeople)
  }, [userInfo]);
  
  return (
    <>
      <Helmet>
        <title>Zixes | Home</title>
      </Helmet>
      {loading === true ? <LoadingScreen /> : ""}


      {userInfo !== null ? (
        // with login--------------------------------------------------------
        <>

          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
             
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
             
              <div className="carousel-inner">
                  <div className="carousel-inner-layout"></div>
                  <div className="carousel-item active">
                      <img src={cov2} className="d-block w-100" alt="" />
                    <div class="carousel-caption home-caption-caros d-none d-md-block">
                      <h2>Zixes-Movie</h2>
                      <h5>Enjoy the best Animation originals, series and movie premieres</h5>
                      <button>Join Now</button>
                    </div>
                  </div>
                  <div className="carousel-item ">
                      <img src={cov1} className="d-block w-100" alt="" />
                      <div class="carousel-caption home-caption-caros d-none d-md-block">
                      <h2>Zixes-Movie</h2>
                      <h5>Watch the biggest movies and best productions</h5>
                      <button>Join Now</button>
                    </div>
                  </div>
                  <div className="carousel-item">
                      <img src={cov5} className="d-block w-100" alt="" />
                      <div class="carousel-caption home-caption-caros d-none d-md-block">
                        <h2>Zixes-Movie</h2>
                        <h5>Enjoy watching your favorite content with no additional fees.</h5>
                        <button>Join Now</button>
                    </div>
                  </div>
              </div>

              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <div className=" slider-parent my-5">
          <h2 className="title-type mb-5 slick-title">Trending Movies</h2>
         <Slider>
            {trendingMovies
              ? trendingMovies.map((movie, index) => (
                  <div className="home-card" key={movie.id}>
                    <div className="home-card-layout d-flex flex-column justify-content-evenly align-items-center">
                      <h4>{`${movie.title}`}</h4>
                      <MoviesVote vote_average={movie.vote_average}/>
                    </div>
                    <img
                      src={`${imgPrefix}${movie.poster_path}`}
                      alt=""
                    />
                  </div>
                ))
              : ""}
          </Slider>
            </div>
         
            <div className='slider-parent my-5'>
              <h2 className="title-type mb-5 slick-title">Trending  Tv Shows</h2>
                <Slider>
                  {trendingTv ? trendingTv.map((movie) =>
                    <div className="home-card" key={movie.id}>
                      <div className="home-card-layout d-flex flex-column justify-content-evenly align-items-center">
                        <h4>{`${movie.name}`}</h4>
                        <MoviesVote vote_average={movie.vote_average}/>
                      </div>
                            <img  src={`${imgPrefix}${movie.poster_path}`} alt="" />
                    </div>
                  ) : ''}
                </Slider>
            </div> 
            <div className=' slider-parent my-5'>
             <h2 className="title-type mb-5 slick-title">Trending People</h2>
              <Slider>
               {trendingPeople ? trendingPeople.map((movie) =>
                    <div className="home-card" key={movie.id}>
                      <div className="home-card-layout d-flex flex-column justify-content-evenly align-items-center">
                        <h4>{`${movie.name}`}</h4>
                        <MoviesVote vote_average={movie.popularity/10}/>
                      </div>
                        <img src={imgPrefix + movie.profile_path} alt="" />
                    </div>
                ) : ''}
              </Slider>
             


            </div> 
        </>
      ) : (
        // without login--------------------------------------------------------
        <>
          <header>
            <div className="header text-center">
              <div className="home-footer">
                <img src={logo} alt="logo" />
                <h1>Unlimited movies, TV shows, and more</h1>
                <h3>Watch anywhere. Cancel anytime.</h3>
              </div>
            </div>
          </header>

          <div className="home-no-login">
            
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

            <section className="sec2 mt-5 px-5">
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

            <section className="sec3 pt-5">
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

            <section className="subscribe mt-5 p-5">
            <div className="text-center pb-5">
                <h2 className="sec1-title">Choose your package</h2>
                <h3 className="special-color">
                    No commitment, cancel anytime
                </h3>
              </div>
              <div className="container-fluid py-5 mb-5">
                <div className="row">
                  <div className="col-md-4 subscibe-item">
                      <h2>VIP Mobile</h2>
                      <p>VIP entertainment with select parks</p>
                      <div className="price-div">
                      <h5>Discover features</h5>
                        <h4>29.99 EGP <del>35 EGP</del></h4>
                      </div>
                      <button>Subscribe</button>
                  </div>
                  <div className="col-md-4 subscibe-item">
                      <h2>VIP</h2>
                      <p>watch originals, exclusive series, movie premieres</p>
                      <div className="price-div">
                      <h5>Discover features</h5>
                        <h4>79.99 EGP <del>100 EGP</del></h4>
                      </div>
                      <button>Subscribe</button>
                  </div>
                  <div className="col-md-4 subscibe-item">
                      <h2>VIP Mobile</h2>
                      <p>VIP entertainment with select parks</p>
                      <div className="price-div">
                      <h5>Discover features</h5>
                        <h4>119.99 EGP <del>130 EGP</del></h4>
                      </div>
                      <button>Subscribe</button>
                  </div>
                </div>
              </div>
            </section>

          </div>


        </>
      )}

      <OffcanvasSlide />
    </>
  );
}
