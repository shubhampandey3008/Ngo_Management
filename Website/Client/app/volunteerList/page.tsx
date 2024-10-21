'use client'

import { useState, useEffect, useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import type { Volunteer } from '../volunteers/volunteer'

interface SearchCriteria {
  name: string
  email: string
}

const VOLUNTEERS_PER_PAGE = 5

export default function VolunteerList() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    name: '',
    email: ''
  })

  const fetchVolunteers = useCallback(async () => {
    console.log("fetching Volunteers") 
    console.log("nameFilter" , searchCriteria.name) 
    console.log("emailFilter" , searchCriteria.email) 
    console.log("page" , page)
    try {
      const response = await fetch("/api/volunteerList", {
        cache : 'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameFilter: searchCriteria.name,
          emailFilter: searchCriteria.email,
          limit: VOLUNTEERS_PER_PAGE,
          page: page
        })
      })
      
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const data = await response.json()

      if (data.volunteers.length === 0) {
        console.log("didn't get anything")
        setHasMore(false)
      } else {
        setVolunteers(prev => page === 1 ? data.volunteers : [...prev, ...data.volunteers])
        setPage(prev => prev + 1)
        setHasMore(data.hasMore)
      }
    } catch (error) {
      console.error("Error fetching volunteers:", error)
    }
  }, [page, searchCriteria])

  useEffect(() => {
    setVolunteers([])
    setPage(1)
    setHasMore(true)
  }, [searchCriteria])

  useEffect(() => {
    if (page === 1) {
      fetchVolunteers()
    }
  }, [page, fetchVolunteers])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setSearchCriteria(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto p-4 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input
          type="text"
          name="name"
          placeholder="Search by name"
          value={searchCriteria.name}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="email"
          placeholder="Search by email"
          value={searchCriteria.email}
          onChange={handleInputChange}
        />
      </div>
      <InfiniteScroll
        dataLength={volunteers.length}
        next={fetchVolunteers}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p className="text-center mt-4">No more volunteers to load.</p>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {volunteers.map((volunteer) => (
            <Link href={`/volunteers/${volunteer._id}`} key={volunteer._id}>
              <Card className="overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer">
                <CardHeader className="p-0">
                  <Image
                    src={volunteer.img || '/placeholder.svg'}
                    alt={`${volunteer.name}'s profile picture`}
                    width={400}
                    height={200}
                    className="w-full h-80 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="mb-2">{volunteer.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-1">Email: {volunteer.email}</p>
                  <p className="text-sm text-muted-foreground">Joined: {new Date(volunteer.doj).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}