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
     <div className="m-8 mt-10">
          <div className="p-8 max-w-7xl mx-auto">
            <h1 className="font-sans text-4xl font-bold">
              WHAT DO WE DO
            </h1>
            <div className="font-ral text-lg pt-4">
               <p>
                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam quasi architecto laborum. Necessitatibus accusantium quia sit dolores aliquid maiores eius quibusdam veritatis, odio blanditiis! Culpa dicta magnam, a quisquam vel cum sapiente. Harum, nemo voluptates nobis reprehenderit autem ea laborum odit dolorem deserunt sapiente iure dolor corrupti!
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dignissimos at nostrum consequuntur provident voluptatum neque cupiditate? Harum iste illo magnam blanditiis. Voluptas rem odio necessitatibus perspiciatis dolorum rerum ea!
                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus neque, culpa accusantium ipsum corrupti quam deserunt beatae nesciunt quas repudiandae molestias ullam cumque quaerat possimus voluptatibus numquam. Quo, minima eveniet?
               </p>
            </div>
          </div>
          <div className="p-8 max-w-7xl mx-auto">
            <h1 className="font-sans text-4xl font-bold">
              WHY NGO
            </h1>
            <div className="font-ral text-lg pt-4">
               <p>
                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam quasi architecto laborum. Necessitatibus accusantium quia sit dolores aliquid maiores eius quibusdam veritatis, odio blanditiis! Culpa dicta magnam, a quisquam vel cum sapiente. Harum, nemo voluptates nobis reprehenderit autem ea laborum odit dolorem deserunt sapiente iure dolor corrupti!
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dignissimos at nostrum consequuntur provident voluptatum neque cupiditate? Harum iste illo magnam blanditiis. Voluptas rem odio necessitatibus perspiciatis dolorum rerum ea!
                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus neque, culpa accusantium ipsum corrupti quam deserunt beatae nesciunt quas repudiandae molestias ullam cumque quaerat possimus voluptatibus numquam. Quo, minima eveniet?
               </p>
            </div>
          </div>
     </div>

     </>
  )
}