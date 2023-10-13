import React from 'react'
import NavbarLoggedIn from '@/components/Navbar-LoggedIn/page'


const Trips = () => {
  return (
    <div className='absolute bg-[url("/images/bg-5.jpg")] brightness-90 bg-center bg-cover bg-no-repeat h-screen w-screen'>
        <NavbarLoggedIn />
        <div className='relative'>
            <div className='flex items-center justify-center h-[80vh]'>
            <h1 className='text-black font-bold tracking-widest '>You Have No trips at the moment.</h1>
            </div>
        </div>
    </div>
  )
}

export default Trips