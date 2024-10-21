import EmblaCarousel from "./components/Carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, Users, Zap } from "lucide-react";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to Kritansh</h1>
            <p className="text-xl mb-8">Empowering Communities, Changing Lives</p>
            <Button size="lg">Donate Now</Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">About Kritansh</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg mb-4">
              Kritansh is a non-governmental organization dedicated to improving the lives of underprivileged communities across India. Our mission is to provide education, healthcare, and sustainable development opportunities to those in need.
            </p>
            <p className="text-lg mb-4">
              Founded in 2010, we have been working tirelessly to create a positive impact on society. Our team of passionate volunteers and professionals is committed to making a difference in people lives.
            </p>
            <Button variant="outline">Learn More About Us <ArrowRight className="ml-2" /></Button>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="/team.JPG" alt="Kritansh team" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-primary-foreground text-primary">
              <CardHeader>
                <CardTitle className="text-center">
                  <Users size={48} className="mx-auto mb-4" />
                  <span className="text-4xl font-bold">50,000+</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-xl">Lives Impacted</p>
              </CardContent>
            </Card>
            <Card className="bg-primary-foreground text-primary">
              <CardHeader>
                <CardTitle className="text-center">
                  <Zap size={48} className="mx-auto mb-4" />
                  <span className="text-4xl font-bold">100+</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-xl">Projects Completed</p>
              </CardContent>
            </Card>
            <Card className="bg-primary-foreground text-primary">
              <CardHeader>
                <CardTitle className="text-center">
                  <Heart size={48} className="mx-auto mb-4" />
                  <span className="text-4xl font-bold">10,000+</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-xl">Volunteers Engaged</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Programs Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Our Programs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {['Education for All', 'Healthcare Initiatives', 'Sustainable Development'].map((program, index) => (
            <Card key={index}>
              <img src={`/collab${index+2}.jpg`} alt={program} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle>{program}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <Button variant="outline">Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Get Involved</h2>
          <p className="text-xl mb-8">Join us in our mission to create a better world. There are many ways you can contribute!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Donate</Button>
            <Button size="lg" variant="outline">Volunteer</Button>
            <Button size="lg" variant="outline">Partner with Us</Button>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
          <p className="text-xl mb-8">Have questions or want to get involved? Reach out to us!</p>
          <Button size="lg">Contact Us</Button>
        </div>
      </section>
    </div>
  );
}