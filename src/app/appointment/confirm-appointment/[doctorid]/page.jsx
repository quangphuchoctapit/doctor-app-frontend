'use client'
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';


const ConfirmAppointment = () => {
    const params = useParams()
    const [dateCalendar, setDateCalendar] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('')
    const [listScheduleTimeDoctor, setListScheduleTimeDoctor] = useState([])
    const formatDate = (date) => {
        return format(date, 'yyyy-MM-dd'); // Customize the format as needed
    };
    const [listTimeDoctor, setListTimeDoctor] = useState([])
    const onChangeDateCalendar = (newDate) => {
        setDateCalendar(newDate);
    };

    useEffect(() => {
        const formattedDate = formatDate(dateCalendar);
        setSelectedDate(formattedDate)
    }, [dateCalendar])
    const tileDisabled = ({ activeStartDate, date, view }) => {
        return date < new Date()
    }

    const [dataDoctor, setDataDoctor] = useState({})

    useEffect(() => {
        const fetchDoctorDetail = async () => {
            let id = params.doctorid
            const response = await fetch(`/api/doctor/${id}`, {
                method: "POST",
                body: JSON.stringify({
                    id: params.doctorid
                }),
            });
            if (response.ok) {
                let dataServer = await response.json()
                setDataDoctor(dataServer)
                const newData = dataServer.filter((item, index) => {
                    return item._id === params.doctorid
                })
                setDataDoctor(newData[0])
            }
        }
        fetchDoctorDetail()
    }, [params.doctorid])

    useEffect(() => {
        setListScheduleTimeDoctor(dataDoctor?.doctorInfo?.listSchedule)
        setSelectedDate(dataDoctor?.doctorInfo?.listSchedule[0]?.date)
    }, [dataDoctor])

    useEffect(() => {
        const scheduleTime = listScheduleTimeDoctor?.filter(dateData => dateData?.date === selectedDate)?.[0]?.scheduleTimes || [];
        setListTimeDoctor(scheduleTime)
    }, [selectedDate])

    return (
        <div className='bg-gradient-to-br from-blue-200 via-white to-green-200 w-full'>
            <div className="flex flex-col lg:py-5 gap-5 text-black  mx-auto container">
                <div className='mx-5 lg:grid lg:grid-cols-3 gap-5'>
                    <div className="">
                        <h1 className='text-xl my-3 font-bold'>Choose a date</h1>
                        <div className=''>
                            <Calendar tileDisabled={tileDisabled} onChange={onChangeDateCalendar} value={dateCalendar} />
                        </div>
                    </div>
                    <div className="col-span-2 my-5 bg-white lg:rounded-md max-lg:rounded-t-3xl shadow-lg border w-full py-4 px-3">
                        <div className="flex flex-col gap-3 my-3">
                            <h2 className='text-lg font-bold'>Available Time</h2>
                            <div className="flex items-center gap-2 overflow-x-auto">
                                {listTimeDoctor.length > 0 ? listTimeDoctor.map((item, index) => (
                                    <div className="min-w-20 min-h-10 rounded-md bg-orange-400 text-white flex items-center justify-center" key={index}>{item.label}</div>
                                )) :
                                    <div className="px-5 py-2 rounded-md border-2 text-black flex items-center justify-center">This doctor is not available this day</div>
                                }
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
