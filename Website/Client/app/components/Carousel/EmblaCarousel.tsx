"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 5000 , stopOnInteraction : false})
  ])
  const [isPlaying, setIsPlaying] = useState(false)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay
      if (!autoplay) return

      callback()
    },
    [emblaApi]
  )

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return
  }, [emblaApi])

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return
  }, [emblaApi])

  // Array of image URLs
  const images = [
    "/20240804_164455.jpg",
    "/IMG-20240610-WA0039.jpg",
    "/IMG-20240610-WA0060.jpg"
  ]

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
        {slides.map((index) => (
            <div key={index} className="embla__slide">
              <img
                className="embla__slide__img"
                src={images[index % images.length]}
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .embla__slide {
          flex: 0 0 100%;
          min-width: 0;
          position: relative;
          aspect-ratio: 2.5 / 1; /* This maintains a 1200x600 aspect ratio */
        }
        .embla__slide__img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  )
}

export default EmblaCarousel


// const images = [
//   "https://uttarakhandtourism.gov.in/sites/default/files/2020-07/Pithoragarh%20Banner1.jpg",
//   "/IMG-20240610-WA0039.jpg"
// ]