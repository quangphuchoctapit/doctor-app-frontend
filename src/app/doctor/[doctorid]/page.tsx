import React from 'react'
import { FaHeart } from "react-icons/fa";
const DoctorDetail = () => {
    return (
        <div className='bg-gradient-to-br from-blue-200 via-white to-green-200 w-full'>
            <div className="flex flex-col gap-5 mx-5 py-5">

                {/* intro */}
                <div className="shadow-lg border rounded-lg bg-white p-3 flex flex-col">
                    <div className="grid grid-cols-3 gap-3 text-black">
                        <div className="col-span-1">
                            <div className="bg-green border w-20 sm:h-32 h-20 sm:w-32 gap-3"></div>
                        </div>
                        <div className="col-span-2 flex gap-3 justify-between">
                            <div className="flex flex-col ">
                                <h3 className='sm:text-lg font-bold'>Dr Dog</h3>
                                <p className='text-gray-400 max-sm:text-xs'>Specialist Cardiologist</p>
                                <div className="max-sm:text-sm">1 2 3 4 5</div>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <div className="max-sm:text-sm text-red-400"><FaHeart /></div>
                                <div className="max-sm:text-sm"><span className='text-green-500'>${' '}</span>2212/hour</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center mt-3">
                        <button className='w-full rounded-sm py-2 bg-green-600 text-white text-lg'>Book now</button>
                    </div>
                </div>


                {/* achievements */}
                <div className="w-full flex justify-center">
                    <div className="bg-white rounded-lg shadow-lg border p-3 grid gap-3 grid-cols-3">
                        <div className="p-5 rounded-lg bg-gray-200 flex flex-col items-center text-black">
                            <h2 className='font-bold text-lg'>100</h2>
                            <p>Running</p>
                        </div>
                        <div className="p-5 rounded-lg bg-gray-200 flex flex-col items-center text-black">
                            <h2 className='font-bold text-lg'>500</h2>
                            <p>Ongoing</p>
                        </div>
                        <div className="p-5 rounded-lg bg-gray-200 flex flex-col items-center text-black">
                            <h2 className='font-bold text-lg'>700</h2>
                            <p>Patients</p>
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div className="w-full flex flex-col gap-3 text-black">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="">
                            <h2 className='text-xl font-bold'>Services</h2>
                            <div className="flex gap-1  relative py-2">
                                <div className="absolute w-full -bottom-1 h-0.5 bg-gray-200"></div>
                                <span className='text-green-500 font-semibold'>1.</span><p className='text-gray-400'>Patient care should be the number one priority.</p>
                            </div>
                            <div className="flex gap-1  relative py-2">
                                <div className="absolute w-full -bottom-1 h-0.5 bg-gray-200"></div>
                                <span className='text-green-500 font-semibold'>2.</span><p className='text-gray-400'>Free for teenage girls.</p>
                            </div>
                            <div className="flex gap-1  relative py-2">
                                <div className="absolute w-full -bottom-1 h-0.5 bg-gray-200"></div>
                                <span className='text-green-500 font-semibold'>3.</span><p className='text-gray-400'>Chance to win 50% discount if you love me.</p>
                            </div>
                        </div>
                        <div className="">
                            <h2 className='text-xl font-bold'>Location</h2>
                            <div className="w-full mt-3 flex items-center justify-center">
                                <div className="bg-white p-3 h-full rounded-md w-full shadow-lg border">
                                    <div className="bg-green-200 h-48 sm:h-36 w-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDetail
