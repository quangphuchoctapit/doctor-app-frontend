'use client'
import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ConfirmAppointment = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate: any) => {
        setDate(newDate);
    };
    return (
        <div className='bg-gradient-to-br from-blue-200 via-white to-green-200 w-full'>
            <div className="flex flex-col lg:py-5 gap-5 text-black  mx-auto container">
                <div className='mx-5 lg:grid lg:grid-cols-3 gap-5'>
                    <div className="">
                        <h1 className='text-xl my-3 font-bold'>Choose a date</h1>
                        <div>
                            <Calendar onChange={onChange} value={date} />
                        </div>
                    </div>
                    <div className="col-span-2 my-5 bg-white lg:rounded-md max-lg:rounded-t-3xl shadow-lg border w-full py-4 px-3">
                        <div className="flex flex-col gap-3 my-3">
                            <h2 className='text-lg font-bold'>Available Time</h2>
                            <div className="flex items-center gap-2 overflow-x-auto">
                                {['10:00', '12:00', "14:00", "16:00", "18:00"].map((item, index) => (
                                    <div className="min-w-16 min-h-16 rounded-full bg-green-600 text-white flex items-center justify-center" key={index}>{item}</div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 my-3">
                            <h2 className='text-lg font-bold'>Remind Me Before</h2>
                            <div className="flex items-center gap-2 overflow-x-auto">
                                {['15 min', "20 min", "30 min", "1 hr", '6 hr', '1 day'].map((item, index) => (
                                    <div className="min-w-16 min-h-16 rounded-full bg-green-600 leading-4 text-center text-white flex items-center text-sm justify-center" key={index}>{item}</div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center, my-5">
                            <div className="w-full bg-green-600 text-white text-lg rounded-md py-3 text-center">Confirm</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ConfirmAppointment
