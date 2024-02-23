'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react'
import { FaHeart, FaStar } from "react-icons/fa";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-responsive-modal/styles.css';
import { format } from 'date-fns';
import { Modal } from 'react-responsive-modal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/Store';
import { addListMedicines, handleSearchResultMedicines, inputSearchMedicines } from '../redux/features/search/searchSlice';

interface Appointment {
    appointment: {
        note: string, patientAge: string, patientSymptoms: string,
        patientFormerIllnesses: string, patientGender: string,
        patientName: string, patientNumber: string,
        status: string, _id: string,
        listSchedule: {
            date: string,
            scheduleTimes: { id: Number, _id: string, label: string }[]
        }[]
    },
    patientInfo?: {
        email: string, image?: string
    }
}


const DoctorServices = () => {
    const dispatch = useDispatch()

    // set calendar
    const [dateCalendar, setDatecalendar] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('')
    const onChangeDate = (newDate: any) => {
        setDatecalendar(newDate);
    };
    const formatDate = (date: Date) => {
        return format(date, 'yyyy-MM-dd'); // Customize the format as needed
    };

    useEffect(() => {
        const formattedDate = formatDate(dateCalendar);
        setSelectedDate(formattedDate)
    }, [onChangeDate])

    // modal patient handling
    const [isOpenPatientModal, setIsOpenPatientModal] = useState<boolean>(false)
    const setOpenPatientModal = () => setIsOpenPatientModal(true);
    const onClosePatientModal = () => setIsOpenPatientModal(false);


    // search medicines for modal patient waiting list
    const resultSearch = useSelector((state: RootState) => state.search.medicines.resultSearch)
    const [queryMedicineSearch, setQueryMedicineSearch] = useState('')
    const handleOnChangeMedicineQuery = (e: string) => {
        setQueryMedicineSearch(e)
        dispatch(inputSearchMedicines({ query: e }))
        dispatch(handleSearchResultMedicines())
    }

    // fetch doctor of this page
    useEffect(() => {
        // fetch all medicines
        const fetchMedicines = async () => {
            const medicines = await fetch(`/api/medicine`)
            const dataServer = await medicines.json()
            dispatch(addListMedicines({ listMedicines: dataServer }))
        }
        fetchMedicines()
    }, [])
    const [dataDoctor, setDataDoctor] = useState<{ _id: string, doctorInfo?: { specialty?: { name?: string }, price?: number, description?: string }, username?: string, image?: string }>()
    const userRedux = useSelector((state: RootState) => state.user.value)

    // fetch doctor detail
    useEffect(() => {
        const fetchDoctorDetail = async () => {
            let id = userRedux.id
            const response = await fetch(`/api/doctor/${id}`, {
                method: "POST",
                body: JSON.stringify({
                    id: userRedux.id
                }),
            });
            if (response.ok) {
                let dataServer = await response.json()
                setDataDoctor(dataServer)
                const newData = dataServer.filter((item: any, index: any) => {
                    return item._id === userRedux.id
                })
                setDataDoctor(newData[0])
            }
        }
        fetchDoctorDetail()
    }, [userRedux])

    const [isopenDropdownMedicineFilter, setIsOpenDropdownMedicineFilter] = useState<boolean>(false)
    const toggleDropdownMedicineFilter = () => {
        setIsOpenDropdownMedicineFilter(!isopenDropdownMedicineFilter);
    };
    const [dataPatientWaitingList, setDataPatientWaitingList] = useState<Appointment[]>([])
    const [dataAppointmentModal, setDataAppointmentModal] = useState<Appointment[]>([])
    const [currentSelectedAppointment, setCurrentSelectedAppointment] = useState('')

    // fetch doctor appointments
    useEffect(() => {
        let doctorId = dataDoctor?._id
        const fetchAppointment = async () => {
            const response = await fetch(`/api/appointment/doctor/${userRedux.id}`, {
                method: "POST",
                body: JSON.stringify({
                    doctorId: doctorId
                }),
            });
            if (response.ok) {

                let dataServer = await response.json()
                setDataPatientWaitingList(dataServer)
            }
        }
        fetchAppointment()
    }, [dataDoctor?._id])

    useEffect(() => {
        const filterData = dataPatientWaitingList?.filter(item => item?.appointment?._id === currentSelectedAppointment)
        setDataAppointmentModal(filterData[0])
    }, [currentSelectedAppointment])

    return (
        <div className='w-full min-h-screen bg-gradient-to-tr via-white from-blue-200 to-cyan-200'>
            <div className="flex flex-col items-center container mx-auto gap-5 text-black py-5">

                {/* intro section */}
                <div className="bg-white shadow-lg border p-3 rounded-md w-full">
                    {/* intro */}
                    <div className="grid grid-cols-6 gap-3 text-black">
                        <div className="col-span-1">
                            <div className=" border w-16 sm:h-24 md:w-32 h-16 sm:w-24 md:h-32 gap-3">
                                <img src={dataDoctor?.image} className='w-full h-full object-cover' alt="" />
                            </div>
                        </div>
                        <div className="col-span-5 px-4 flex gap-3 justify-between">
                            <div className="flex flex-col ">
                                <h3 className='sm:text-lg font-bold'>Dr.{dataDoctor?.username}</h3>
                                <p className='text-gray-400 max-sm:text-xs'>{dataDoctor?.doctorInfo?.specialty?.name}</p>
                                <div className="max-sm:text-sm flex items-center gap-1 mt-5">
                                    <FaStar className='text-yellow-400' size={10} /><FaStar className='text-yellow-400' size={10} /><FaStar className='text-yellow-400' size={10} /><FaStar className='text-yellow-400' size={10} /><FaStar className='text-yellow-400' size={10} />
                                </div>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <div className="max-sm:text-xs text-red-400"><FaHeart /></div>
                                <div className="max-sm:text-xs flex items-center gap-1"><span className='text-green-500'>${dataDoctor?.doctorInfo?.price}</span>/hour</div>
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
                                <textarea value={dataDoctor?.doctorInfo?.description} name="" id="description" onChange={() => { }}></textarea>
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
                            <Calendar onChange={onChangeDate} value={dateCalendar} />
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
                            {dataPatientWaitingList?.length > 0 &&
                                dataPatientWaitingList?.map((item, index) => (
                                    <div key={index} onClick={() => { setOpenPatientModal(); setCurrentSelectedAppointment(item?.appointment?._id) }} className="p-3 rounded-lg flex flex-col gap-3 text-black bg-white shadow-md line-clamp-1 border border-green-500 shadow-green-800">
                                        <div className="flex gap-3 items-center">
                                            <div className='basis-1/6'>
                                                <div className="w-24 h-24 border flex items-center justify-center">
                                                    <img src={item?.patientInfo?.image} alt="" className='w-full h-full object-cover' />
                                                </div>
                                            </div>
                                            <div className="basis-5/6 w-full flex flex-col gap-3">
                                                <div className="flex items-center gap-3 justify-between z-10">
                                                    <p className="whitespace-pre-wrap pr-3">{item?.appointment?.patientName}</p>
                                                    <div className="">{item?.appointment?.status}</div>
                                                </div>
                                                <div className="">{item?.appointment?.patientSymptoms}</div>
                                                <div className="flex items-center gap-2 justify-between">
                                                    <button className='px-3 py-1 border rounded-md bg-gray-200'>View Detail</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-green-600 text-lg font-smibold">Appointment at <span className='font-bold'>{item?.appointment?.listSchedule?.map((item, index) => <div key={index}>{item?.date}-{item.scheduleTimes.map(item => item?.label)}</div>)}</span></div>
                                    </div>
                                ))
                            }

                            <Modal open={isOpenPatientModal} onClose={onClosePatientModal} center>
                                <div className="text-black p-3 flex flex-col gap-4 px-3 ">
                                    <h2 className='my-4 text-lg font-bold text-center'>Patient Details</h2>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <div className="text-lg font-semibold">{dataAppointmentModal?.appointment?.patientName}</div>
                                            <button className='px-3 border-none bg-green-600 py-1  text-white rounded-lg'>Contact this patient</button>
                                        </div>
                                        <div className="text-gray-600"><span>{dataAppointmentModal?.appointment?.patientAge}</span>yrs old - <span>{dataAppointmentModal?.appointment?.patientGender}</span> - <span>{dataAppointmentModal?.appointment?.patientFormalIllnesses !== '' ? dataAppointmentModal?.appointment?.patientFormerIllnesses : 'No formal illnesses'}</span></div>
                                        <div className="w-full flex justify-center">
                                        </div>
                                        <div className="w-full">
                                            <textarea onChange={() => { }} className='w-full lg:min-w-[700px] sm:min-w-[500px] bg-green-100 text-black border px-3 py-1' value={dataAppointmentModal?.appointment?.patientSymptoms}></textarea>
                                        </div>
                                        <div className="border p-3 bg-white rounded-lg flex flex-col gap-3 ">
                                            <div className="relative">
                                                <input onChange={e => handleOnChangeMedicineQuery(e.target.value)} value={queryMedicineSearch} type="text" placeholder='Search Medicine...' className='outline-none border border-gray-700 px-3 py-1 rounded-lg' />
                                                {queryMedicineSearch.length > 0 && (
                                                    <div className="absolute overflow-auto z-10 w-full mt-1 bg-white border-2 border-gray-300 rounded-md shadow-lg max-h-32">
                                                        {/* Content inside the responsive div */}
                                                        {resultSearch.map((medicine) => (
                                                            <div key={medicine._id} className='px-3 py-1'>
                                                                {/* Render medicine information here */}
                                                                {medicine?.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
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
