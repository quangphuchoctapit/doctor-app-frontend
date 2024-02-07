import Link from 'next/link';
import React from 'react'
import { FaHeart } from "react-icons/fa";


const Appointment = () => {
    return (
        <div className='bg-gradient-to-br from-blue-200 via-white to-green-200 w-full'>
            <div className="flex flex-col gap-5 mx-auto container py-5">
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
                                <div className="max-sm:text-xs flex items-center gap-1"><span className='text-green-500'>${' '}</span>2212/hour</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appointment for & Who is this patient*/}
                <div className="w-full flex flex-col gap-3 text-black">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="">
                            <h2 className='text-xl font-bold'>Appointment For</h2>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="patient-name">Patient Name</label>
                                    <input type="text" placeholder='Patient Name' className='px-3 rounded-md outline-none bg-transparent border border-gray-500 py-2' />
                                    <label htmlFor="Contact Number">Contact Number</label>
                                    <input type="text" placeholder='Contact Number' className='px-3 rounded-md outline-none bg-transparent border border-gray-500 py-2' />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <h2 className='text-xl font-bold'>Who is this patient?</h2>
                            <div className="w-full mt-3 flex items-center justify-center">
                                <div className="bg-white p-3 h-full rounded-md w-full shadow-lg border overflow-x-auto">
                                    <div className="flex gap-3 items-center">
                                        <div className="bg-green-200 rounded-lg text-green-700 h-36 min-w-32 flex items-center justify-center">+ Add</div>
                                        <div className="shadow-lg border rounded-lg h-36 min-w-32 flex items-center justify-center">Myself</div>
                                        <div className="shadow-lg border rounded-lg h-36 min-w-32 flex items-center justify-center">My child</div>
                                        <div className="shadow-lg border rounded-lg h-36 min-w-32 flex items-center justify-center">My dog</div>
                                        <div className="shadow-lg border rounded-lg h-36 min-w-32 flex items-center justify-center">My slave</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <Link href='/appointment/confirm-appointment/3' className='py-2 w-full bg-green-600 rounded-md text-white text-center text-lg '>Next</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appointment