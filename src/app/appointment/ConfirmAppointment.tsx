'use client'
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';

interface ConfirmAppointmentProps {
    setSchedule: (key: string, value: any) => void;
}

interface Schedule {
    label?: string;
    id?: number;
}

interface listScheduleDates {
    date: String
    scheduleTimes: {
        _id: String
        id: number
        label: String
    }
}[]
const ConfirmAppointment: React.FC<ConfirmAppointmentProps> = ({ setSchedule }) => {
    const params = useParams()
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const [dateCalendar, setDateCalendar] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('');
    const [listScheduleTimeDoctor, setListScheduleTimeDoctor] = useState([]);
    const formatDate = (date: any) => {
        return format(date, 'yyyy-MM-dd'); // Customize the format as needed
    };
    const [listTimeDoctor, setListTimeDoctor] = useState<{ label: String, _id: String, id: Number }>([]);

    const [listTimePatientSelected, setListTimePatientSelected] = useState<{ id: Number, label: String, _id: String }[]>([]);
    const [listScheduleDates, setListScheduleDates] = useState<listScheduleDates[]>([]);
    let finalListScheduleDates = listScheduleDates.map((item: any) => {
        let obj: Schedule = {};
        obj.label = item?.scheduleTimes?.label
        obj.id = item?.scheduleTimes?.id
        return obj
    })

    const onChangeDateCalendar = (newDate: any) => {
        setDateCalendar(newDate);
    };

    useEffect(() => {
        const formattedDate = formatDate(dateCalendar);
        setSelectedDate(formattedDate)
    }, [dateCalendar])

    const tileDisabled = ({ activeStartDate, date, view }) => {
        return date < new Date()
    }

    const [dataDoctor, setDataDoctor] = useState({});

    const fetchDataDoctor = async () => {
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
            const newData = dataServer.filter((item: any, index: any) => {
                return item._id === params.doctorid
            })
            setDataDoctor(newData[0])
        }
    }

    useEffect(() => {
        fetchDataDoctor();
    }, [params.doctorid]);

    useEffect(() => {
        setListScheduleTimeDoctor(dataDoctor?.doctorInfo?.listSchedule)
        setSelectedDate(dataDoctor?.doctorInfo?.listSchedule[0]?.date)
    }, [dataDoctor])

    useEffect(() => {
        const scheduleTime = listScheduleTimeDoctor?.filter(dateData => dateData?.date === selectedDate)?.[0]?.scheduleTimes || [];
        setListTimeDoctor(scheduleTime)
    }, [selectedDate])

    const handlePatientSelectedTime = (timeInput: any) => {
        const checkReClickTime = listTimePatientSelected.some(time => time.id === timeInput.id)
        if (checkReClickTime) {
            const newListSelectedTime = listTimePatientSelected.filter(time => time.id !== timeInput.id)
            setListTimePatientSelected(newListSelectedTime)

        } else {
            setListTimePatientSelected([...listTimePatientSelected, timeInput])

        }
    }

    useEffect(() => {
        const isSelectedDateInList = listScheduleDates.some(dateData => dateData.date === selectedDate);

        if (!isSelectedDateInList) {
            setListTimePatientSelected([]);
        } else {
            const correspondingListSelectedTime = listScheduleDates.find(dateData => dateData.date === selectedDate)?.scheduleTimes || [];
            setListTimePatientSelected(correspondingListSelectedTime);
        }

        if (isSelectedDateInList) {
            return;
        }

        const newListScheduleDates = listScheduleDates.filter(dateData => dateData.date !== '');

        const newObj = {
            date: selectedDate,
            scheduleTimes: listTimePatientSelected
        };
        setListScheduleDates([...newListScheduleDates, newObj]);
    }, [selectedDate]);

    useEffect(() => {
        const updatedListScheduleDates = listScheduleDates.map(dateData => {
            if (dateData.date === selectedDate) {
                return {
                    ...dateData,
                    scheduleTimes: listTimePatientSelected
                };
            }
            return dateData;
        });

        setListScheduleDates(updatedListScheduleDates);
    }, [listTimePatientSelected]);

    useEffect(() => {

        setSchedule('listSchedule', listScheduleDates)
    }, [listScheduleDates]);

    return (
        <>
            <div className='flex w-full gap-5 my-8'>
                <div className="bg-white border w-full rounded-md p-3 shadow-md">
                    <h1 className='text-xl my-3 font-bold'>Choose a date</h1>
                    <div className=''>
                        <Calendar tileDisabled={tileDisabled} onChange={onChangeDateCalendar} value={dateCalendar} />
                    </div>
                    <div className="flex flex-col gap-3 mt-8">
                        <h2 className='text-lg font-bold'>Available Time</h2>
                        <div className="flex items-center gap-2 overflow-x-auto">
                            {listTimeDoctor.length > 0 ? listTimeDoctor.map((item: any) => (
                                <div key={item?._id} onClick={() => handlePatientSelectedTime(item)} className={!listTimePatientSelected?.some(time => time.id === item.id) ? "min-w-20 min-h-10 rounded-md bg-orange-400 text-white flex items-center justify-center" : "min-w-20 min-h-10 rounded-md bg-orange-700 text-white flex items-center justify-center"} >{item.label}</div>
                            )) :
                                <div className="px-5 py-2 rounded-md border-2 text-black flex items-center justify-center">This doctor is not available this day</div>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 my-8">
                        <h2 className='text-lg font-bold'>Remind Me Before</h2>
                        <div className="flex items-center gap-2 overflow-x-auto">
                            {['15 min', "20 min", "30 min", "1 hr", '6 hr', '1 day'].map((item, index) => (
                                <div className="min-w-16 min-h-16 rounded-full bg-green-600 leading-4 text-center text-white flex items-center text-sm justify-center" key={index}>{item}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmAppointment
