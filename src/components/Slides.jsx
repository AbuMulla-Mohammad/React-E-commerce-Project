
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import './style/Slides.css'


export default function Slides() {
  return (
    <>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar,Autoplay]}
        autoplay={{ delay: 3000 }}
        className="mySwiper swiper"
      >
        <SwiperSlide className='swiperSlide'><img src="./banners/banner.png" alt="" /></SwiperSlide>
        <SwiperSlide className='swiperSlide'><img src="./banners/banner-1.jpg" alt="" /></SwiperSlide>
        <SwiperSlide className='swiperSlide'><img src="./banners/banner-2.jpg" alt="" /></SwiperSlide>

      </Swiper>
  </>
  )
}
