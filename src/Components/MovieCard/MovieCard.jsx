import React, { useState, useContext, useEffect } from "react";
import logo from "../../images/loading_icon.png";
import NavContext from "../../NavContext";
import logoDetailes from "../../images/my_logo-removebg-preview.png";
import MoviesVote from "../MoviesVote/MoviesVote";


export default function MovieCard({ movie, fetchSingleMovie }) {
  let { setSelectedMovie, selectedMovie,preventScroll} = useContext(NavContext);
  const roundedPopularity = `${Math.ceil(selectedMovie.popularity)}`;
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const IMAGE_PATH_DETAILS = "https://image.tmdb.org/t/p/w1280";
  let [errorImage, setErrorImage] = useState("");


  const goDetails = async () => {
    preventScroll(true);
    setSelectedMovie(movie);
  };

  function handleImageError() {
    setErrorImage(
      <div className="no-img">
        <img src={logo} alt="logo" />
      </div>
    );
  }


  useEffect(() => {
    setSelectedMovie(movie);
  }, []);



  return (
    <>
      <div className="col-sm-6 col-md-3  py-4">
        <div className="card movie-card">
          <div className="card-layer">
            <img
              onError={handleImageError}
              src={`${IMAGE_PATH}${movie.poster_path}`}
              className="card-img-top"
              alt="Movie poster"
            />
            <div className="movie-card-layer">
              <i  onClick={goDetails}
                data-bs-toggle="modal"
                data-bs-target="#detailsModal"
                className="fa-solid fa-play movie-layer-icon fa-3x"></i>
            </div>
            {errorImage}
          </div>
          <div className="card-body">
            <h6 className="card-title movie-title text-center">
              {movie.title ? movie.title : movie.name}
            </h6>
            <div className="card-text details-card my-3">
              <button
                onClick={goDetails}
                data-bs-toggle="modal"
                data-bs-target="#detailsModal"
                className="show-details-button"
              >
                <i className="fa-solid fa-plus me-2"></i>show details
              </button>
            </div>
            <div className="card-text  trailer-card my-3">
              <button
                onClick={() => {
                  return goDetails().fetchSingleMovie;
                }}
                data-bs-toggle="modal"
                data-bs-target="#trailerModal"
                className="show-trailer-button"
              >
                <i className="fa-solid fa-play trial-icon me-2"></i> watch
                trailer
              </button>
            </div>
          </div>
          <div className="movie-rate">{movie.vote_average}</div>
        </div>

        {/* details modal------------------------------------------------------------------ */}
         <div
          className="modal fade"
          id="detailsModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-body modal-details-body d-flex align-items-center justify-content-center">
                <div>
                  <div className="container-fluid">
                    <div className="row g-0">
                      <div className=" col-md-6 backdrop-image">
                        {selectedMovie.backdrop_path ? (
                          <div className=" details-image-side d-flex flex-column">
                            <div className="details-image">
                              <img
                                className="w-100"
                                src={`${IMAGE_PATH_DETAILS}${selectedMovie.backdrop_path}`}
                                alt=""
                              />
                              <div className="details-image-layer d-flex justify-content-center align-items-center">
                                <div>
                                  <i className="fa fa-play movie-layer-icon fa-3x"></i>
                                </div>
                              </div>
                            </div>
                            <div className=" image-contain-details-icons d-flex justify-content-center align-items-center mb-2">
                              <ul className=" details-icons d-flex justify-content-center align-items-center  p-2">
                                <li className="mx-4">
                                  <i className="fa-solid fa-heart"></i>
                                </li>
                                <li className="mx-4">
                                  <i className="fa-solid fa-comment"></i>
                                </li>
                                <li className="mx-4">
                                  <i className="fa-solid fa-share-nodes"></i>
                                </li>
                              </ul>
                            </div>
                          <MoviesVote vote_average={selectedMovie.vote_average}/>
                          </div>
                        ) : (
                          <div className="no-details-img-div d-flex justify-content-center align-items-center">
                            <div>
                              <img
                                className="w-100"
                                src={logoDetailes}
                                alt="logo"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className=" col-md-6 Movie-details-card p-4">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <h3 className="movie-details-title">
                            {selectedMovie.title
                              ? selectedMovie.title
                              : selectedMovie.name}
                          </h3>
                          <button
                            type="button"
                            className="btn-close mb-4"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={preventScroll(false)}
                          ></button>
                        </div>
                        <h6 className="overview">{selectedMovie.overview}</h6>
                        <h6 className="overview">
                          <i className="fa-solid fa-calendar"></i>{" "}
                          {selectedMovie.release_date
                            ? selectedMovie.release_date
                            : selectedMovie.first_air_date}
                        </h6>
                        <div className="py-5 counter d-flex justify-content-evenly align-items-center">
                          <div className="vote p-2  d-flex flex-column justify-content-center align-items-cente">
                            <div className="counter-vote d-flex justify-content-center align-items-center">
                              <h5>{selectedMovie.vote_average}</h5>
                            </div>
                            <span className="w-100 text-center">Vote Rate</span>
                          </div>

                          <div className="vote p-2 text-center d-flex flex-column justify-content-center align-items-center">
                            <div className="counter-vote d-flex justify-content-center align-items-center">
                              <h5>{selectedMovie.vote_count}</h5>
                            </div>
                            <span className="w-100 text-center">
                              Vote Count
                            </span>
                          </div>

                          <div className="vote p-2 text-center d-flex flex-column justify-content-center align-items-center">
                            <div className="counter-vote d-flex justify-content-center align-items-center">
                              <h5>{roundedPopularity}</h5>
                            </div>
                            <span className="w-100 text-center">
                              popularity
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              
            </div>
          </div>
        </div>

        </div>

    </>
  );
}
