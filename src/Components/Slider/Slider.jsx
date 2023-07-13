import Slider from "react-slick";
import React, {useState,useEffect } from "react";

export default function SimpleSlider(props) {     
    let [showNumber,setShowNumber]=useState(5);

    function handleResize() {

       if(document.body.clientWidth<900){
        setShowNumber(1);
       }
       else{
        setShowNumber(3);
       }
    }
   
    window.addEventListener('resize', handleResize);

    useEffect(()=>{
      handleResize();
    },[])

    const settings = {
      dots: false,
      infinite: true,
      lazyLoad:true,
      speed: 3000,
      slidesToShow: showNumber,
      centerMode:true,
      centerPadding:0,
      autoplay:true,
      autoplaySpeed:3000,
      // className:'slider-scroll',
      // touchThreshold:20,
    };
    return (
      <Slider {...settings}>
        {props.children}
      </Slider>
    );
  }