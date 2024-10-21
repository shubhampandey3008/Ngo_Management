import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, Gift, Handshake } from "lucide-react"

export default function OurWork() {
  return (
    <div className="bg-background min-h-screen">
      <header className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Our Work</h1>
          <p className="text-xl max-w-2xl mx-auto">
            At Kritansh, we are committed to making a positive impact through education, community support, and collaboration.
          </p>
        </div>
      </header>

      <main className="container mx-auto py-16">
        <Tabs defaultValue="teaching" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="teaching">Weekend Teaching</TabsTrigger>
            <TabsTrigger value="donations">Donation Drives</TabsTrigger>
            <TabsTrigger value="collaboration">NGO Collaboration</TabsTrigger>
          </TabsList>
          <TabsContent value="teaching">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Book className="mr-2" /> Weekend Teaching Program
                </CardTitle>
                <CardDescription>
                  Empowering children through education across three centers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: "Kirti Nagar", location: "New Delhi" },
                    { name: "Haiderpur", location: "New Delhi" },
                    { name: "Shalimar Bagh", location: "New Delhi" },
                  ].map((center, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{center.name}</CardTitle>
                        <CardDescription>{center.location}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <img
                          src={`/collab${index+2}.jpg`}
                          alt={center.name}
                          className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <p>
                          Our dedicated volunteers teach various subjects to underprivileged children every weekend, fostering a love for learning and personal growth.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline">Learn More</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button>Volunteer as a Teacher</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="donations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Gift className="mr-2" /> Donation Drives
                </CardTitle>
                <CardDescription>
                  Supporting our community through regular donation campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Recent Donation Drives</h3>
                    <ul className="space-y-4">
                      {[
                        "Back-to-School Supplies Drive",
                        "Winter Clothing Collection",
                        "Food Bank Replenishment Campaign",
                        "Technology for Education Initiative",
                      ].map((drive, index) => (
                        <li key={index} className="flex items-center">
                          <Gift className="mr-2 text-primary" />
                          <span>{drive}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <img
                      src="/donation.JPG"
                      alt="Donation Drive"
                      className="w-full h-64 object-cover rounded-md mb-4"
                    />
                    <p className="text-muted-foreground">
                      Our donation drives have helped thousands of individuals and families in need. We collect essential items and distribute them to those who need them most.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center space-x-4">
                <Button>Donate Items</Button>
                <Button variant="outline">Organize a Drive</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="collaboration">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Handshake className="mr-2" /> NGO Collaboration
                </CardTitle>
                <CardDescription>
                  Working together to amplify our impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: "EduCare Foundation", focus: "Education" },
                    { name: "GreenEarth Initiative", focus: "Environment" },
                    { name: "HealthFirst NGO", focus: "Healthcare" },
                  ].map((partner, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{partner.name}</CardTitle>
                        <CardDescription>Focus: {partner.focus}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <img
                          src={`/collab${index+2}.jpg`}
                          alt={partner.name}
                          className="w-full h-32 object-cover rounded-md mb-4"
                        />
                        <p className="text-sm text-muted-foreground">
                          Our collaboration with {partner.name} has allowed us to expand our reach and provide more comprehensive support to our beneficiaries.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm">View Partnership</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button>Propose a Collaboration</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Get Involved</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Volunteer</Button>
            <Button size="lg" variant="outline">Donate</Button>
            <Button size="lg" variant="outline">Partner with Us</Button>
          </div>
        </section>
      </main>
    </div>
  )
}