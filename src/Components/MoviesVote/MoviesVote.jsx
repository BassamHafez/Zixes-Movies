import React from 'react'

export default function MoviesVote(props) {
const vote = Math.round(props.vote_average);

    function setRatingVote(){
          if(vote>=9.5){
            return   <div className="d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
            <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
                <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
                <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
                <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
            </div>
          }
          if(vote>=8 && vote<9.5){
            return   <div className="d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
            <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
                <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
                <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
                <i className="fa-solid fa-star-half-stroke fa-2x" style={{color: "#ffbb00"}}></i>
            </div>
          }
          else if (vote>=6 && vote<8){
            return <div className="d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
            <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
                <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
                <i className="fa-solid fa-star-half-stroke fa-2x" style={{color: "#ffbb00"}}></i>
                <i className="fa-regular fa-star fa-2x"></i>
            </div>
          }
          else if (vote===5){
            return <div className="d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
                <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
                <i className="fa-solid fa-star-half-stroke fa-2x" style={{color: "#ffbb00"}}></i>
                <i className="fa-regular fa-star fa-2x"></i>
                <i className="fa-regular fa-star fa-2x"></i>
            </div>
          }
          else if(vote>=4 && vote<6){
            return <div className="d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
            <i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
            <i className="fa-regular fa-star fa-2x"></i>
            <i className="fa-regular fa-star fa-2x"></i>
            <i className="fa-regular fa-star fa-2x"></i>
      
            </div>
          }
          else{
            return <div><i className="fa-solid fa-star fa-2x" style={{color: "#ffbb00"}}></i>
            <i className="fa-regular fa-star fa-2x"></i>
            <i className="fa-regular fa-star fa-2x"></i>
            <i className="fa-regular fa-star fa-2x"></i>
            <i className="fa-regular fa-star fa-2x"></i>
            <i className="fa-regular fa-star fa-2x"></i>
            </div>
          }
      }
  return (
    <>
     {setRatingVote()} 
    </>
  )
}
