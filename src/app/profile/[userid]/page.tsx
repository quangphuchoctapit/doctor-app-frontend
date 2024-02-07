import React from 'react'
import { CiCamera } from "react-icons/ci";

const Profile = () => {
    return (
        <div className='min-h-screen bg-gradient-to-tr from-red-200 via-white to-green-200 w-full'>
            <div className="flex flex-col gap-5 items-center container mx-auto">
                <div className="w-full bg-green-600 flex flex-col items-center text-white border max-sm:rounded-t-none sm:my-5 rounded-xl shadow-lg p-3">
                    <h3 className='text-lg font-semibold'>Set up your profile</h3>
                    <p className=''>Update your profile to connect your doctor with better impression.</p>
                    <div className="w-full flex items-center justify-center my-5">
                        <div className="overflow-hidden w-24 h-24 rounded-full relative">
                            <img src="/doctor/livestreaming/doctor7.jpg" alt="" className='w-full h-full object-cover' />
                            <div className="absolute flex items-center justify-center shadow-lg bottom-1 right-1 w-8 h-8 rounded-full border bg-white text-black z-20">
                                <CiCamera />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-3 bg-gray-100 text-black border max-sm:rounded-t-none sm:my-5 rounded-xl shadow-lg p-3">
                    <h3 className='text-lg font-semibold'>Personal Information</h3>
                    <div className="bg-white border px-3 rounded-lg py-1 flex flex-col gap-1">
                        <p className='font-semibold text-green-700'>Name</p>
                        <input type="text" className='px-3 py-1 outline-none ' placeholder='Tommy Le' />
                    </div>
                    <div className="bg-white border px-3 rounded-lg py-1 flex flex-col gap-1">
                        <p className='font-semibold text-green-700'>Contact Number</p>
                        <input type="text" className='px-3 py-1 outline-none ' placeholder='+84 2121 2121' />
                    </div>
                    <div className="bg-white border px-3 rounded-lg py-1 flex flex-col gap-1">
                        <p className='font-semibold text-green-700'>Date of Birth</p>
                        <input type="text" className='px-3 py-1 outline-none ' placeholder='DD MM YYYY' />
                    </div>
                    <div className="bg-white border px-3 rounded-lg py-1 flex flex-col gap-1">
                        <p className='font-semibold text-green-700'>Location</p>
                        <input type="text" className='px-3 py-1 outline-none ' placeholder='Add Details' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
