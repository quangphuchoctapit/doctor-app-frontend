'use client'
import { RootState } from '@/app/redux/Store';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ConfirmAppointment from '../ConfirmAppointment';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify';

interface ListScheduleDate {
  date: string;
  scheduleTimes: {
    _id: string;
    id: number;
    label: string;
  }[];
}

const Appointment = () => {
  const router = useRouter();
  const userRedux = useSelector((state: RootState) => state.user.value);
  const params = useParams();
  const defaultDataDoctor = {
    username: '',
    id: '',
  };
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const onCloseConfirmModal = () => setIsOpenConfirmModal(false);
  const onOpenConfirmModal = () => setIsOpenConfirmModal(true);

  const defaultPatientInput = {
    name: '',
    number: '',
    symptoms: '',
    formerIllnesses: '',
    note: '',
    age: '',
    gender: 'Male',
    id: '',
    listSchedule: [],
  };
  const [patientInput, setPatientInput] = useState(defaultPatientInput);

  const handleOnChangePatientInput = (
    value: string,
    field: string
  ) => {
    setPatientInput((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const [dataDoctor, setDataDoctor] = useState<{
    _id: string,
    username: string;
    image?: string;
    doctorInfo: {
      specialty?: {
        name?: string;
      };
      price?: number;
    };
  } | null>(null);

  const [selectedOptionGender, setSelectedOptionGender] = useState(
    'Male'
  );

  const handleOptionChangeGender = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSelectedOptionGender(value);
    setPatientInput((prevState) => ({
      ...prevState,
      gender: value,
    }));
  };

  useEffect(() => {
    const fetchDoctorDetail = async () => {
      let id = params.doctorid;
      const response = await fetch(`/api/doctor/${id}`, {
        method: 'POST',
        body: JSON.stringify({
          id: params.doctorid,
        }),
      });
      if (response.ok) {
        let dataServer = await response.json();
        setDataDoctor(dataServer);
        const newData = dataServer.filter(
          (item: any, index: any) => {
            return item._id === params.doctorid;
          }
        );
        setDataDoctor(newData[0]);
      }
    };
    fetchDoctorDetail();
  }, [params.doctorid]);

  const setPatientInputConfirm = (key: any, value: any) => {
    setPatientInput({ ...patientInput, [key]: value });
  };

  const handleConfirmAppointment = async () => {
    console.log('atinet input: ', patientInput);
    const { listSchedule, age, name, formerIllnesses, gender, note, number, symptoms } = patientInput
    const patientId = userRedux.id
    const doctorId = dataDoctor?._id
    const response = await fetch(`/api/appointment/new`, {
      method: "POST",
      body: JSON.stringify({
        listSchedule, age, name, formerIllnesses, gender, patientId, doctorId, note, number, symptoms
      }),


    });
    if (response.ok) {
      toast.success('Successfully created new appointment')
      onCloseConfirmModal()
      setPatientInput(defaultPatientInput)
    }
  };


  return (
    <>
      <div className="bg-gradient-to-br from-blue-200 via-white to-green-200 w-full">
        <div className="flex flex-col gap-5 mx-auto container py-5">
          {/* intro */}
          <div className="shadow-lg border rounded-lg bg-white p-3 flex flex-col">
            <div className="grid grid-cols-12 gap-3 text-black">
              <div className="col-span-4 sm:col-span-3">
                <div className=" border w-20 sm:h-32 h-20 sm:w-32 gap-3">
                  <img
                    src={dataDoctor?.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="col-span-8 sm:col-span-9 flex gap-3 justify-between">
                <div className="flex flex-col">
                  <h3 className="sm:text-lg font-bold">
                    Dr.{dataDoctor?.username}
                  </h3>
                  <p className="text-gray-400 max-sm:text-xs">
                    {dataDoctor?.doctorInfo?.specialty?.name}
                  </p>
                  <div className="max-sm:text-sm flex items-center gap-1 mt-2">
                    <FaStar className="text-yellow-400" size={10} />
                    <FaStar className="text-yellow-400" size={10} />
                    <FaStar className="text-yellow-400" size={10} />
                    <FaStar className="text-yellow-400" size={10} />
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <div className="max-sm:text-sm text-red-400">
                    <FaHeart />
                  </div>
                  <div className="max-sm:text-xs flex items-center gap-1">
                    <span className="text-green-500">
                      ${dataDoctor?.doctorInfo?.price}
                    </span>
                    /hour
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment for & Who is this patient */}
          <div className="w-full flex flex-col gap-3 text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="">
                <h2 className="text-xl font-bold">Appointment For</h2>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="patient-name">Patient Name</label>
                    <input
                      onChange={(e) =>
                        handleOnChangePatientInput(
                          e.target.value,
                          'name'
                        )
                      }
                      value={patientInput.name}
                      type="text"
                      placeholder="Patient Name"
                      className="px-3 rounded-md outline-none bg-transparent border border-gray-500 py-2"
                    />
                    <label htmlFor="Contact Number">Contact Number</label>
                    <input
                      onChange={(e) =>
                        handleOnChangePatientInput(
                          e.target.value,
                          'number'
                        )
                      }
                      value={patientInput.number}
                      type="text"
                      placeholder="Contact Number"
                      className="px-3 rounded-md outline-none bg-transparent border border-gray-500 py-2"
                    />
                    <label htmlFor="patient-symptoms">Symptoms</label>
                    <textarea
                      onChange={(e) =>
                        handleOnChangePatientInput(
                          e.target.value,
                          'symptoms'
                        )
                      }
                      value={patientInput.symptoms}
                      placeholder="Patient Symptoms"
                      className="px-3 rounded-md outline-none bg-transparent border border-gray-500 py-2"
                    ></textarea>
                    <label htmlFor="patient-former-illnesses">
                      Does patient have former illnesses?
                    </label>
                    <textarea
                      onChange={(e) =>
                        handleOnChangePatientInput(
                          e.target.value,
                          'formerIllnesses'
                        )
                      }
                      value={patientInput.formerIllnesses}
                      placeholder="Leave this blank if the patient has no former illnesses"
                      className="px-3 rounded-md outline-none bg-transparent border border-gray-500 py-2"
                    ></textarea>
                    <label htmlFor="patient-note">
                      Note something for the doctor
                    </label>
                    <textarea
                      onChange={(e) =>
                        handleOnChangePatientInput(
                          e.target.value,
                          'note'
                        )
                      }
                      value={patientInput.note}
                      placeholder="Note something, or leave it blank"
                      className="px-3 rounded-md outline-none bg-transparent border border-gray-500 py-2"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold">Who is this patient?</h2>
                <div className="w-full mt-3 flex items-center justify-center">
                  <div className="bg-white p-3 h-full rounded-md w-full shadow-lg border overflow-x-auto">
                    <div className="flex gap-3 items-center">
                      <div className="bg-green-200 rounded-lg text-green-700 h-36 min-w-32 flex items-center justify-center">
                        + Add
                      </div>
                      <div className="shadow-lg border rounded-lg h-36 min-w-32 flex items-center justify-center">
                        Myself
                      </div>
                      <div className="shadow-lg border rounded-lg h-36 min-w-32 flex items-center justify-center">
                        My child
                      </div>
                      <div className="shadow-lg border rounded-lg h-36 min-w-32 flex items-center justify-center">
                        My dog
                      </div>
                      <div className="shadow-lg border rounded-lg h-36 min-w-32 flex items-center justify-center">
                        My slave
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label>How old is this patient?</label>
                  <input
                    onChange={(e) =>
                      handleOnChangePatientInput(
                        e.target.value,
                        'age'
                      )
                    }
                    value={patientInput.age}
                    type="text"
                    placeholder="18"
                    className="px-3 rounded-md outline-none bg-transparent border border-gray-500 py-2"
                  />
                  <label>Patient Gender?</label>
                  <div className="flex items-center gap-4 justify-center">
                    <label>
                      <input
                        type="radio"
                        value="Male"
                        checked={selectedOptionGender === 'Male'}
                        onChange={handleOptionChangeGender}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Female"
                        checked={selectedOptionGender === 'Female'}
                        onChange={handleOptionChangeGender}
                      />
                      Female
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Others"
                        checked={selectedOptionGender === 'Others'}
                        onChange={handleOptionChangeGender}
                      />
                      Others
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <ConfirmAppointment setSchedule={setPatientInputConfirm} />
            <div className="w-full flex items-center justify-center">
              <div
                onClick={() => onOpenConfirmModal()}
                className="py-2 w-full bg-green-600 rounded-md text-white text-center text-lg "
              >
                Next
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={isOpenConfirmModal} onClose={onCloseConfirmModal} center>
        <div className="text-black p-3 flex flex-col gap-4">
          <h2 className="my-4 text-lg font-bold text-center">
            Confirm Appointment
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-3 flex gap-2">
              <p className="">
                Appointment time: {' '}
              </p>
              <div className="flex gap-2 font-bold">
                {patientInput?.listSchedule?.map((item: ListScheduleDate) => (
                  <div key={item?.date} className="flex gap-2">
                    Date: {item?.date}{' '}
                    {item?.scheduleTimes?.map((time) => (
                      <div key={time.id} className="text-green-800">{time.label}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              Name:{' '}
              <span className="text-gray-600 font-semibold">
                {patientInput?.name || ' '}
              </span>
            </div>
            <div className="">
              Age:{' '}
              <span className="text-gray-600 font-semibold">
                {patientInput?.age || ' '}
              </span>
            </div>
            <div className="">
              Contact number:{' '}
              <span className="text-gray-600 font-semibold">
                {patientInput?.number || ' '}
              </span>
            </div>
            <div className="">
              Gender:{' '}
              <span className="text-gray-600 font-semibold">
                {patientInput?.gender || ' '}
              </span>
            </div>
            <div className="">
              Symptoms:{' '}
              <span className="text-gray-600 font-semibold">
                {patientInput?.symptoms || ' '}
              </span>
            </div>
            <div className="">
              Former Illnesses:{' '}
              <span className="text-gray-600 font-semibold">
                {patientInput?.symptoms || `I don't have any former illnesses`}
              </span>
            </div>
            <div className="">
              Note:{' '}
              <span className="text-gray-600 font-semibold">
                {patientInput?.note || ' '}
              </span>
            </div>
            <div className="col-span-3 flex justify-end">
              <div
                onClick={handleConfirmAppointment}
                className="px-4 py-2 rounded-md bg-gradient-to-tr from-lime-400 to-blue-400 text-white"
              >
                Confirm
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Appointment;
