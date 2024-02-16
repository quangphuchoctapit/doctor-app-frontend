'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const DoctorsPage = () => {
    const [allDoctors, setAllDoctors] = useState([])
    useEffect(() => {
        // fetch all doctors
        const fetchDoctors = async () => {
            const doctors = await fetch(`/api/doctor`)
            const dataServer = await doctors.json()
            setAllDoctors(dataServer)
        }
        fetchDoctors()
    }, [])
    console.log(allDoctors);

    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-lime-200 via-white to-cyan-200'>
            <div className="container mx-auto flex flex-col items-center text-black">
                <div className="my-5 bg-white shadow-lg border rounded-md w-full p-3 ">
                    <h2 className='text-lg font-bold my-5'>Find Doctors</h2>
                    <input type="text" className='w-full px-3 py-2 border border-gray-800 bg-white outline-none rounded-md' placeholder='Search doctor' />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                    {allDoctors?.map((item: any, index) => (
                        <div key={item._id} className="my-5 bg-white shadow-lg border rounded-md w-full p-3 flex flex-col gap-3">
                            <div className="flex grow gap-3">
                                <div className="sm:w-16 sm:h-16 min-w-10 max-h-14">
                                    <img src={item.image} alt="" className='w-full h-full object-cover' />
                                </div>
                                <div className="flex flex-col grow gap-1">
                                    <h3 className='font-bold'>Dr.{item?.username}</h3>
                                    <p className='text-green-700 text-sm'>{item?.doctorInfo?.specialty.name}</p>
                                    <p className=' text-sm'>7 years experience</p>
                                    <div className="flex items-center gap-3 text-sm max-sm:text-xs">
                                        <div className="flex items-center gap-1">
                                            <div className="rounded-full w-3 h-3 bg-green-500"></div>
                                            <span>87%</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="rounded-full w-3 h-3 bg-green-500"></div>
                                            <span>69 Patients stories</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <FaHeart className='text-red-500' />
                                </div>
                            </div>
                            <div className="flex items-center gap-3 justify-between">
                                <div className="flex flex-col gap-1 grow max-sm:text-xs">
                                    <h5 className='text-green-500'>Next Available</h5>
                                    <p><span className='font-semibold'>10:00</span> AM tomorrow</p>
                                </div>
                                <div className="w-full">
                                    <Link href='/doctor/3' className='bg-green-600 text-white rounded-lg px-3 py-2'>Book Now</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DoctorsPage



