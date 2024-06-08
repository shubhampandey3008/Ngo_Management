import Image from "next/image";
import Navbar from './components/navbar/Navbar';
import EmblaCarousel from './components/Carousel/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel'

const IMAGE_SRC = "https://uttarakhandtourism.gov.in/sites/default/files/2020-07/Pithoragarh%20Banner1.jpg"
const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const images = Array.from({length : SLIDE_COUNT} , (_ , index) => {
  <img
  key={index}
  src = {IMAGE_SRC}
  alt = {` Image ${index + 1}`}></img>
})

export default function Home() {
  return (
     <>
     <Navbar />
     <EmblaCarousel slides={images} options={OPTIONS} />
     </>
  )
}
