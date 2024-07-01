import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className='bg-black'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
                <div className='flex item-center'>
                    <div className='flex-shrink-0'>
                        <a href='/' className='text-white'>
                            Logo
                        </a>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <div className='ml-4 flex items-center space-x-4'>
                        <a href='/' className='text-white hover:bg-white hover:text-black rounded-lg p-2'>
                            About us
                        </a>
                    
                    
                        <a href='/' className='text-white hover:bg-white hover:text-black rounded-lg p-2'>
                            Our work
                        </a>
                    
                    
                        <a href='/' className='text-white hover:bg-white hover:text-black rounded-lg p-2'>
                            Campaign
                        </a>
                    
                    
                        <a href='/' className='text-white hover:bg-white hover:text-black rounded-lg p-2'>
                            Get involved
                        </a>
                    
                    
                        <a href='/' className='text-white hover:bg-white hover:text-black rounded-lg p-2'>
                            Media Centre
                        </a>
                    
                    
                        <a href='/' className='text-white hover:bg-white hover:text-black rounded-lg p-2'>
                            Resource Center
                        </a>
                    
                    
                        <a href='/' className='text-white hover:bg-white hover:text-black rounded-lg p-2'>
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar
