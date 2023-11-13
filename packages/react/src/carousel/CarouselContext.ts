import React, { createContext, useContext } from 'react';

export type CarouselContextProps = {
    currentSlide: number;
    slidesPerView: number;
};

export const CarouselContext = createContext<CarouselContextProps>({
    currentSlide: 0,
    slidesPerView: 1,
});

export const useCarouselContext = (): CarouselContextProps =>
    useContext(CarouselContext);
