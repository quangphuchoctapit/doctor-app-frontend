'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDropdownUser, setIsOpenDropdownUser] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdownUser = () => {
        setIsOpenDropdownUser(!isOpenDropdownUser);

    }

    useEffect(() => {
        setIsOpen(false);
    }, [window.location.href])

    return (
        <nav className="bg-gray-800">
            <div className="flex justify-between items-center container mx-auto">
                <div className="flex items-center">
                    <Link href="/" className="text-white mr-4 hover:bg-gray-300 px-4 py-3 hover:duration-200 hover:text-black">Home</Link>
                    <Link href="/doctors" className="text-white mr-4 hover:bg-gray-300 px-4 py-3 hover:duration-200 hover:text-black">Doctors</Link>
                    <div className="relative">
                        <button className="text-white hidden sm:block" onClick={toggleDropdown}>
                            Admin
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 16a1 1 0 0 1-.707-.293l-6-6a1 1 0 0 1 1.414-1.414L10 13.586l5.293-5.293a1 1 0 0 1 1.414 1.414l-6 6A1 1 0 0 1 10 16z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {isOpen && (
                            <div className="absolute z-10 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                                <Link href="/admin/users" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Users</Link>
                                <Link href="/admin/doctors" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Doctors</Link>
                                <Link href="/admin/clinics" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Clinics</Link>
                                <Link href="/admin/medicines" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Medicines</Link>
                                <Link href="/admin/specialties" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Specialties</Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="">
                    <div onClick={toggleDropdownUser} className="w-12 right-0 h-12 border rounded-full relative">
                        {isOpenDropdownUser && (
                            <div className="absolute top-full z-10 right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                                <Link href="/profile/3" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                                <Link href="/admin/medicines" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Appointment</Link>
                                <Link href="/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Orders</Link>
                                <Link href="/admin/clinics" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Balance</Link>
                                <Link href="/login" className="block px-4 py-2 text-red-800 hover:bg-gray-700 hover:text-red-300 font-bold">Log Out</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
