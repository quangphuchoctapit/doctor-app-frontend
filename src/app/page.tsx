'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import type { RootState } from '../app/redux/Store'
import CategoriesCollection from './components/CategoriesCollection'
import Footer from './components/Footer'
import { FaRegBell } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const userRedux = useSelector((state: RootState) => state.user.value)
  const [userReduxData, setUserReduxData] = useState<{
    email: string
    id: string
    role: string
    image: string
    username: string
    gender: string
    balance: number
}>()
  useEffect(()=> {
    setUserReduxData(userRedux)
  },[userRedux])

  
  const [dataHomePage, setDataHomePage] = useState({
    users: [],
    medicines: [],
    clinics: [],
    specialties: [],
    doctors: [],
    locations: []
  })

  // fetch all users
  const fetchUsers = async () => {
    const users = await fetch(`/api/user`)
    const dataServer = await users.json()
    setDataHomePage(prevState => ({
      ...prevState,
      users: dataServer
    }));
  }
  // fetch all specialties
  const fetchSpecialties = async () => {
    const specialties = await fetch(`/api/specialty`)
    const dataServer = await specialties.json()
    setDataHomePage(prevState => ({
      ...prevState,
      specialties: dataServer
    }));
  }
  // fetch all clinics
  const fetchClinics = async () => {
    const clinics = await fetch(`/api/clinic`)
    const dataServer = await clinics.json()
    setDataHomePage(prevState => ({
      ...prevState,
      clinics: dataServer
    }));
  }
  // fetch all medicines
  const fetchMedicines = async () => {
    const medicines = await fetch(`/api/medicine`)
    const dataServer = await medicines.json()
    setDataHomePage(prevState => ({
      ...prevState,
      medicines: dataServer
    }));
  }
  // fetch all doctors
  const fetchDoctors = async () => {
    const doctors = await fetch(`/api/doctor`)
    const dataServer = await doctors.json()
    setDataHomePage(prevState => ({
      ...prevState,
      doctors: dataServer
    }));
  }
  // fetch all locations
  const fetchLocations = async () => {
    const locations = await fetch(`/api/location`)
    const dataServer = await locations.json()

    setDataHomePage(prevState => ({
      ...prevState,
      locations: dataServer
    }));
  }

  // fetch users/doctors/specialties/doctors/clinics/locations/medicines
  useEffect(() => {

    fetchUsers()
    fetchSpecialties()
    fetchClinics()
    fetchMedicines()
    fetchDoctors()
    fetchLocations()
  }, [])

  // console.log(dataHomePage);


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
                      <div className="w-full flex items-center gap-2">
              <label htmlFor="">My Balance: </label>
              <span className='text-green-600 font-semibold text-lg'>{userReduxData?.balance}</span>
              <Link href={`/deposit/${userReduxData?.id}`} className='px-3 py-1 rounded-md bg-yellow-500 text-gray-700'>Deposit</Link>
            </div>

          {/* live doctors */}
          <div className="my-5">
            <CategoriesCollection topic='Live Doctors' fullData={dataHomePage.doctors} isLive={true} />
            <br />
            <CategoriesCollection topic='Specialties' fullData={dataHomePage.specialties} />
            <br />
            <CategoriesCollection topic='Popular Doctors' fullData={dataHomePage.doctors} />
            <br />
            <CategoriesCollection topic='Featured Doctors' fullData={dataHomePage.doctors} />
            <br />

            {/* medicine order */}
            <CategoriesCollection topic='Medicine Order' fullData={dataHomePage.medicines} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
