'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { roles } from '../../../data/role-action-permissions/role-action-permissions.js'

const AdminManagePage = () => {
    const displayText = (text: string) => {
        text.length > 30 ? `${text.substring(0, 30)}...` : text;
    }


    const params = useParams()
    const [isOpenSetUserActionModal, setIsOpenSetUserActionModal] = useState<boolean>(false)
    const [manageAction, setManageAction] = useState<string>('')
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const toggleDropdown = () => {
        setIsOpenFilter(!isOpenFilter);
    };

    const onOpenModalUserAction = () => setIsOpenSetUserActionModal(true);
    const onCloseModalUserAction = () => setIsOpenSetUserActionModal(false);

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
        <div className='min-h-screen w-full bg-gradient-to-bl from-lime-200 via-white to-orange-200 text-black'>
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingredients</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin (country)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dispensed</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand owner</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 ">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">Image</td>
                                <td className="px-6 py-4 whitespace-nowrap">1</td>
                                <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                                <td className="px-6 py-4 whitespace-nowrap">john@example.com</td>
                                <td className="max-sm:w-full flex items-center py-2 px-2 justify-center border border-transparent text-sm font-medium translate-y-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={onOpenModalUserAction}>
                                    <button className="">Set Action</button>
                                </td>
                                <Modal open={isOpenSetUserActionModal} onClose={onCloseModalUserAction} center>
                                    <div className="text-black p-3 flex flex-col gap-4">
                                        <h2 className='my-4 text-lg font-bold text-center'>Set User Actions</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {roles?.map((item, index) => (
                                                <div className="flex flex-col" key={index}>
                                                    {item.actions?.map((action, index) => (
                                                        <label htmlFor={`${action.id}`} key={index} className='flex items-center gap-1 ms-2  text-sm font-medium text-black'>
                                                            <input id={`${action.id}`} type="checkbox" value={action.id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <span>{action.action}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Modal>
                                <td className="px-6 py-4 whitespace-nowrap">Medicine Specialist</td>
                                <td className="px-6 py-4 whitespace-nowrap">$ 20/hour</td>
                                <td className="px-6 py-4 whitespace-nowrap">box</td>
                                <td className="px-6 py-4 whitespace-nowrap">1222</td>
                                <td className="px-6 py-4 whitespace-nowrap">Calci Carbonat, Natri bicarbonat, Natri alginate</td>
                                <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-overflow-ellipsis max-w-xs ">Điều trị các triệu chứng của trào ngược dạ dày - thực quản như ợ nóng, khó tiêu và ợ chua liên quan đến sự trào ngược như sau bữa ăn, hoặc trong khi mang thai, hoặc trên những bệnh nhân có các triệu chứng liên quan với viêm thực quản do trào ngược.</td>
                                <td className="px-6 py-4 whitespace-nowrap">England</td>
                                <td className="px-6 py-4 whitespace-nowrap">Blended Liquid</td>
                                <td className="px-6 py-4 whitespace-nowrap">England</td>
                                <td className="px-6 py-4 whitespace-nowrap">Reckitt Benckiser (England)</td>
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
