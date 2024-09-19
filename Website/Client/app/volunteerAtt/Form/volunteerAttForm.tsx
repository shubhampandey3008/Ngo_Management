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

const volunteers = [
  { value: 'alice', label: 'Alice Johnson' },
  { value: 'bob', label: 'Bob Smith' },
  { value: 'charlie', label: 'Charlie Brown' },
  { value: 'diana', label: 'Diana Ross' },
]

const students = [
  { value: 'emma', label: 'Emma Watson' },
  { value: 'frank', label: 'Frank Sinatra' },
  { value: 'grace', label: 'Grace Kelly' },
  { value: 'harry', label: 'Harry Potter' },
  { value: 'ian', label: 'Ian McKellen' },
  { value: 'julia', label: 'Julia Roberts' },
]

export default function VolunteerAttendanceForm() {
  const [volunteer, setVolunteer] = React.useState('')
  const [openVol, setVolunteerOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date>()
  const [attendance, setAttendance] = React.useState('')
  const [selectedStudent, setSelectedStudent] = React.useState('')
  const [selectedStudents , setSelectedStudents] = React.useState<string[]>([])
  const [openStudent , setStudentOpen] = React.useState(false)

  return (
    <div className="max-w-md mx-auto space-y-6 p-6 bg-white rounded-lg shadow">
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
            ? volunteers.find((volValue) => volValue.value === volunteer)?.label
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
              {volunteers.map((valValue) => (
                <CommandItem
                  key={valValue.value}
                  value={valValue.value}
                  onSelect={(currentValue) => {
                    setVolunteer(currentValue === volunteer ? "" : currentValue)
                    setVolunteerOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      volunteer === valValue.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {valValue.label}
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
              {students.find((s) => s.value === student)?.label}
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-4 w-4 p-0"
                onClick={() => setSelectedStudents(selectedStudents.filter(s => s !== student))}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        <Popover open = {openStudent} onOpenChange={setStudentOpen} >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openStudent}
              className="w-full justify-between"
            >
              {selectedStudent
              ? students.find((s) => s.value === selectedStudent)?.label
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
                {students.map((s) => (
                  <CommandItem
                    key={s.value}
                    value={s.value}
                    onSelect={(currentStudent : string) => {
                      setSelectedStudents(
                        selectedStudents.includes(currentStudent)
                          ? selectedStudents.filter((item) => item !== currentStudent)
                          : [...selectedStudents, currentStudent]
                      )
                      setSelectedStudent(currentStudent===selectedStudent ? "" : currentStudent)
                      setStudentOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedStudents.includes(s.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {s.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Button className="w-full" type="submit">Submit</Button>
    </div>
  )
}