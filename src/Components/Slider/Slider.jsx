import Slider from "react-slick";
import React, {useState,useEffect } from "react";
export default function SimpleSlider(props) {
 
     
    let [showNumber,setShowNumber]=useState(6);

    function handleResize() {
       if(document.body.clientWidth<800){
        setShowNumber(3);
       }
       else if(document.body.clientWidth<1000){
        setShowNumber(4);
       }

       else{
        setShowNumber(6);
       }
    }
   
    window.addEventListener('resize', handleResize);

    useEffect(()=>{
      handleResize();
    },[])

    const settings = {
      dots: false,
      infinite: true,
      speed: 2000,
      slidesToShow: showNumber,
      slidesToScroll:showNumber,
      autoplay:true,
      autoplaySpeed:3000,
      className:'slider-scroll',
      touchThreshold:20,
    };
    return (
      <Slider {...settings}>
        {props.children}
      </Slider>
    );
  }