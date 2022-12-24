import React from 'react'
import Navbar from '../../Components/UserComponents/Navbar/Navbar'
import UploadPDF from '../../Components/UserComponents/Upload/UploadPDF'
import UserHome from '../../Components/UserComponents/UserHome/UserHome'

function Home() {
  return (
    <div className='bg-gray-100'>
        <Navbar />
        <UploadPDF />
        <UserHome />
    </div>
  )
}

export default Home