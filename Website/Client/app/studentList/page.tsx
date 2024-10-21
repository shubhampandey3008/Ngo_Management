'use client'

import { useState, useEffect, useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import type { Student } from '../students/student_info'

interface SearchCriteria {
  name: string
}

const STUDENTS_PER_PAGE = 5

export default function VolunteerList() {
  const [students, setStudents] = useState<Student[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    name: ''
  })

  const fetchStudents = useCallback(async () => {
    console.log("fetching Students") 
    console.log("nameFilter" , searchCriteria.name) 
    console.log("page" , page)
    try {
      const response = await fetch("/api/studentList", {
        cache : 'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameFilter: searchCriteria.name,
          limit: STUDENTS_PER_PAGE,
          page: page
        })
      })
      
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const data = await response.json()

      if (data.students.length === 0) {
        console.log("didn't get anything")
        setHasMore(false)
      } else {
        setStudents(prev => page === 1 ? data.students : [...prev, ...data.students])
        setPage(prev => prev + 1)
        setHasMore(data.hasMore)
      }
    } catch (error) {
      console.error("Error fetching students:", error)
    }
  }, [page, searchCriteria])

  useEffect(() => {
    setStudents([])
    setPage(1)
    setHasMore(true)
  }, [searchCriteria])

  useEffect(() => {
    if (page === 1) {
      fetchStudents()
    }
  }, [page, fetchStudents])

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
      </div>
      <InfiniteScroll
        dataLength={students.length}
        next={fetchStudents}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p className="text-center mt-4">No more students to load.</p>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => (
            <Link href={`/students/${student._id}`} key={student._id}>
              <Card className="overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer">
                <CardHeader className="p-0">
                  <Image
                    src={student.img || '/placeholder.svg'}
                    alt={`${student.name}'s profile picture`}
                    width={400}
                    height={200}
                    className="w-full h-80 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="mb-2">{student.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-1">Class: {student.class}</p>
                  <p className="text-sm text-muted-foreground">Joined: {new Date(student.doj).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}