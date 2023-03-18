import Slider from "react-slick";

export default function SimpleSlider(props) {


    const settings = {
      dots: false,
      infinite: true,
      speed: 2000,
      slidesToShow: 6,
      slidesToScroll:6,
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