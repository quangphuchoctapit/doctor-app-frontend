import React from 'react'
import { CgMediaLive } from "react-icons/cg";
import { useRouter } from 'next/navigation'; // Corrected import statement
import { FaStar } from "react-icons/fa";

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
    }[];
    isLive?: boolean
}

const CategoriesCollection: React.FC<ICategoriesCollectionProps> = ({ topic, data, fullData, isLive }) => {
    const router = useRouter(); // Changed let to const for router

    const sizeCards = () => {
        let size = '';
        if (topic === 'Live Doctors') {
            size = "min-w-48 h-56 rounded-lg overflow-hidden relative border shadow-lg flex flex-col";
        } else if (topic === 'Specialties') {
            size = "min-w-36 h-36 rounded-lg overflow-hidden relative border shadow-lg flex flex-col";
        } else if (topic === 'Popular Doctors') {
            size = "min-w-56 h-72 rounded-lg overflow-hidden relative border shadow-lg flex flex-col";
        } else if (topic === 'Featured Doctors') {
            size = "min-w-48 p-2 h-48 rounded-lg overflow-hidden relative border shadow-lg flex flex-col flex justify-center";
        } else if (topic === 'Medicine Order') {
            size = "min-w-36 h-36 rounded-lg overflow-hidden relative border shadow-lg flex flex-col";
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

    const handleRedirect = () => {
        if (topic === 'Featured Doctors' || topic === 'Popular Doctors') {
            router.push('/doctor/3');
        } else if (topic === 'Medicine Order') {
            router.push('/medicine/3');
        }
    };

    return (
        <div className="flex flex-col gap-3 mt-3">
            <div className="flex justify-between items-center">
                <h3 className='text-xl font-bold'>{topic}</h3>
                <div className="text-gray-400">See All</div>
            </div>
            {topic === 'Medicine Order' &&
                <div className='w-full'>
                    <input className='px-4 py-2 bg-white border border-gray-400 outline-none w-full rounded-md' type="text" placeholder='Search ' />
                </div>
            }
            <div className="overflow-x-auto flex gap-3 items-center">
                {fullData?.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleRedirect()}
                        className={sizeCards()}
                    >
                        {topic === 'Featured Doctors' &&
                            <div className="flex items-center mx-2 justify-between">
                                <div className="text-gray-400">heart</div>
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
                                <div className="text-xl font-bold">Dr Doctor</div>
                                <div className="text-md text-gray-500">Medicine Specialist</div>
                                <div className="">1 2 3 4 5</div>
                            </div>
                        }
                        {topic === 'Featured Doctors' &&
                            <div className="flex flex-col items-center ">
                                <div className="text-lg font-bold">Dr Kick</div>
                                <div className="text-md text-gray-500"><span className='text-green-500'>$</span>25.00/hour</div>
                            </div>
                        }
                        {topic === 'Medicine Order' &&
                            <div className="flex flex-col items-center ">
                                <div className="whitespace-nowrap text-sm font-bold ">Optical Supplement</div>
                                <div className="text-sm text-gray-500"><span className='text-green-500'>$</span>25.00/serving</div>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesCollection;
