import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import image4 from "../assets/images/betphoto.png"
import image5 from "../assets/images/betads1.jpg"

function Imagecarosel() {
  return (
    <div>
      <Carousel>
        <div>
          <img src={image4} alt="Slide 1" />
        </div>
        <div>
          <img src={image5} alt="Slide 2" />
        </div>
        <div>
          <img src={image4} alt="Slide 3" />
        </div>
      </Carousel>
    </div>
  );
}

export default Imagecarosel;
