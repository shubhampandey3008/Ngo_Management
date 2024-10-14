'use client'

import React, { useState, useCallback, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, Camera, User } from "lucide-react"
import { format } from "date-fns"
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { redirect, useRouter } from 'next/navigation'

type ValidationErrors = {
  name?: string;
  phoneNo?: string;
  email?: string;
  doj?: string;
  profilePicture?: string;
}

export default function VolunteerProfileForm() {

  const router = useRouter()

  
  const [name, setName] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [email, setEmail] = useState('')
  const [doj, setDoj] = useState<Date | undefined>()
  const [image, setImage] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isImageSelected, setIsImageSelected] = useState(false)
  const [isCropped, setIsCropped] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImage(reader.result as string)
        setIsImageSelected(true)
        setIsDialogOpen(true)
        setIsCropped(false)
        setCompletedCrop(undefined)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1,
        width,
        height
      ),
      width,
      height
    )
    setCrop(crop)
  }, [])

  const handleCropComplete = (crop: Crop, pixelCrop: PixelCrop) => {
    setCompletedCrop(pixelCrop)
  }

  const getCroppedImg = useCallback(async () => {
    try {
      if (!completedCrop || !imgRef.current) {
        console.error('Crop not complete or image not loaded')
        return null
      }

      const image = imgRef.current
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        throw new Error('No 2d context')
      }

      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height

      canvas.width = completedCrop.width
      canvas.height = completedCrop.height

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      )

      const base64Image = canvas.toDataURL('image/png')
      return base64Image
    } catch (error) {
      console.error('Error in getCroppedImg:', error)
      return null
    }
  }, [completedCrop])

  const handleCropSave = async () => {
    try {
      const croppedImage = await getCroppedImg()
      if (croppedImage) {
        setImage(croppedImage)
        setIsCropped(true)
        setIsDialogOpen(false)
      } else {
        throw new Error('Failed to crop image')
      }
    } catch (error) {
      console.error('Error cropping image:', error)
      alert('Failed to crop image. Please try again.')
    }
  }

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {}
    if (!name.trim()) newErrors.name = 'Name is required'
    if (!phoneNo.trim()) newErrors.phoneNo = 'Phone number is required'
    else if (!/^\d{10}$/.test(phoneNo)) newErrors.phoneNo = 'Phone number must be 10 digits'
    if (!email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format'
    if (!doj) newErrors.doj = 'Date of joining is required'
    if (!image || !isCropped) newErrors.profilePicture = 'Please select and crop a profile picture'
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()
    setErrors(newErrors)
    setTouched({
      name: true,
      phoneNo: true,
      email: true,
      doj: true,
      profilePicture: true,
    })

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      try {
        if (!image || !isCropped) {
          throw new Error('Image not selected or not cropped')
        }

        const formattedDoj = doj ? format(doj, 'yyyy/MM/dd') : ''

        const volunteerData = {
          name : name,
          phoneNo : phoneNo,
          email : email,
          doj: formattedDoj,
          profilePicture: image
        }

        // Send data to the API route
        const apiResponse = await fetch('/api/volunteer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(volunteerData),
        })

        if (!apiResponse.ok) {
          throw new Error('Failed to submit form')
        }

        router.push(apiResponse.url)

        alert('Form submitted successfully!')
      } catch (error) {
        setIsSubmitting(false)
        console.error('Error submitting form:', error)
        alert('An error occurred while submitting the form. Please try again.')
      }
    }
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validateForm())
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 p-6 bg-white rounded-lg shadow border border-black rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                <img src={image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <div className="mt-4">
              {image && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => handleCropComplete(c, c)}
                  aspect={1}
                  circularCrop
                >
                  <img
                    ref={imgRef}
                    src={image}
                    alt="Upload"
                    onLoad={onImageLoad}
                    className="max-w-full h-auto"
                  />
                </ReactCrop>
              )}
            </div>
            {isImageSelected && (
              <div className="mt-4 flex justify-end space-x-2">
                <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCropSave}>Save</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="hidden"
          aria-label="Upload profile picture"
        />
      </div>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleBlur('name')}
          className={touched.name && errors.name ? 'border-red-500' : ''}
          aria-invalid={touched.name && errors.name ? 'true' : 'false'}
          aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
        />
        {touched.name && errors.name && (
          <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>
      <div>
        <Label htmlFor="phoneNo">Phone Number</Label>
        <Input
          id="phoneNo"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          onBlur={() => handleBlur('phoneNo')}
          className={touched.phoneNo && errors.phoneNo ? 'border-red-500' : ''}
          aria-invalid={touched.phoneNo && errors.phoneNo ? 'true' : 'false'}
          aria-describedby={touched.phoneNo && errors.phoneNo ? 'phone-error' : undefined}
        />
        {touched.phoneNo && errors.phoneNo && (
          <p id="phone-error" className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email')}
          className={touched.email && errors.email ? 'border-red-500' : ''}
          aria-invalid={touched.email && errors.email ? 'true' : 'false'}
          aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
        />
        {touched.email && errors.email && (
          <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <Label>Date of Joining</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${
                !doj ? "text-muted-foreground" : ""
              } ${touched.doj && errors.doj ? 'border-red-500' : ''}`}
              onBlur={() => handleBlur('doj')}
              aria-invalid={touched.doj && errors.doj ? 'true' : 'false'}
              aria-describedby={touched.doj && errors.doj ? 'doj-error' : undefined}
            >
              {doj ? format(doj, "yyyy/MM/dd") : "Pick a date"}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={doj}
              onSelect={(date) => { 
                setDoj(date); 
                handleBlur('doj');
              }}
              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {touched.doj && errors.doj && (
          <p id="doj-error" className="text-red-500 text-sm mt-1">{errors.doj}</p>
        )}
      </div>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-primary'}`}
      >
        {isSubmitting ? 'Adding...' : 'Add Volunteer'}
      </Button>
    </form>
  )
}