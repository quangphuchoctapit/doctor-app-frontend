'use client'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react'

const OrderPage = () => {
    const params = useParams()


    useEffect(() => {
        const fetchAppointment = async () => {
            const response = await fetch(`/api/appointment/${params.userId}`, {
                method: "POST",
                body: JSON.stringify({
                    patientId: params.userId
                }),
            });
            if (response.ok) {

                let dataServer = await response.json()
                console.log(dataServer);
                let object = dataServer[0]
            }
        }
        fetchAppointment()
    }, [params.userId])


    const doctorData = [
        { id: 1, name: 'Doctor 1', price: 20, status: 'Pending' },
        { id: 3, name: 'Doctor 3', price: 50, status: 'Confirmed' },
        { id: 4, name: 'Doctor 4', price: 30, status: 'Cancelled' },
        { id: 5, name: 'Doctor 5', price: 32, status: 'Rescheduled' },
        { id: 6, name: 'Doctor 6', price: 33, status: 'Completed' },
        { id: 7, name: 'Doctor 7', price: 21, status: 'No Show' },

    ];
    const medicineData = [
        { id: 1, name: 'Item 1', price: 2, quantity: 2, status: 'Delivering' },
        { id: 2, name: 'Item 2', price: 1, quantity: 3, status: 'Preparing' },
        { id: 3, name: 'Item 3', price: 5, quantity: 4, status: 'Confirmed' },
        { id: 4, name: 'Item 4', price: 3, quantity: 1, status: 'Completed' },
        { id: 5, name: 'Item 5', price: 3, quantity: 1, status: 'Canceled' },
    ];
    const handleDropdownDoctor = (doctorId: number, selectedValue: any) => {
        console.log(`Doctor ${doctorId} selected: ${selectedValue}`);
        // You can add your logic here to handle the dropdown selection
    };

    const handleDropdownMedicine = (itemId: number, selectedValue: any) => {
        console.log(`Item ${itemId} selected: ${selectedValue}`);
        // You can add your logic here to handle the dropdown selection
    };



    return (
        <div className='w-full min-h-screen bg-gradient-to-tr from-blue-200 via-white to-green-200'>
            <div className="container mx-auto flex flex-col items-center text-black">
                <div className="grid xl:grid-cols-2 gap-5 my-5">
                    <div className="bg-white border rounded-md shadow-xl p-3 overflow-x-scroll">
                        <h1 className='text-lg mb-5 font-bold'>Appointment Orders</h1>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price ($)</th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {doctorData.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link href='/doctor/3'>{item.name}</Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="relative">
                                                <select
                                                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                                                    onChange={(e) => handleDropdownDoctor(item.id, e.target.value)}
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                    {/* Add more options if needed */}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-white border rounded-md shadow-xl p-3 overflow-x-scroll">
                        <h1 className='text-lg mb-5 font-bold'>Medicine Orders</h1>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price ($)</th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {medicineData.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link href='/medicine/3'>{item.name}</Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="relative">
                                                <select
                                                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                                                    onChange={(e) => handleDropdownMedicine(item.id, e.target.value)}
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                    {/* Add more options if needed */}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPage
