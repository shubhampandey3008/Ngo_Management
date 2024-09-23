'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function StudentAttendanceForm({
  studentNames,
  teacherNames
}: {
  studentNames: { _id: string; name: string }[];
  teacherNames: { _id: string; name: string }[];
}) {
  const [teacher, setTeacher] = React.useState('')
  const [teacherId, setTeacherId] = React.useState('')
  const [openTeacher, setOpenTeacher] = React.useState(false)
  const [date, setDate] = React.useState<Date>()
  const [topic, setTopic] = React.useState('')
  const [selectedStudent, setSelectedStudent] = React.useState('')
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([])
  const [selectedStudentIds, setSelectedStudentIds] = React.useState<string[]>([])
  const [openStudent, setOpenStudent] = React.useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false)

  const resetForm = () => {
    setTeacher('')
    setTeacherId('')
    setDate(undefined)
    setTopic('')
    setSelectedStudent('')
    setSelectedStudents([])
    setSelectedStudentIds([])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      teacherId,
      date: date ? format(date, 'yyyy/MM/dd') : '',
      topic,
      studentIds: selectedStudentIds,
    })

    const data = {
      studentIds : selectedStudentIds,
      studyData : {
          date : date,
          attendance : "Present",
          teacher : teacher,
          topic : topic
        }
    }

    try {
      const saveStudentClassInfoResponse = await fetch('api/saveStudentStudy' , {
        method : 'POST',
        headers : {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(data)
      })

      if (saveStudentClassInfoResponse.ok) {
        setShowSuccessMessage(true)
        resetForm()
        setTimeout(() => setShowSuccessMessage(false), 5000) // Hide message after 5 seconds
      } else {
        throw new Error('Failed to save data')
      }
    } catch (error) {
      console.error('Error saving data:', error)
      // You might want to show an error message to the user here
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Student Attendance Form</h2>

      {/* Teacher Selection */}
      <div className="space-y-2">
        <Label htmlFor="teacher">Teacher</Label>
        <Popover open={openTeacher} onOpenChange={setOpenTeacher}>
          <PopoverTrigger asChild>
            <Button
              id="teacher"
              variant="outline"
              role="combobox"
              aria-expanded={openTeacher}
              className="w-full justify-between"
            >
              {teacher
                ? teacherNames.find((t) => t.name === teacher)?.name
                : "Select Teacher..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Teacher..." />
              <CommandList>
                <CommandEmpty>No Teacher found.</CommandEmpty>
                <CommandGroup>
                  {teacherNames.map((t) => (
                    <CommandItem
                      key={t._id}
                      value={t.name}
                      onSelect={(currentValue) => {
                        setTeacher(currentValue === teacher ? "" : currentValue)
                        setTeacherId(t._id)
                        setOpenTeacher(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          teacher === t.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {t.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Date Selection */}
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "yyyy/MM/dd") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Topic */}
      <div className="space-y-2">
        <Label htmlFor="topic">Topic</Label>
        <Textarea
          id="topic"
          placeholder="Enter the topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      {/* Student Selection */}
      <div className="space-y-2">
        <Label htmlFor="students">Students</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedStudents.map((student) => (
            <Badge key={student} variant="secondary">
              {studentNames.find((s) => s.name === student)?.name}
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-4 w-4 p-0"
                onClick={() => {
                  setSelectedStudents(selectedStudents.filter(s => s !== student))
                  setSelectedStudentIds(selectedStudentIds.filter(id => id !== studentNames.find(s => s.name === student)?._id))
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        <Popover open={openStudent} onOpenChange={setOpenStudent}>
          <PopoverTrigger asChild>
            <Button
              id="students"
              variant="outline"
              role="combobox"
              aria-expanded={openStudent}
              className="w-full justify-between"
            >
              {selectedStudent
                ? studentNames.find((s) => s.name === selectedStudent)?.name
                : "Select Students"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search students..." />
              <CommandEmpty>No student found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {studentNames.map((s) => (
                    <CommandItem
                      key={s._id}
                      value={s.name}
                      onSelect={(currentStudent) => {
                        setSelectedStudents(
                          selectedStudents.includes(currentStudent)
                            ? selectedStudents.filter((item) => item !== currentStudent)
                            : [...selectedStudents, currentStudent]
                        )
                        setSelectedStudentIds(
                          selectedStudentIds.includes(s._id)
                            ? selectedStudentIds.filter((id) => id !== s._id)
                            : [...selectedStudentIds, s._id]
                        )
                        setSelectedStudent(currentStudent === selectedStudent ? "" : currentStudent)
                        setOpenStudent(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedStudents.includes(s.name) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {s.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Button className="w-full" type="submit">Submit</Button>

      {showSuccessMessage && (
        <Alert className="mt-4 bg-green-100 border-green-400 text-green-700">
          <AlertDescription>
            Details submitted successfully!
          </AlertDescription>
        </Alert>
      )}
    </form>
  )
}