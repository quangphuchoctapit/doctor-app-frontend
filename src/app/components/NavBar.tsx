import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <header className="w-full bg-black text-white">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3 w-full overflow-hidden">
                    <div className="block hover:bg-gray-300 h-full px-3 py-4 cursor-pointer hover:text-black hover:duration-200">Home</div>
                    <div className="hidden sm:block hover:bg-gray-300 h-full py-4 px-3 cursor-pointer hover:text-black hover:duration-200">Admin</div>
                    <div className="hidden sm:block whitespace-nowrap hover:bg-gray-300 h-full py-4 px-3 cursor-pointer hover:text-black hover:duration-200">All Doctors</div>
                    <div className="hidden sm:block whitespace-nowrap hover:bg-gray-300 h-full py-4 px-3 cursor-pointer hover:text-black hover:duration-200">My Appointments</div>
                </div>

                <div className="hidden lg:block w-full ml-10 md:ml-20">
                    <input type="text" placeholder='Search...' className='bg-white text-black px-4 py-2 outline-none rounded border' />
                </div>
                <Link href='/login' className="px-3">Logout</Link>
            </div>
        </header>

    )
}

export default NavBar
