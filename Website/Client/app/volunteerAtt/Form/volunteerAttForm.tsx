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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useRouter } from 'next/navigation'

export default function VolunteerAttendanceForm({
  studentNames,
  volunteerNames
}: {
  studentNames: { _id: string; name: string }[];
  volunteerNames: { _id: string; name: string }[];
}) {
  const router = useRouter();
  const [volunteer, setVolunteer] = React.useState('')
  const [volunteerId, setVolunteerId] = React.useState('')
  const [openVol, setVolunteerOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date>()
  const [attendance, setAttendance] = React.useState('')
  const [selectedStudent, setSelectedStudent] = React.useState('')
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([])
  const [selectedStudentIds, setSelectedStudentIds] = React.useState<string[]>([])
  const [openStudent, setStudentOpen] = React.useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false)

  const resetForm = () => {
    setVolunteer('')
    setVolunteerId('')
    setDate(undefined)
    setAttendance('')
    setSelectedStudent('')
    setSelectedStudents([])
    setSelectedStudentIds([])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      date: date ? format(date, 'yyyy/MM/dd') : '',
      attendance : attendance,
      students: selectedStudentIds,
    }

    try {
      const response = await fetch('/api/saveVolunteerAttendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          volunteerId : volunteerId,
          data : data
        })
      })

      if (response.ok) {
        setShowSuccessMessage(true)
        resetForm()
        setTimeout(() => setShowSuccessMessage(false), 5000) // Hide message after 5 seconds
      } else {
        throw new Error('Failed to save data')
      }

      router.push(response.url)

    } catch (error) {
      console.error('Error saving data:', error)
      // You might want to show an error message to the user here
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Volunteer Attendance Form</h2>

      {/* Volunteer Selection */}
      <Popover open={openVol} onOpenChange={setVolunteerOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openVol}
            className="w-full justify-between"
          >
            {volunteer
              ? volunteerNames.find((volValue) => volValue.name === volunteer)?.name
              : "Select Volunteer..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Volunteer..." />
            <CommandList>
              <CommandEmpty>No Volunteer found.</CommandEmpty>
              <CommandGroup>
                {volunteerNames.map((valValue) => (
                  <CommandItem
                    key={valValue._id}
                    value={valValue.name}
                    onSelect={(currentValue) => {
                      setVolunteer(currentValue === volunteer ? "" : currentValue)
                      setVolunteerId(valValue._id)
                      setVolunteerOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        volunteer === valValue.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {valValue.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Date Selection */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
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

      {/* Attendance Status */}
      <Select onValueChange={setAttendance}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select attendance status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="present">Present</SelectItem>
          <SelectItem value="absent">Absent</SelectItem>
        </SelectContent>
      </Select>

      {/* Student Selection */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
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
        <Popover open={openStudent} onOpenChange={setStudentOpen}>
          <PopoverTrigger asChild>
            <Button
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
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search students..." />
              <CommandEmpty>No student found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {studentNames.map((s) => (
                    <CommandItem
                      key={s._id}
                      value={s.name}
                      onSelect={(currentStudent: string) => {
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
                        setStudentOpen(false)
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
            Volunteer attendance submitted successfully!
          </AlertDescription>
        </Alert>
      )}
    </form>
  )
}