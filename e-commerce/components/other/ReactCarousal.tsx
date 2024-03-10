"use client"
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const ReactCarousel = () => {
    return (
        <Carousel
            // autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            showThumbs={false}

        >
            <div className='relative'>
                <img
                    src="https://source.unsplash.com/1000x800/?handmade,product"
                    className='object-cover max-h-[calc(100vh-66px)] w-full '
                />
            </div>
            <div>
                <img
                    src="https://source.unsplash.com/1000x800/?handmade,product2"
                    className='object-cover max-h-[calc(100vh-66px)] w-full '
                />
            </div>
            <div>
                <img
                    src="https://source.unsplash.com/1000x800/?handmade,product3"
                    className='object-cover max-h-[calc(100vh-66px)] w-full '
                />
            </div>
            <div>
                <img
                    src="https://source.unsplash.com/1000x800/?handmade,product4"
                    className='object-cover max-h-[calc(100vh-66px)] w-full '
                />
            </div>
            <div>
                <img
                    src="https://source.unsplash.com/1000x800/?handmade,product5"
                    className='object-cover max-h-[calc(100vh-66px)] w-full '
                />
            </div>
        </Carousel>
    )
}

export default ReactCarousel