import Image from "next/image";
import Navbar from './components/navbar/Navbar';
import EmblaCarousel from './components/Carousel/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5

const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function Home() {
  return (
     <>
     <Navbar />
     <EmblaCarousel slides={SLIDES} options={OPTIONS} />
     </>
  )
}
