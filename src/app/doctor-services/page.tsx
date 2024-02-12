'use client'
import Link from 'next/link';
import { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const DoctorServices = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate: any) => {
        setDate(newDate);
    };

    const [isopenDropdownMedicineFilter, setIsOpenDropdownMedicineFilter] = useState<boolean>(false)
    const toggleDropdownMedicineFilter = () => {
        setIsOpenDropdownMedicineFilter(!isopenDropdownMedicineFilter);
    };

    const [isOpenPatientModal, setIsOpenPatientModal] = useState<boolean>(false)
    const setOpenPatientModal = () => setIsOpenPatientModal(true);
    const onClosePatientModal = () => setIsOpenPatientModal(false);


    return (
        <div className='w-full min-h-screen bg-gradient-to-tr via-white from-blue-200 to-cyan-200'>
            <div className="flex flex-col items-center container mx-auto gap-5 text-black py-5">

                {/* intro section */}
                <div className="bg-white shadow-lg border p-3 rounded-md w-full">
                    {/* intro */}
                    <div className="grid grid-cols-6 gap-3 text-black">
                        <div className="col-span-1">
                            <div className=" border w-16 sm:h-24 md:w-32 h-16 sm:w-24 md:h-32 gap-3"></div>
                        </div>
                        <div className="col-span-5 px-4 flex gap-3 justify-between">
                            <div className="flex flex-col ">
                                <h3 className='sm:text-lg font-bold'>Dr Dog</h3>
                                <p className='text-gray-400 max-sm:text-xs'>Specialist Cardiologist</p>
                                <div className="max-sm:text-sm">1 2 3 4 5</div>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <div className="max-sm:text-xs text-red-400"><FaHeart /></div>
                                <div className="max-sm:text-xs flex items-center gap-1"><span className='text-green-500'>${' '}</span>2212/hour</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col mt-3 gap-5">
                        <div className="w-full flex flex-col gap-2 ">
                            <label className='text-lg font-semibold' htmlFor="description">Services</label>
                            <div className="flex items-center justify-between p-3 border">
                                <textarea name="" id="description" value='doctor services abcabcabcabc' onChange={() => { }}></textarea>
                                <div className="">Edit</div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2 ">
                            <label className='text-lg font-semibold' htmlFor="description">Description</label>
                            <div className="flex items-center justify-between p-3 border">
                                <textarea name="" id="description" value='doctor description abcabcabcabc' onChange={() => { }}></textarea>
                                <div className="">Edit</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* schedule & patients list section */}
                <div className="grid lg:grid-cols-2 gap-5 ">
                    <div className="bg-white shadow-lg border p-3 gap-3 rounded-md flex flex-col whitespace-nowrap overflow-x-auto">
                        <h3 className='text-lg font-semibold'>Schedule</h3>
                        <div className='my-3 flex justify-center'>
                            <Calendar onChange={onChange} value={date} />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg bg-green-700 border border-green-700 text-white px-3 py-1">7:00</div>
                            <div className="p-3 rounded-lg bg-green-700 border border-green-700 text-white px-3 py-1">7:00</div>
                            <div className="p-3 rounded-lg bg-green-700 border border-green-700 text-white px-3 py-1">7:00</div>
                            <div className="p-3 rounded-lg bg-white border border-gray-700 text-black px-3 py-1">7:00</div>
                            <div className="p-3 rounded-lg bg-white border border-gray-700 text-black px-3 py-1">7:00</div>
                            <div className="p-3 rounded-lg bg-white border border-gray-700 text-black px-3 py-1">7:00</div>
                            <div className="p-3 rounded-lg bg-white border border-gray-700 text-black px-3 py-1">7:00</div>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg border p-3 gap-3 rounded-md flex flex-col whitespace-nowrap overflow-x-auto">
                        <h3 className='text-lg font-semibold'>Patient's waiting list</h3>
                        <div className="flex flex-col gap-3">


                            {/* patient needs medicine */}
                            <div onClick={setOpenPatientModal} className="p-3 rounded-lg flex flex-col gap-3 text-black bg-white border-gray-700 line-clamp-1 border">
                                <div className="flex gap-3 items-center">
                                    <div className='basis-1/6'>
                                        <div className="w-24 h-24 border flex items-center justify-center">img patient</div>
                                    </div>
                                    <div className="basis-5/6 w-full flex flex-col gap-3">
                                        <div className="flex items-center gap-3 justify-between z-10">
                                            <p className="whitespace-pre-wrap pr-3">blabla</p>
                                            <div className="">blabla2</div>
                                        </div>
                                        <div className="">symptom symptom</div>
                                        <div className="flex items-center gap-2 justify-between">
                                            <button className='px-3 py-1 border rounded-md bg-gray-200'>View Detail</button>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="text-green-600 text-lg font-smibold">Appointment at <span className='font-bold'>14:00</span></div> */}
                            </div>

                            {/* patient needs appointment */}
                            <div onClick={setOpenPatientModal} className="p-3 rounded-lg flex flex-col gap-3 text-black bg-white shadow-md line-clamp-1 border border-green-500 shadow-green-800">
                                <div className="flex gap-3 items-center">
                                    <div className='basis-1/6'>
                                        <div className="w-24 h-24 border flex items-center justify-center">img patient</div>
                                    </div>
                                    <div className="basis-5/6 w-full flex flex-col gap-3">
                                        <div className="flex items-center gap-3 justify-between z-10">
                                            <p className="whitespace-pre-wrap pr-3">blabla</p>
                                            <div className="">blabla2</div>
                                        </div>
                                        <div className="">symptom symptom</div>
                                        <div className="flex items-center gap-2 justify-between">
                                            <button className='px-3 py-1 border rounded-md bg-gray-200'>View Detail</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-green-600 text-lg font-smibold">Appointment at <span className='font-bold'>14:00</span></div>
                            </div>

                            <Modal open={isOpenPatientModal} onClose={onClosePatientModal} center>
                                <div className="text-black p-3 flex flex-col gap-4 px-3 ">
                                    <h2 className='my-4 text-lg font-bold text-center'>Patient Details</h2>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <div className="text-lg font-semibold">Mr. Tommy</div>
                                            <button className='px-3 border-none bg-green-600 py-1  text-white rounded-lg'>Contact this patient</button>
                                        </div>
                                        <div className="text-gray-600"><span>21</span>yrs old - <span>Male</span> - <span>No formal illnesses</span></div>
                                        <div className="w-full flex justify-center">
                                        </div>
                                        <div className="w-full">
                                            <textarea onChange={() => { }} className='w-full lg:min-w-[700px] sm:min-w-[500px] bg-green-100 text-black border px-3 py-1' value={`My stomach hurts, I always have the feeling to vomit at any given time, I have frequent urge to burp, but that's too much.`}></textarea>
                                        </div>
                                        <div className="border p-3 bg-white rounded-lg flex flex-col gap-3 ">
                                            <input type="text" placeholder='Search Medicine...' className='outline-none border border-gray-700 px-3 py-1 rounded-lg' />
                                            <div className="flex flex-col gap-3">
                                                <div className="flex justify-between items-center ">
                                                    <h3 className='font-bold'>Filter</h3>
                                                    <div className="relative inline-block text-left">
                                                        <div>
                                                            <button onClick={toggleDropdownMedicineFilter} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="options-menu" aria-expanded="true" aria-haspopup="true">
                                                                Type
                                                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </div>

                                                        {/* <!-- Dropdown menu items --> */}
                                                        {isopenDropdownMedicineFilter &&
                                                            <div className="origin-top-right z-[90] absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                                <div className="py-1" role="none">
                                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Cardiovascular</a>
                                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Derman</a>
                                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Optical</a>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1 w-full">
                                                    <div className="p-3 rounded-lg flex items-center border shadow-md bg-white">
                                                        <div className='basis-1/6'>
                                                            <div className="w-24 h-24 border flex items-center justify-center">img medicine</div>
                                                        </div>
                                                        <div className="basis-5/6 w-full flex flex-col gap-3">
                                                            <div className="flex items-center gap-3 justify-between z-10">
                                                                <p className="whitespace-pre-wrap pr-3">blabla</p>
                                                                <div className="">blabla2</div>
                                                            </div>
                                                            <div className="">usage</div>
                                                            <div className="flex items-center gap-2">
                                                                <Link href='/medicine/3' className='px-3 py-1 border rounded-md bg-gray-200'>View Detail</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ul className="flex flex-col gap-2">
                                                        <div className="font-bold my-3">List medicines</div>
                                                        <li className="w-full flex justify-between items-center">
                                                            <p className='font-semibold'>Item1</p>
                                                            <p className='font-semibold'>x2</p>
                                                        </li>
                                                    </ul>
                                                    <div className="w-full flex justify-end my-5">
                                                        <button className='px-3 py-1 rounded-md bg-green-600 text-white '>Confirm</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorServices
