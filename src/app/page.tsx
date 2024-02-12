'use client'
import Link from 'next/link'
import React from 'react'
import NavBar from './components/NavBar'
import type { RootState } from '../app/redux/Store'
import CategoriesCollection from './components/CategoriesCollection'
import Footer from './components/Footer'
import { FaRegBell } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const userRedux = useSelector((state: RootState) => state.user.value)

  return (
    <div className='w-full bg-white text-black'>

      {/* home */}
      <div className="w-full px-3 container mx-auto border-blue-200 border min-h-screen">
        <div className="flex flex-col gap-5">

          {/* top home */}
          <div className="flex justify-between mt-5">
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="p-2 rounded ">87B Nguyen Cong Tru, Bao Loc</div>
            </div>
            <div className=" w-12 h-12 flex items-center rounded border justify-center "><FaRegBell /></div>
          </div>

          {/* live doctors */}
          <div className="my-5">
            <CategoriesCollection topic='Live Doctors' data={{ id: 1, image: `/doctor/livestreaming/doctor7.jpg`, isLive: true }} />
            <br />
            <CategoriesCollection topic='Specialties' />
            <br />
            <CategoriesCollection topic='Popular Doctors' data={{ id: 1, image: `/doctor/livestreaming/doctor7.jpg`, isLive: false }} />
            <br />
            <CategoriesCollection topic='Featured Doctors' data={{ id: 1, image: `/doctor/livestreaming/doctor7.jpg`, isLive: false }} />
            <br />

            {/* medicine order */}
            <CategoriesCollection topic='Medicine Order' data={{ id: 1, image: `/medicine/eye-medicine.jpg`, isLive: false }} />

          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
