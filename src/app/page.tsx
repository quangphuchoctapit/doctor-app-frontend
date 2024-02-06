import Link from 'next/link'
import React from 'react'
import NavBar from './components/NavBar'
import CategoriesCollection from './components/CategoriesCollection'
import Footer from './components/Footer'
import { FaRegBell } from "react-icons/fa";

const Home = () => {
  return (
    <div className='w-full bg-white text-black'>

      {/* nav */}
      <NavBar />

      {/* home */}
      <div className="w-full px-3 container mx-auto border-blue-200 border min-h-screen">
        <div className="flex flex-col gap-5">

          {/* top home */}
          <div className="flex justify-between mt-5">
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="p-2 rounded ">139 Nguyen Cong Tru, Bao Loc</div>
            </div>
            <div className=" w-12 h-12 flex items-center rounded border justify-center "><FaRegBell /></div>
          </div>

          {/* live doctors */}
          <div className="my-5">
            <CategoriesCollection topic='Live Doctors' data={{ id: 1, image: `/doctor/livestreaming/doctor7.jpg`, isLive: true }} />
            <CategoriesCollection topic='Specialties' />
            <CategoriesCollection topic='Popular Doctors' data={{ id: 1, image: `/doctor/livestreaming/doctor7.jpg`, isLive: false }} />
            <CategoriesCollection topic='Featured Doctors' data={{ id: 1, image: `/doctor/livestreaming/doctor7.jpg`, isLive: false }} />

          </div>

        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  )
}

export default Home
