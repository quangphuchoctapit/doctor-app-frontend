'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { roles } from '../../../data/role-action-permissions/role-action-permissions.js'
import { displayTableHeader, DisplayTableContent, DisplayModalAddNew } from './structureData.jsx'
import { useSelector } from 'react-redux';
import type { RootState } from '../../..//app/redux/Store'
import { FaPlusCircle } from "react-icons/fa";


const AdminManagePage = () => {
    const userRedux = useSelector((state: RootState) => state.user.value)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState({
        role: ''
    })
    useEffect(() => {
        setCurrentLoggedInUser(userRedux)
    }, [userRedux])


    const params = useParams()
    const [isOpenSetUserActionModal, setIsOpenSetUserActionModal] = useState<boolean>(false)
    const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)

    const [manageAction, setManageAction] = useState<string>('')
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const toggleDropdown = () => {
        setIsOpenFilter(!isOpenFilter);
    };

    const onOpenModalUserAction = () => setIsOpenSetUserActionModal(true);
    const onCloseModalUserAction = () => setIsOpenSetUserActionModal(false);

    const onOpenCreateModal = () => setIsOpenCreateModal(true);
    const onCloseCreateModal = () => setIsOpenCreateModal(false);

    useEffect(() => {
        switch (params.manage) {
            case 'users':
                // DisplayTableContent('users')
                return setManageAction('Users')
            case 'clinics':
                return setManageAction('Clinics')
            case 'doctors':
                return setManageAction('Doctors')
            case 'medicines':
                return setManageAction('Medicines')
            case 'specialties':
                return setManageAction('Specialties')
            default:
                return
        }
    }, [params])

    useEffect(() => {
        // fetch all users
        const fetchUsers = async () => {
            const users = await fetch(`/api/user`)
            const dataServer = await users.json()
            setDataTable(prevState => ({
                ...prevState,
                users: dataServer
            }));
        }

        // fetch all specialties
        const fetchSpecialties = async () => {
            const specialties = await fetch(`/api/specialty`)
            const dataServer = await specialties.json()
            setDataTable(prevState => ({
                ...prevState,
                specialties: dataServer
            }));
        }
        // fetch all clinics
        const fetchClinics = async () => {
            const clinics = await fetch(`/api/clinic`)
            const dataServer = await clinics.json()
            setDataTable(prevState => ({
                ...prevState,
                clinics: dataServer
            }));
        }
        // fetch all clinics
        const fetchMedicines = async () => {
            const medicines = await fetch(`/api/medicine`)
            const dataServer = await medicines.json()
            setDataTable(prevState => ({
                ...prevState,
                medicines: dataServer
            }));
        }
        // fetch all doctors
        const fetchDoctors = async () => {
            const doctors = await fetch(`/api/doctor`)
            const dataServer = await doctors.json()
            setDataTable(prevState => ({
                ...prevState,
                doctors: dataServer
            }));
        }
        fetchUsers()
        fetchSpecialties()
        fetchClinics()
        fetchMedicines()
        fetchDoctors()
    }, [])

    const [dataTable, setDataTable] = useState({
        users: [],
        medicines: [],
        clinics: [],
        specialties: [],
        doctors: []
    })




    return (
        <div className='min-h-screen w-full bg-gradient-to-bl from-lime-200 via-white to-orange-200 text-black'>
            <div className="flex flex-col gap-5 text-black mx-5">
                <h1 className=' text-xl font-bold text-center my-5'>Manage {manageAction}</h1>

                {/* filter & search users */}
                <div className="w-full p-3 shadow-lg border rounded-md bg-white">
                    <div className="grid sm:grid-cols-2 gap-5 ">
                        <input type="text" placeholder='Search...' className='w-full py-2 px-3 border col-span-1 rounded bg-white text-black ' />
                        <div className="relative col-span-1 flex gap-2 justify-end">

                            {/* add clinics/specialties/doctors,... */}
                            {
                                params.manage === 'users' || params.manage === 'doctors' ? null :
                                    <button onClick={onOpenCreateModal} className='max-sm:w-full inline-flex items-center justify-center px-4 py-2 border gap-1 border-transparent text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-800'><FaPlusCircle /><span>Add {params.manage}</span></button>
                            }

                            {/* Dropdown Toggle */}
                            <button
                                onClick={toggleDropdown}
                                className="max-sm:w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Filter
                            </button>
                            {/* Dropdown Items */}
                            {isOpenFilter && (
                                <div className="origin-top-right z-10 absolute right-0 -mr-3 mt-16 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
                            {displayTableHeader(params.manage, (currentLoggedInUser.role === 'SA' ? true : false))
                            }
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 ">
                            {/* <tr>
                                <td className="px-6 py-4 whitespace-nowrap">Image</td>
                                <td className="px-6 py-4 whitespace-nowrap">1</td>
                                <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                                <td className="px-6 py-4 whitespace-nowrap">john@example.com</td>
                                <td className="px-6 py-4 whitespace-nowrap">Doctor</td>
                                <td className="max-sm:w-full flex items-center py-2 px-2 justify-center border border-transparent text-sm font-medium translate-y-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={onOpenModalUserAction}>
                                    <button className="">Set Action</button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">Medicine Specialist</td>
                                <td className="px-6 py-4 whitespace-nowrap">$ 20/hour</td>
                                <td className="px-6 py-4 whitespace-nowrap">box</td>
                                <td className="px-6 py-4 whitespace-nowrap">988</td>
                                <td className="px-6 py-4 whitespace-nowrap">1222</td>
                                <td className="px-6 py-4 whitespace-nowrap">Calci Carbonat, Natri bicarbonat, Natri alginate</td>
                                <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-overflow-ellipsis max-w-xs ">Điều trị các triệu chứng của trào ngược dạ dày - thực quản như ợ nóng, khó tiêu và ợ chua liên quan đến sự trào ngược như sau bữa ăn, hoặc trong khi mang thai, hoặc trên những bệnh nhân có các triệu chứng liên quan với viêm thực quản do trào ngược.</td>
                                <td className="px-6 py-4 whitespace-nowrap">England</td>
                                <td className="px-6 py-4 whitespace-nowrap">Blended Liquid</td>
                                <td className="px-6 py-4 whitespace-nowrap">England</td>
                                <td className="px-6 py-4 whitespace-nowrap">Reckitt Benckiser (England)</td>
                                <td className="px-6 py-4 whitespace-nowrap">description</td>
                                <td className="px-6 py-4 whitespace-nowrap">221 Phan Huy Ich</td>
                            </tr> */}

                            <DisplayTableContent value={params.manage} onOpenModalUserAction={onOpenModalUserAction} dataTable={dataTable} isAdmin={currentLoggedInUser.role === 'SA' ? true : false} />

                        </tbody>
                    </table>

                    {/* modal set user action*/}
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


                    {/* modal add clinics/specialties, doctors,... */}
                    <Modal open={isOpenCreateModal} onClose={onCloseCreateModal} center>
                        <div className="text-black p-3 flex flex-col gap-4">
                            <h2 className='my-4 text-lg font-bold text-center'>Add {params.manage}</h2>
                            {/* {DisplayModalAddNew(params.manage, (currentLoggedInUser.role === 'SA' ? true : false), dataInputModalCreate, setDataInputModalCreate)} */}
                            <DisplayModalAddNew value={params.manage} isAdmin={currentLoggedInUser.role === 'SA' ? true : false} />
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default AdminManagePage
