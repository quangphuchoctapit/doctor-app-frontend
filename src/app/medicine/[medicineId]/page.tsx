import React from 'react'
import { FaCheckCircle } from "react-icons/fa";

const MedicinePage = () => {
    return (
        <div className='w-full my-5 min-h-screen bg-gradient-to-tr from-green-200 via-white to-blue-200'>
            <div className="container mx-auto flex flex-col gap-5 items-center text-black">
                <div className="bg-white rounded-md border shadow-lg p-3 grid w-full lg:grid-cols-12">
                    <div className="col-span-7 flex flex-col gap-5">
                        <div className="w-full bg-white p-3 flex items-center justify-center">
                            <img src='/medicine/eye-medicine.jpg' className="w-full h-full object-cover border"></img>
                        </div>

                        {/* medicine detail */}
                        <div className="flex flex-col p-3 gap-3">
                            <div className="text-lg font-bold">Medicine Detail</div>
                            <div className="flex flex-col gap-3 ">
                                <h2 className=' font-semibold'>Ingredients</h2>
                                <p className='p-2'>
                                    Mỗi gói (10ml) chứa: <br />

                                    - Hoạt chất: Natri alginate 500mg, Natri bicarbonate 267mg, Calcicarbonate 160mg. <br />

                                    - Tá dược: Carbomer 974P, methyl parahydroxyben-zoat, propyl parahydroxybenzoat, saccharin natri, hương bạc hà tự nhiên, natri hydroxid, nước tinh khiết.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 ">
                                <h2 className=' font-semibold'>Usage</h2>
                                <p className='p-2'>
                                    Điều trị các triệu chứng của trào ngược dạ dày - thực quản như ợ nóng, khó tiêu và ợ chua liên quan đến sự trào ngược như sau bữa ăn, hoặc trong khi mang thai, hoặc trên những bệnh nhân có các triệu chứng liên quan với viêm thực quản do trào ngược.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-5 flex flex-col gap-5 p-3">
                        <h2 className='text-xl font-bold'>Gaviscon - Medicine for heartburn & Indigestion Patients</h2>
                        <div className="flex gap-1 items-center">
                            <FaCheckCircle className='text-green-500' />
                            <span>Available</span>
                            <span>ID: 13088</span>
                        </div>
                        <div className="bg-white shadow-lg border p-3 flex justify-between items-center max-sm:gap-2">
                            <span className='text-red-400 max-sm:text-base text-lg font-bold flex items-center'>$ <span>0.5</span>/<span>pack</span></span>
                            <button className='px-3 py-2 rounded-md bg-green-600 text-white'>Add Medicine to Cart</button>
                        </div>
                        <p className='text-sm'>Contact Medicine Specialist for more information: <span className='text-blue-600'>1900 1222</span> (<span>$1</span>/<span>min</span>)</p>
                        <div className="bg-white shadow-lg rounded-md border p-3 flex flex-col gap-3 items-center">
                            <h3 className='text-lg font-semibold'><span className='text-green-400'>1</span>{' '}Available Medicine Store</h3>
                            <div className="w-full flex ">
                                <p>21 Banana Hill, Haloi, Vitnam</p>
                            </div>
                        </div>
                        <div className="bg-white shadow-lg rounded-md border p-3 flex flex-col gap-3">
                            <div className="flex flex-col gap-3 ">
                                <div className="grid grid-cols-8 gap-3">
                                    <div className="col-span-3">
                                        <h2 className='text-lg font-semibold leading-5'>Usage</h2>
                                    </div>
                                    <div className="col-span-5">
                                        <p className='text-gray-600 '>Treat GERD symptoms</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-8 gap-3">
                                    <div className="col-span-3">
                                        <h2 className='text-lg font-semibold leading-5'>Main Ingredients</h2>
                                    </div>
                                    <div className="col-span-5">
                                        <p className='text-gray-600 '><span className='text-blue-500'>
                                            Calci carbonat, Natri bicarbonat, Natri alginate</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-8 gap-3">
                                    <div className="col-span-3">
                                        <h2 className='text-lg font-semibold leading-5'>Brand Owner</h2>
                                    </div>
                                    <div className="col-span-5">
                                        <p className='text-gray-600 '>
                                            Reckitt Benckiser (England)
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-8 gap-3">
                                    <div className="col-span-3">
                                        <h2 className='text-lg font-semibold leading-5'>Provider</h2>
                                    </div>
                                    <div className="col-span-5">
                                        <p className='text-gray-600 '>
                                            Reckitt Benckiser Healthcare (UK) limited
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-8 gap-3">
                                    <div className="col-span-3">
                                        <h2 className='text-lg font-semibold leading-5'>Origin (country)</h2>
                                    </div>
                                    <div className="col-span-5">
                                        <p className='text-gray-600 '>
                                            England
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-8 gap-3">
                                    <div className="col-span-3">
                                        <h2 className='text-lg font-semibold leading-5'>Dispensed</h2>
                                    </div>
                                    <div className="col-span-5">
                                        <p className='text-gray-600 '>
                                            Blended liquid
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full my-5 bg-white p-3 border shadow-lg rounded-md">
                    <h2 className='text-xl font-bold my-5'>Similar Medicines</h2>
                    <div className="flex gap-3 items-center overflow-x-auto">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                            <div className="rounded-md border p-3 hover:border-green-400 hover:duration-200 hover:shadow-lg hover:scale-105" key={index}>
                                <div className="h-[70%]">
                                    <div className="h-48 min-w-48 bg-orange-300">Medicine image</div>
                                </div>
                                <div className="flex flex-col py-2">
                                    <p className='text-sm'>Hỗn dịch uống A.T Sucralfate 1000mg trị loét dạ dày, tá tràng</p>
                                    <p className=''><span className='text-red-400 max-sm:text-xs font-semibold'>$20</span>/<span>box</span></p>
                                    <button className='w-full bg-green-700 px-3 rounded-md text-white py-2'>Add to Medicine Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full my-5">
                    <div className="mx-auto lg:max-w-[80%] rounded-md p-3 bg-white shadow-lg border  flex flex-col gap-3">
                        <h2 className='text-lg font-bold'>Comment Section</h2>

                        {/* each comment */}
                        <div className="">
                            <div className="flex flex-col p-3">
                                <h3 className='font-semibold'>user1</h3>
                                <p className='text-sm text-gray-600'>Can I use this medicine if I am obesed?</p>
                            </div>
                            <div className="mx-5 p-3 flex flex-col bg-gray-300 rounded-sm">
                                <h3 className='font-semibold'>doctor1 (medicine specialist)</h3>
                                <p className='text-sm text-gray-800'>
                                    Nhà thuốc An Khang xin chào anh Khoa, dạ Hỗn dịch uống Gaviscon trị triệu chứng trào ngược dạ dày, thực quản (24 gói x 10ml) không chống chỉ định cho người có huyết áp cao, mình có thể sử dụng được ạ. Em xin thông tin đến anh. Cảm ơn anh đã luôn quan tâm, chúc anh nhiều sức khỏe ạ!
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex flex-col p-3">
                                <h3 className='font-semibold'>user1</h3>
                                <p className='text-sm text-gray-600'>Can I use this medicine if I am obesed?</p>
                            </div>
                            <div className="mx-5 p-3 flex flex-col bg-gray-300 rounded-sm">
                                <h3 className='font-semibold'>doctor1 (medicine specialist)</h3>
                                <p className='text-sm text-gray-800'>
                                    Nhà thuốc An Khang xin chào anh Khoa, dạ Hỗn dịch uống Gaviscon trị triệu chứng trào ngược dạ dày, thực quản (24 gói x 10ml) không chống chỉ định cho người có huyết áp cao, mình có thể sử dụng được ạ. Em xin thông tin đến anh. Cảm ơn anh đã luôn quan tâm, chúc anh nhiều sức khỏe ạ!
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex flex-col p-3">
                                <h3 className='font-semibold'>user1</h3>
                                <p className='text-sm text-gray-600'>Can I use this medicine if I am obesed?</p>
                            </div>
                            <div className="mx-5 p-3 flex flex-col bg-gray-300 rounded-sm">
                                <h3 className='font-semibold'>doctor1 (medicine specialist)</h3>
                                <p className='text-sm text-gray-800'>
                                    Nhà thuốc An Khang xin chào anh Khoa, dạ Hỗn dịch uống Gaviscon trị triệu chứng trào ngược dạ dày, thực quản (24 gói x 10ml) không chống chỉ định cho người có huyết áp cao, mình có thể sử dụng được ạ. Em xin thông tin đến anh. Cảm ơn anh đã luôn quan tâm, chúc anh nhiều sức khỏe ạ!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MedicinePage
