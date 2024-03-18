"use client"

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const BannerCarausal = (props) => {
    const images = props.images
    const slideToShow = props.slideToShow
    return (
        <>
            <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                spaceBetween={15}
                slidesPerView={slideToShow}
                navigation
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                className='h-36 md:h-full rounded-2xl'
            >
                {
                    images.map((item, index) => (
                        <SwiperSlide className='h-full' key={index}>
                            <img
                                src={item.src}
                                alt="Slider Banner"
                                className='h-full rounded-2xl cursor-pointer'
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    )
}

export default BannerCarausal