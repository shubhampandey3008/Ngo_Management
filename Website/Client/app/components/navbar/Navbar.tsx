'use client'

import React, { useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useSession } from 'next-auth/react'
import handleSignOut from '@/app/actions/authActions'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Navbar() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [isClick, setIsClick] = useState(false)

  const toggleNavbar = () => {
    setIsClick(!isClick)
  }

  const logout = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Value of data before Sign Out ", session)
    const isSignedOut = await handleSignOut()
    await signOut()
    console.log("isSignedOut : ", isSignedOut)
    if (isSignedOut) {
      update({
        ...session,
        status: 'unauthenticated'
      })
    }
    console.log("Value of data after Sign Out ", status)
    router.push('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image src="/kritansh_plain.jpg" alt="Logo" width={90} height={50} />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/ourWork">Our work</NavLink>
              <NavLink href="/volunteerList">Our Team</NavLink>
              {session && (
                <>
                  <NavLink href="/addVolunteer">Add Volunteer</NavLink>
                  <NavLink href="/addStudent">Add Student</NavLink>
                  <NavLink href="/studentList">Students</NavLink>
                </>
              )}
              <AttendanceMenu session={session} />
              {status === 'authenticated' ? (
                <form onSubmit={logout}>
                  <button type="submit" className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-bold transition-colors duration-200">
                    Logout
                  </button>
                </form>
              ) : (
                <NavLink href="/api/auth/signin">Admin Login</NavLink>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleNavbar}
            >
              {isClick ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isClick && (
        <div className="md:hidden bg-black bg-opacity-90">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink href="/" mobile>About us</NavLink>
            <NavLink href="/" mobile>Our work</NavLink>
            <NavLink href="/volunteerList" mobile>Our Team</NavLink>
            {session && (
              <>
                <NavLink href="/addVolunteer" mobile>Add Volunteer</NavLink>
                <NavLink href="/addStudent" mobile>Add Student</NavLink>
                <NavLink href="/studentList" mobile>Students</NavLink>
              </>
            )}
            <AttendanceMenu session={session} mobile />
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children, mobile = false }: { href: string; children: React.ReactNode; mobile?: boolean }) {
  const baseClasses = "text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-bold transition-colors duration-200"
  const mobileClasses = mobile ? "block" : ""
  return (
    <a href={href} className={`${baseClasses} ${mobileClasses}`}>
      {children}
    </a>
  )
}

function AttendanceMenu({ session, mobile = false }: { session: any; mobile?: boolean }) {
  return (
    <Menu as="div" className={`relative inline-block text-left ${mobile ? 'w-full' : ''}`}>
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-transparent px-4 py-2 text-lg font-bold text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          Attendance
          <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-gray-300" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <MenuItem href="/studentAtt">Student</MenuItem>
            {session && <MenuItem href="/volunteerAtt">Volunteer</MenuItem>}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

function MenuItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href={href}
          className={`${
            active ? 'bg-gray-700 text-white' : 'text-gray-900'
          } group flex w-full items-center rounded-md px-2 py-2 text-lg font-bold`}
        >
          {children}
        </a>
      )}
    </Menu.Item>
  )
}