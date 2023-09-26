import React from 'react'
import ConstructionPage from '../components/ConstructionPage/page'
import NavbarLoggedIn from '../components/Navbar-LoggedIn/page'

const Profile = () => {
  return (
    <div className="bg-[url('/images/profilebg-image.jpg')] bg-cover bg-no-repeat bg-center w-screen h-screen">
      <NavbarLoggedIn />
      
    </div>
  )
}

export default Profile