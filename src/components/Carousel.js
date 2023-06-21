import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000
  }

  return (
    <div>
      <Slider {...settings}>
        <div>
          <img src={process.env.PUBLIC_URL + '/img/main_banner-1.jpg'} alt="banner1"/>
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + '/img/main_banner-2.jpg'} alt="banner2"/>
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + '/img/main_banner-3.jpg'} alt="banner3"/>
        </div>
      </Slider>
    </div>
  );
};

export default ImageCarousel;