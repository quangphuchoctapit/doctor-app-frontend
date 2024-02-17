'use client'
import { editImage } from '@/app/redux/features/user/userSlice';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { CiCamera } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';


const Profile = () => {
    const dispatch = useDispatch()

    const params = useParams()
    const userRedux = useSelector((state) => state.user.value)
    const defaultUserProfile = {
        username: '',
        email: '',
        phone: '',
        location: '',
        gender: '',
        image: '',
        role: '',
        id: ''
    }
    const [userProfile, setUserProfile] = useState(defaultUserProfile)
    const [selectedFileImage, setSelectedFileImage] = useState(null);
    const [base64String, setBase64String] = useState('');
    const handleFileChange = async (event) => {
        const file = event.target.files?.[0]; // Get the first selected file
        setSelectedFileImage(file); // Store the file object in state
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64 = reader.result;
                setBase64String(base64); // Store the base64 string in state

                // Send file data to server
                const response = await fetch('/api/user/image/new-or-update', {
                    method: 'POST',
                    body: JSON.stringify({ image: base64, userId: params.userid }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const dataServer = await response.json();
                dispatch(editImage({ id: userProfile.id, image: base64 }))
            };
            reader.readAsDataURL(file); // Convert the file to base64
        }
    };


    useEffect(() => {
        setUserProfile({
            ...defaultUserProfile,
            username: userRedux.username, email: userRedux.email,
            gender: userRedux.gender, image: userRedux.image,
            role: userRedux.role, id: userRedux.id
        })
    }, [userRedux])
    return (
        <div className='min-h-screen bg-gradient-to-tr from-red-200 via-white to-green-200 w-full'>
            <div className="flex flex-col gap-5 items-center container mx-auto">
                <div className="w-full bg-green-600 flex flex-col items-center text-white border max-sm:rounded-t-none sm:my-5 rounded-xl shadow-lg p-3">
                    <h3 className='text-lg font-semibold'>Set up your profile</h3>
                    <p className=''>Update your profile to connect your doctor with better impression.</p>
                    <div className="w-full flex items-center justify-center my-5">
                        <div className="overflow-hidden w-24 h-24 rounded-full relative">
                            <img src={userProfile.image} alt="" className='w-full h-full object-cover' />
                            <div className="absolute flex items-center justify-center shadow-lg bottom-1 right-1 w-8 h-8 rounded-full border bg-white text-black z-20">
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="doctorImage" className="text-gray-600">
                                        <CiCamera />
                                    </label>
                                    <div className="relative">
                                        <input type="file" id="doctorImage" accept="image/*" className='hidden' onChange={handleFileChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-3 bg-gray-100 text-black border max-sm:rounded-t-none sm:my-5 rounded-xl shadow-lg p-3">
                    <h3 className='text-lg font-semibold'>Personal Information</h3>
                    <div className="bg-white border px-3 rounded-lg py-1 flex flex-col gap-1">
                        <p className='font-semibold text-green-700'>Name</p>
                        <input type="text" className='px-3 py-1 outline-none ' placeholder='Tommy Le' value={userRedux.username} onChange={() => { }} />
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
