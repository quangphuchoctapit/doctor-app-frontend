'use client'
import Link from 'next/link'
import React from 'react'

const SignUp = () => {
    return (
        <div className='min-h-screen  w-full bg-gradient-to-tr text-black from-purple-300 to-blue-300'>
            <div className="fixed inset-0 bg-white overflow-x-auto max-h-[90vh] rounded p-5 w-[90%] sm:w-[70%] md:w-[60%] xl:max-w-[50%] my-auto mx-auto">
                <div className="container flex flex-col gap-5 items-center">
                    {/* title */}
                    <div className="flex items-center">
                        <h1 className='text-3xl font-bold'>Welcome back, </h1>
                    </div>
                    <div className="flex flex-col gap-2 items-start w-full">
                        <label htmlFor="username">Username:</label>
                        <input className='border outline-none rounded px-3 w-full py-1' type="text" placeholder='duriandog' />
                        <label htmlFor="email">Email:</label>
                        <input className='border outline-none rounded px-3 w-full py-1' type="text" placeholder='durianman@dog.mail' />
                        <label className='mt-3' htmlFor="password">Password:</label>
                        <input className='border outline-none rounded px-3 w-full py-1' type="text" placeholder='****' />
                    </div>
                    <div className="flex justify-between gap-2 items-center w-full ">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <button className='w-full rounded-md flex items-center py-3 hover:duration-200 hover:bg-purple-500 justify-center text-white bg-purple-400'>Sign Up</button>
                    </div>
                    <div className="w-full text-center text-xl font-semibold">Or</div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="w-16 h-16 rounded border flex items-center justify-center">GG</div>
                        <div className="w-16 h-16 rounded border flex items-center justify-center">FB</div>
                        <div className="w-16 h-16 rounded border flex items-center justify-center">TW</div>
                    </div>
                    <div className="w-full flex items-center gap-4">
                        <span>Already have an account?</span>
                        <Link href='/login' className='text-purple-500 text-lg font-semibold'>Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
