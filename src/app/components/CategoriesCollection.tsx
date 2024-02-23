'use client'
import React, { useState, useEffect } from 'react'
import { CgMediaLive } from "react-icons/cg";
import { useRouter } from 'next/navigation'; // Corrected import statement
import { FaStar } from "react-icons/fa";
import { RootState } from '../redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import { addListMedicines, handleSearchResultMedicines, inputSearchMedicines } from '../redux/features/search/searchSlice';

interface ICategoriesCollectionProps {
    topic: string;
    data?: {
        id: number;
        image: string;
        isLive?: boolean;
    };
    fullData?: {
        _id?: string;
        name?: string;
        image?: string;
        doctorInfo?: {
            specialty?: {
                name?: string
            }
            price?: number
        }
        username?: string
        price?: number
    }[];
    isLive?: boolean
}

const CategoriesCollection: React.FC<ICategoriesCollectionProps> = ({ topic, data, fullData, isLive }) => {
    const router = useRouter(); // Changed let to const for router
    const [selectedDoctorId, setSelectedDoctorId] = useState('')
    const [selectedMedicineId, setSelectedMedicineId] = useState('')

    const [querySearchMedicine, setQuerySearchMedicine] = useState('')
    const searchQuery = useSelector((state: RootState) => state.search.medicines.query)
    const listMedicines = useSelector((state: RootState) => state.search.medicines.listMedicines)
    const resultSearch = useSelector((state: RootState) => state.search.medicines.resultSearch)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchMedicines = async () => {
            const medicines = await fetch(`/api/medicine`)
            const dataServer = await medicines.json()
            dispatch(addListMedicines({ listMedicines: dataServer }))
        }
        fetchMedicines()
    }, [])

    const handleOnChangeQuerySearchMedicine = (e: string) => {
        setQuerySearchMedicine(e)
        dispatch(inputSearchMedicines({ query: e }))
        dispatch(handleSearchResultMedicines())
    }



    const sizeCards = () => {
        let size = '';
        if (topic === 'Live Doctors') {
            size = "min-w-48 hover:duration-300 hover:scale-95 cursor-pointer hover:bg-gray-100 h-56 rounded-lg overflow-hidden relative border shadow-lg flex flex-col";
        } else if (topic === 'Specialties') {
            size = "min-w-36 hover:duration-300 hover:scale-95 cursor-pointer hover:bg-gray-100 h-36 rounded-lg overflow-hidden relative border shadow-lg flex flex-col";
        } else if (topic === 'Popular Doctors') {
            size = "min-w-56 hover:duration-300 hover:scale-95 cursor-pointer hover:bg-gray-100 h-72 rounded-lg overflow-hidden relative border shadow-lg flex flex-col";
        } else if (topic === 'Featured Doctors') {
            size = "min-w-48 hover:duration-300 hover:scale-95 cursor-pointer hover:bg-gray-100 p-2 h-48 rounded-lg overflow-hidden relative border shadow-lg flex flex-col flex justify-center";
        } else if (topic === 'Medicine Order') {
            size = "min-w-36 hover:duration-300 hover:scale-95 cursor-pointer hover:bg-gray-100 h-36 rounded-lg overflow-hidden relative border shadow-lg flex flex-col";
        }
        return size;
    };

    const sizeImgCards = () => {
        let size = '';
        if (topic === 'Live Doctors') {
            size = "max-w-[200px] h-full";
        } else if (topic === 'Specialties') {
            size = "max-w-[150px] h-full";
        } else if (topic === 'Popular Doctors') {
            size = "p-3  h-[130px] w-[130px] mx-auto";
        } else if (topic === 'Featured Doctors') {
            size = " h-[100px] w-[100px] mx-auto";
        } else if (topic === 'Medicine Order') {
            size = "p-3 h-[60%] w-[100px] h-[100px] mx-auto";
        }
        return size;
    };

    const handleRedirect = (id: any) => {
        try {
            if (topic === 'Featured Doctors' || topic === 'Popular Doctors') {
                setSelectedDoctorId(id)
            } else if (topic === 'Medicine Order') {
                setSelectedMedicineId(id)
            }
        } catch (e) {
            console.log('error:', e);

        }
    };
    useEffect(() => {
        if (selectedDoctorId) {
            if (topic === 'Featured Doctors' || topic === 'Popular Doctors') {
                router.push(`/doctor/${selectedDoctorId}`);
            }
        }
        else if (selectedMedicineId) {
            // console.log(selectedMedicineId);

            router.push(`/medicine/${selectedMedicineId}`);
        }
    }, [selectedDoctorId, selectedMedicineId, handleRedirect])

    return (
        <div className="flex flex-col gap-3 mt-3">
            <div className="flex justify-between items-center">
                <h3 className='text-xl font-bold text-lime-800'>{topic}</h3>
                <div className="text-gray-400">See All</div>
            </div>
            {topic === 'Medicine Order' &&
                <div className='w-full relative'>
                    <input value={querySearchMedicine} onChange={e => handleOnChangeQuerySearchMedicine(e.target.value)} className='px-4 py-2 bg-white border border-gray-400 outline-none w-full rounded-md' type="text" placeholder='Search ' />
                    {querySearchMedicine.length > 0 && (
                        <div className="absolute w-full mt-1 z-10 bg-white border overflow-auto border-gray-300 rounded-md shadow-lg max-h-32">
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
            }
            <div className="overflow-x-auto flex gap-3 items-center">
                {fullData?.map((item, index) => (
                    <div
                        key={item._id}
                        onClick={() => handleRedirect(item._id)}
                        className={sizeCards()}
                    >
                        {topic === 'Featured Doctors' &&
                            <div className="flex items-center mx-2 justify-between">
                                <div className="text-gray-400">{item?.doctorInfo?.specialty?.name || 'Specialty'}</div>
                                <div className="flex gap-1 items-center"><FaStar className='text-yellow-400' size={15} /> <span className='font-bold'>3.7</span></div>
                            </div>
                        }
                        {isLive &&
                            <div className="absolute top-2 right-2 rounded-lg bg-red-500 px-2 text-white whitespace-nowrap flex items-center gap-1"><span className='text-white'><CgMediaLive size={10} /></span> Live</div>
                        }
                        <div className={sizeImgCards()}>
                            <img src={fullData ? fullData?.[index]?.image : data?.image} alt={topic} className={topic === 'Featured Doctors' ? "w-full h-full object-cover rounded-full " : "w-full h-full object-cover"} />
                        </div>
                        {topic === 'Popular Doctors' &&
                            <div className="flex flex-col items-center">
                                <div className="text-xl font-bold">{item?.username || 'Doctor name'}</div>
                                <div className="text-md text-gray-500">{item?.doctorInfo?.specialty?.name || 'Specialty'}</div>
                                <div className="flex items-center gap-1 mt-3">
                                    <FaStar className='text-yellow-400' size={10} /><FaStar className='text-yellow-400' size={10} /><FaStar className='text-yellow-400' size={10} /><FaStar className='text-yellow-400' size={10} /><FaStar className='text-yellow-400' size={10} />
                                </div>
                                <div className="mt-2 text-gray-500">25k patients</div>
                            </div>
                        }
                        {topic === 'Featured Doctors' &&
                            <div className="flex flex-col items-center ">
                                <div className="text-lg font-bold">{item?.username || 'Doctor name'}</div>
                                <div className="text-md text-gray-500"><span className='text-green-500'>$</span>{item?.doctorInfo?.price}/hour</div>
                            </div>
                        }
                        {topic === 'Medicine Order' &&
                            <div className="flex flex-col items-center ">
                                <div className="whitespace-nowrap text-sm font-bold ">{item?.name}</div>
                                <div className="text-sm text-gray-500"><span className='text-green-500'>${item?.price}</span>/serving</div>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesCollection;
