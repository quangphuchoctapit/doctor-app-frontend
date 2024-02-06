'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

const AdminManagePage = () => {
    const params = useParams()
    const [manageAction, setManageAction] = useState<string>('')
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const toggleDropdown = () => {
        setIsOpenFilter(!isOpenFilter);
    };

    useEffect(() => {
        if (params.manage === 'users') {
            setManageAction('Users')
        }
        else if (params.manage === 'clinics') {
            setManageAction('Clinics')
        }
        else if (params.manage === 'doctors') {
            setManageAction('Doctors')
        }
        else if (params.manage === 'medicines') {
            setManageAction('Medicines')
        }
        else if (params.manage === 'specialties') {
            setManageAction('Specialties')
        }
    }, [params])

    return (
        <div className='min-h-screen w-full bg-gradient-to-bl from-lime-200 via-white to-orange-200'>
            <div className="flex flex-col gap-5 text-black mx-5">
                <h1 className=' text-xl font-bold text-center my-5'>Manage {manageAction}</h1>

                {/* filter & search users */}
                <div className="w-full p-3 shadow-lg border rounded-md bg-white">
                    <div className="grid sm:grid-cols-2 gap-5 ">
                        <input type="text" placeholder='Search...' className='w-full py-2 px-3 border col-span-1 rounded bg-white text-black ' />
                        <div className="relative col-span-1 flex justify-end">
                            {/* Dropdown Toggle */}
                            <button
                                onClick={toggleDropdown}
                                className="max-sm:w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Filter
                            </button>
                            {/* Dropdown Items */}
                            {isOpenFilter && (
                                <div className="origin-top-right absolute right-0 -mr-3 mt-16 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Doctor</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Patient</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Admin</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Client</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* table user data */}
                <div className="w-full p-3 rounded-md overflow-x-auto bg-white shadow-lg border">
                    <table className="table-auto min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">Image</td>
                                <td className="px-6 py-4 whitespace-nowrap">1</td>
                                <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                                <td className="px-6 py-4 whitespace-nowrap">john@example.com</td>
                                <td className="px-6 py-4 whitespace-nowrap">Medicine Specialist</td>
                                <td className="px-6 py-4 whitespace-nowrap">$ 20/hour</td>
                                <td className="px-6 py-4 whitespace-nowrap">box</td>
                                <td className="px-6 py-4 whitespace-nowrap">1222</td>
                                <td className="px-6 py-4 whitespace-nowrap">description</td>
                                <td className="px-6 py-4 whitespace-nowrap">221 Phan Huy Ich</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminManagePage
