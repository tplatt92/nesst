// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Image from "next/image";

// export default function PictureCarousel() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//   };

//   return (
//     <Slider {...settings}>
//       <div>
//         <Image src="/imagesTest/photo2.webp" alt="Image 1" />
//       </div>
//       <div>
//         <Image src="/imagesTest/photo3.webp" alt="Image 2" />
//       </div>
//     </Slider>
//   );
// }

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

export default function NextJsCarousel() {
  return (
    <div>
      <h2>NextJs Carousel - GeeksforGeeks</h2>
      <Carousel>
        <div>
          <Image src="/imagesTest/photo1.webp" alt="image1" />
          <p className="legend">Image 1</p>
        </div>
        <div>
          <Image src="/imagesTest/photo2.webp" alt="image2" />
          <p className="legend">Image 2</p>
        </div>
        <div>
          <Image src="/imagesTest/photo3.webp" alt="image3" />
          <p className="legend">Image 3</p>
        </div>
        <div></div>
      </Carousel>
    </div>
  );
}
