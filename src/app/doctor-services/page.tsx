"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "react-responsive-modal/styles.css";
import { format } from "date-fns";
import { Modal } from "react-responsive-modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import {
  addListMedicines,
  handleSearchResultMedicines,
  inputSearchMedicines,
} from "../redux/features/search/searchSlice";
import { log } from "console";
import { toast } from "react-toastify";

interface Appointment {
  appointment: {
    note: string;
    patientAge: string;
    patientSymptoms: string;
    patientFormerIllnesses: string;
    patientGender: string;
    patientName: string;
    patientNumber: string;
    status: string;
    _id: string;
    listSchedule: {
      date: string;
      scheduleTimes: { id: Number; _id: string; label: string }[];
    }[];
  };
  patientInfo?: {
    email: string;
    image?: string;
    gender: string;
  };
}

interface Medicine {
  brandOwner: string;
  description: string;
  name: string;
  usage: string;
  ingredients: string;
  type: string;
  _id: string;
  dispensed: string;
  image: string;
  originCountry: string;
  price: number;
  provider: string;
}

interface MedicineList {
  medicine: Medicine;
  quantity: number;
}

const DoctorServices = () => {
  const dispatch = useDispatch();

  // set calendar
  const [dateCalendar, setDatecalendar] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const onChangeDate = (newDate: any) => {
    setDatecalendar(newDate);
  };
  const formatDate = (date: Date) => {
    return format(date, "yyyy-MM-dd"); // Customize the format as needed
  };

  useEffect(() => {
    const formattedDate = formatDate(dateCalendar);
    setSelectedDate(formattedDate);
  }, [onChangeDate]);

  // modal patient handling
  const [isOpenPatientModal, setIsOpenPatientModal] = useState<boolean>(false);
  const setOpenPatientModal = () => setIsOpenPatientModal(true);
  const onClosePatientModal = () => setIsOpenPatientModal(false);

  // search medicines for modal patient waiting list
  const resultSearch = useSelector(
    (state: RootState) => state.search.medicines.resultSearch
  );
  const [queryMedicineSearch, setQueryMedicineSearch] = useState("");
  const handleOnChangeMedicineQuery = (e: string) => {
    setQueryMedicineSearch(e);
    dispatch(inputSearchMedicines({ query: e }));
    dispatch(handleSearchResultMedicines());
  };
  const [displayedMedicine, setDisplayedMedicine] = useState<Medicine>();
  const [listSelectedMedicine, setListSelectedMedicine] = useState<
    MedicineList[]
  >([]);
  const [specialtyDisplayedMedicine, setSpecialtyDisplayedMedicine] =
    useState<{ image: string; name: string; _id: string }[]>();
  const [doctorNote, setDoctorNote] = useState("");

  // handle click medicine
  const handleClickMedicine = async (id: string | undefined) => {
    const response = await fetch(`/api/medicine/${id}`, {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    });
    if (response.ok) {
      let dataServer = await response.json();
      let object = dataServer[0];
      setDisplayedMedicine(object);
    }
  };

  const handleAddListSelectedMedicine = (item: Medicine) => {
    if (
      listSelectedMedicine?.some(
        (itemData) => itemData?.medicine?._id === item?._id
      )
    ) {
      setListSelectedMedicine([...listSelectedMedicine]);
    } else {
      setListSelectedMedicine([
        ...listSelectedMedicine,
        { quantity: 1, medicine: item },
      ]);
    }
  };
  const handleOnChangeQuantityMedicine = (value: any, item: MedicineList) => {
    const listSelectedMedicineCopy = [...listSelectedMedicine];
    const updatedList = listSelectedMedicineCopy.map((itemData) => {
      if (itemData.medicine._id === item.medicine._id) {
        return { ...itemData, quantity: value };
      }
      return itemData;
    });

    setListSelectedMedicine(updatedList);
  };
  const convertSpecialty = async (id: string | undefined) => {
    const response = await fetch(`/api/specialty/${id}`, {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    });
    if (response.ok) {
      let dataServer = await response.json();
      setSpecialtyDisplayedMedicine(dataServer);
    }
  };
  useEffect(() => {
    convertSpecialty(displayedMedicine?.type);
  }, [displayedMedicine]);

  // fetch doctor of this page
  useEffect(() => {
    // fetch all medicines
    const fetchMedicines = async () => {
      const medicines = await fetch(`/api/medicine`);
      const dataServer = await medicines.json();
      dispatch(addListMedicines({ listMedicines: dataServer }));
    };
    fetchMedicines();
  }, []);
  const [dataDoctor, setDataDoctor] = useState<{
    _id: string;
    doctorInfo?: {
      specialty?: { name?: string };
      price?: number;
      description?: string;
      _id: string;
    };
    username?: string;
    image?: string;
  }>();
  const userRedux = useSelector((state: RootState) => state.user.value);

  // fetch doctor detail
  useEffect(() => {
    const fetchDoctorDetail = async () => {
      let id = userRedux.id;
      const response = await fetch(`/api/doctor/${id}`, {
        method: "POST",
        body: JSON.stringify({
          id: userRedux.id,
        }),
      });
      if (response.ok) {
        let dataServer = await response.json();
        setDataDoctor(dataServer);
        const newData = dataServer.filter((item: any, index: any) => {
          return item._id === userRedux.id;
        });
        setDataDoctor(newData[0]);
      }
    };
    fetchDoctorDetail();
  }, [userRedux]);

  const [isopenDropdownMedicineFilter, setIsOpenDropdownMedicineFilter] =
    useState<boolean>(false);
  const toggleDropdownMedicineFilter = () => {
    setIsOpenDropdownMedicineFilter(!isopenDropdownMedicineFilter);
  };
  const [dataPatientWaitingList, setDataPatientWaitingList] = useState<
    Appointment[]
  >([]);
  const [dataPatientWaitingListByDate, setDataPatientWaitingListByDate] =
    useState<Appointment[]>([]);
  const [dataTimeByDate, setDataTimeByDate] = useState<
    { label: string; _id: string }[]
  >([]);

  const [dataAppointmentModal, setDataAppointmentModal] =
    useState<Appointment>();
  const [currentSelectedAppointment, setCurrentSelectedAppointment] =
    useState("");
  useEffect(() => {
    const filterPatientByDate = dataPatientWaitingList?.filter((item) =>
      item?.appointment?.listSchedule?.some(
        (schedule) => schedule.date === selectedDate
      )
    );

    const filteredScheduleTimes = filterPatientByDate
      ?.flatMap((item) =>
        item.appointment?.listSchedule?.filter(
          (schedule) => schedule.date === selectedDate
        )
      )
      ?.map((filteredItem) => filteredItem?.scheduleTimes)
      ?.flat(); // flatten the array

    if (filteredScheduleTimes) {
      const uniqueTime = filteredScheduleTimes.reduce(
        (unique: { label: string; _id: string }[], appointment) => {
          // Check if an appointment with the same _id exists in the unique array
          if (!unique.some((a) => a._id === appointment._id)) {
            unique.push(appointment); // If not, add it to the unique array
          }
          return unique;
        },
        []
      );

      setDataTimeByDate(uniqueTime);
    }

    setDataPatientWaitingListByDate(filterPatientByDate);
  }, [selectedDate, dataPatientWaitingList]);

  // fetch doctor appointments
  let doctorId = dataDoctor?._id;
  const fetchAppointment = async () => {
    const response = await fetch(`/api/appointment/doctor/${userRedux.id}`, {
      method: "POST",
      body: JSON.stringify({
        doctorId: doctorId,
      }),
    });
    if (response.ok) {
      let dataServer = await response.json();
      setDataPatientWaitingList(dataServer);
    }
  };
  useEffect(() => {
    fetchAppointment();
  }, [dataDoctor?._id]);

  // set data appointment modal
  useEffect(() => {
    const filterData = dataPatientWaitingList?.filter(
      (item) => item?.appointment?._id === currentSelectedAppointment
    );
    setDataAppointmentModal(filterData[0]);
  }, [currentSelectedAppointment]);

  const handleSubmit = async () => {
    const response = await fetch(`/api/appointment/doctor/confirm`, {
      method: "POST",
      body: JSON.stringify({
        appointmentId: currentSelectedAppointment,
        doctorNote: doctorNote,
        listMedicine: listSelectedMedicine,
        doctorInfoId: dataDoctor?.doctorInfo?._id,
      }),
    });
    if (response.ok) {
      let dataServer = await response.json();
      toast.success("Successfully confirm appointment");
      onClosePatientModal();
      fetchAppointment();
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-tr via-white from-blue-200 to-cyan-200">
        <div className="flex flex-col items-center container mx-auto gap-5 text-black py-5">
          {/* intro section */}
          <div className="bg-white shadow-lg border p-3 rounded-md w-full">
            {/* intro */}
            <div className="grid grid-cols-6 gap-3 text-black">
              <div className="col-span-1">
                <div className=" border w-16 sm:h-24 md:w-32 h-16 sm:w-24 md:h-32 gap-3">
                  <img
                    src={dataDoctor?.image}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-span-5 px-4 flex gap-3 justify-between">
                <div className="flex flex-col ">
                  <h3 className="sm:text-lg font-bold">
                    Dr.{dataDoctor?.username}
                  </h3>
                  <p className="text-gray-400 max-sm:text-xs">
                    {dataDoctor?.doctorInfo?.specialty?.name}
                  </p>
                  <div className="max-sm:text-sm flex items-center gap-1 mt-5">
                    <FaStar className="text-yellow-400" size={10} />
                    <FaStar className="text-yellow-400" size={10} />
                    <FaStar className="text-yellow-400" size={10} />
                    <FaStar className="text-yellow-400" size={10} />
                    <FaStar className="text-yellow-400" size={10} />
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <div className="max-sm:text-xs text-red-400">
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
            <div className="w-full flex flex-col mt-3 gap-5">
              <div className="w-full flex flex-col gap-2 ">
                <label className="text-lg font-semibold" htmlFor="description">
                  Services
                </label>
                <div className="flex items-center justify-between p-3 border">
                  <textarea
                    name=""
                    id="description"
                    value="doctor services abcabcabcabc"
                    onChange={() => {}}
                  ></textarea>
                  <div className="">Edit</div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 ">
                <label className="text-lg font-semibold" htmlFor="description">
                  Description
                </label>
                <div className="flex items-center justify-between p-3 border">
                  <textarea
                    value={dataDoctor?.doctorInfo?.description}
                    name=""
                    id="description"
                    onChange={() => {}}
                  ></textarea>
                  <div className="">Edit</div>
                </div>
              </div>
            </div>
          </div>

          {/* schedule & patients list section */}
          <div className="grid lg:grid-cols-2 gap-5 ">
            <div className="bg-white shadow-lg border p-3 gap-3 rounded-md flex flex-col whitespace-nowrap overflow-x-auto">
              <h3 className="text-lg font-semibold">Schedule</h3>
              <div className="my-3 flex justify-center">
                <Calendar onChange={onChangeDate} value={dateCalendar} />
              </div>
              <div className="flex items-center gap-3">
                {dataTimeByDate?.length > 0 &&
                  dataTimeByDate?.map((item) => (
                    <div
                      key={item._id}
                      className="p-3 rounded-lg bg-green-700 border border-green-700 text-white px-3 py-1"
                    >
                      {item?.label}
                    </div>
                  ))}
                {/* <div className="p-3 rounded-lg bg-white border border-gray-700 text-black px-3 py-1">7:00</div> */}
              </div>
            </div>
            <div className="bg-white shadow-lg border p-3 gap-3 rounded-md flex flex-col whitespace-nowrap overflow-x-auto">
              <h3 className="text-lg font-semibold">Patient's waiting list</h3>
              <div className="flex flex-col gap-3">
                {/* patient needs medicine */}
                <div
                  onClick={setOpenPatientModal}
                  className="p-3 rounded-lg flex flex-col gap-3 text-black bg-white border-gray-700 line-clamp-1 border"
                >
                  <div className="flex gap-3 items-center">
                    <div className="basis-1/6">
                      <div className="w-24 h-24 border flex items-center justify-center">
                        img patient
                      </div>
                    </div>
                    <div className="basis-5/6 w-full flex flex-col gap-3">
                      <div className="flex items-center gap-3 justify-between z-10">
                        <p className="whitespace-pre-wrap pr-3">blabla</p>
                        <div className="">blabla2</div>
                      </div>
                      <div className="">symptom symptom</div>
                      <div className="flex items-center gap-2 justify-between">
                        <button className="px-3 py-1 border rounded-md bg-gray-200">
                          View Detail
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <div className="text-green-600 text-lg font-smibold">Appointment at <span className='font-bold'>14:00</span></div> */}
                </div>

                {/* patient needs appointment */}
                {dataPatientWaitingListByDate?.length > 0 &&
                  dataPatientWaitingListByDate?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setOpenPatientModal();
                        setCurrentSelectedAppointment(item?.appointment?._id);
                      }}
                      className="p-3 rounded-lg flex flex-col gap-3 text-black bg-white shadow-md line-clamp-1 border border-green-500 shadow-green-800"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="basis-1/6">
                          <div className="w-24 h-24 border flex items-center justify-center">
                            <img
                              src={
                                item?.patientInfo?.image
                                  ? item?.patientInfo?.image
                                  : item?.patientInfo?.gender === "male"
                                  ? "/user/avatar/user-male.png"
                                  : "/user/avatar/user-female.png"
                              }
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="basis-5/6 w-full flex flex-col gap-3">
                          <div className="flex items-center gap-3 justify-between z-10">
                            <p className="whitespace-pre-wrap pr-3">
                              {item?.appointment?.patientName}
                            </p>
                            <div className="">{item?.appointment?.status}</div>
                          </div>
                          <div className="">
                            {item?.appointment?.patientSymptoms}
                          </div>
                          <div className="flex items-center gap-2 justify-between">
                            <button className="px-3 py-1 border rounded-md bg-gray-200">
                              View Detail
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-green-600 text-lg font-smibold">
                        Appointment at{" "}
                        <span className="font-bold">
                          {item?.appointment?.listSchedule?.map(
                            (item, index) => (
                              <div key={index}>
                                {item?.date === selectedDate
                                  ? item?.date + " "
                                  : ""}
                                <span className="text-blue-700">
                                  {item.scheduleTimes.map((item) =>
                                    dataTimeByDate.some(
                                      (itemTime) => itemTime._id === item._id
                                    )
                                      ? item.label + " "
                                      : ""
                                  )}
                                </span>{" "}
                              </div>
                            )
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={isOpenPatientModal} onClose={onClosePatientModal} center>
        <div className="text-black p-3 flex flex-col gap-4 px-3 ">
          <h2 className="my-4 text-lg font-bold text-center">
            Patient Details
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">
                {dataAppointmentModal?.appointment?.patientName}
              </div>
              <button className="px-3 border-none bg-green-600 py-1  text-white rounded-lg">
                Contact this patient
              </button>
            </div>
            <div className="text-gray-600">
              <span>{dataAppointmentModal?.appointment?.patientAge}</span>yrs
              old -{" "}
              <span>{dataAppointmentModal?.appointment?.patientGender}</span> -{" "}
              <span>
                {dataAppointmentModal?.appointment?.patientFormerIllnesses !==
                ""
                  ? dataAppointmentModal?.appointment?.patientFormerIllnesses
                  : "No formal illnesses"}
              </span>
            </div>
            <div className="w-full flex justify-center"></div>
            <div className="w-full">
              <label className="mt-3 font-semibold" htmlFor="">
                Symptoms
              </label>
              <textarea
                onChange={() => {}}
                className="w-full lg:min-w-[700px] sm:min-w-[500px] bg-green-100 text-black border px-3 py-1"
                value={dataAppointmentModal?.appointment?.patientSymptoms}
              ></textarea>
              <label className="mt-3 font-semibold" htmlFor="">
                Patient's Note
              </label>
              <textarea
                placeholder="note"
                onChange={() => {}}
                className="w-full lg:min-w-[700px] sm:min-w-[500px] text-black border px-3 py-1"
                value={dataAppointmentModal?.appointment?.note}
              ></textarea>
            </div>
            <div className="border p-3 bg-white rounded-lg flex flex-col gap-3 ">
              <div className="relative">
                <input
                  onChange={(e) => handleOnChangeMedicineQuery(e.target.value)}
                  value={queryMedicineSearch}
                  type="text"
                  placeholder="Search Medicine..."
                  className="outline-none w-full border border-gray-700 px-3 py-1 rounded-lg"
                />
                {queryMedicineSearch.length > 0 && (
                  <div className="absolute overflow-auto z-10 w-full mt-1 bg-white border-2 border-gray-300 rounded-md shadow-lg max-h-32">
                    {/* Content inside the responsive div */}
                    {resultSearch.map((medicine) => (
                      <div
                        onClick={() => handleClickMedicine(medicine._id)}
                        key={medicine._id}
                        className="px-3 py-1 hover:duration-200 hover:bg-gray-200 cursor-pointer"
                      >
                        {/* Render medicine information here */}
                        {medicine?.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center ">
                  <h3 className="font-bold">Filter</h3>
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        onClick={toggleDropdownMedicineFilter}
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        id="options-menu"
                        aria-expanded="true"
                        aria-haspopup="true"
                      >
                        Type
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* <!-- Dropdown menu items --> */}
                    {isopenDropdownMedicineFilter && (
                      <div
                        className="origin-top-right z-[90] absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <div className="py-1" role="none">
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            Cardiovascular
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            Derman
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            Optical
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  {/* displayed medicine */}
                  {displayedMedicine && (
                    <div className="p-3 rounded-lg flex items-center border shadow-md bg-white">
                      <div className="basis-1/6">
                        <div className="w-24 h-24 border flex items-center justify-center">
                          <img
                            src={displayedMedicine?.image}
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="basis-4/6 w-full flex flex-col gap-3">
                        <div className="flex items-center gap-3 justify-between z-10">
                          <p className="whitespace-pre-wrap pr-3">
                            {displayedMedicine?.name}
                          </p>
                          <div className="">
                            {specialtyDisplayedMedicine?.[0]?.name}
                          </div>
                        </div>
                        <div className="">${displayedMedicine?.price}</div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/medicine/${displayedMedicine?._id}`}
                            className="px-3 py-1 border rounded-md bg-gray-200"
                          >
                            View Detail
                          </Link>
                        </div>
                      </div>
                      <div className="basis-1/6 flex items-end justify-end ">
                        <div
                          className="bg-yellow-400 rounded-md px-4 py-6 cursor-pointer hover:duration-200 hover:bg-yellow-500 text-black"
                          onClick={() =>
                            handleAddListSelectedMedicine(displayedMedicine)
                          }
                        >
                          Select
                        </div>
                      </div>
                    </div>
                  )}

                  {/* list selected medicine */}
                  <ul className="flex flex-col gap-2">
                    <div className="font-bold my-3">List medicines</div>
                    {listSelectedMedicine?.length > 0 &&
                      listSelectedMedicine?.map((item) => (
                        <li
                          key={item?.medicine?._id}
                          className="w-full flex justify-between items-center"
                        >
                          <p
                            onClick={() =>
                              handleClickMedicine(item?.medicine?._id)
                            }
                            className="cursor-pointer hover:duration-200 hover:underline font-semibold"
                          >
                            {item?.medicine?.name}
                          </p>
                          <p className="font-semibold flex justify-end overflow-x-auto">
                            x
                            <input
                              type="number"
                              onChange={(e) => {
                                handleOnChangeQuantityMedicine(
                                  e.target.value,
                                  item
                                );
                              }}
                              className="flex items-center justify-center border max-w-[40px] cursor-pointer text-lg font-bold"
                              value={item?.quantity}
                            />
                          </p>
                        </li>
                      ))}
                  </ul>
                  <div className="w-full flex flex-col my-2">
                    <label htmlFor="" className="my-3 font-semibold ">
                      Note for Patient
                    </label>
                    <textarea
                      value={doctorNote}
                      onChange={(e) => setDoctorNote(e.target.value)}
                      className="px-3 py-1 w-full rounded-md text-black bg-yellow-50 "
                      placeholder="Note for patient"
                    ></textarea>
                  </div>
                  <div className="w-full flex justify-end my-5">
                    <button
                      onClick={handleSubmit}
                      className="px-3 py-1 rounded-md bg-green-600 text-white "
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DoctorServices;
