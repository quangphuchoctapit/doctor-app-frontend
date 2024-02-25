"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const OrderPage = () => {
  const params = useParams();
  const [dataAppointment, setDataAppointment] = useState<{
    doctorInfo: {
      username: String;
      doctorInfo: { specialty: { name: string }; price: number };
    }[];
    appointment: { doctorNote: string; status: string; _id: string }[];
  }>();

  useEffect(() => {
    const fetchAppointment = async () => {
      const response = await fetch(`/api/appointment/${params.userId}`, {
        method: "POST",
        body: JSON.stringify({
          patientId: params.userId,
        }),
      });
      if (response.ok) {
        let dataServer = await response.json();
        console.log(dataServer);
        setDataAppointment(dataServer);
      }
    };
    fetchAppointment();
  }, [params.userId]);
  //   console.log(dataAppointment);

  const [isOpenModalAppointment, setIsOpenModalAppointment] = useState(false);
  const onCloseModalAppointment = () => setIsOpenModalAppointment(false);
  const onOpenModalAppointment = () => setIsOpenModalAppointment(true);
  const [dataModalAppointment, setDataModalAppointment] = useState<{
    doctorNote: string;
    status: string;
    listSchedule?: {
      date: string;
      scheduleTimes: { id: number; label: string; _id: string };
      _id: string;
    };
    listMedicine?: {
      quantity: number;
      medicine: {
        name: string;
        unit: string;
        dispensed: string;
        type: string;
        _id: string
      }[];
    }[];
  }>();

  const doctorData = [
    { id: 1, name: "Doctor 1", price: 20, status: "Pending" },
    { id: 3, name: "Doctor 3", price: 50, status: "Confirmed" },
    { id: 4, name: "Doctor 4", price: 30, status: "Cancelled" },
    { id: 5, name: "Doctor 5", price: 32, status: "Rescheduled" },
    { id: 6, name: "Doctor 6", price: 33, status: "Completed" },
    { id: 7, name: "Doctor 7", price: 21, status: "No Show" },
  ];
  const medicineData = [
    { id: 1, name: "Item 1", price: 2, quantity: 2, status: "Delivering" },
    { id: 2, name: "Item 2", price: 1, quantity: 3, status: "Preparing" },
    { id: 3, name: "Item 3", price: 5, quantity: 4, status: "Confirmed" },
    { id: 4, name: "Item 4", price: 3, quantity: 1, status: "Completed" },
    { id: 5, name: "Item 5", price: 3, quantity: 1, status: "Canceled" },
  ];
  const handleDropdownDoctor = (doctorId: number, selectedValue: any) => {
    console.log(`Doctor ${doctorId} selected: ${selectedValue}`);
    // You can add your logic here to handle the dropdown selection
  };

  const handleDropdownMedicine = (itemId: number, selectedValue: any) => {
    console.log(`Item ${itemId} selected: ${selectedValue}`);
    // You can add your logic here to handle the dropdown selection
  };

  const handleOpenAppointmentModal = (value: any) => {
    onOpenModalAppointment();
    setDataModalAppointment(value);
  };

  //   const dataListMedicine = dataModalAppointment?.listMedicine?.map(item =>   {
  //         let obj = {quantity: 0, name: 0}
  //         obj.quantity = item.quantity
  //         obj.name = item?.medicine?.map(med => med?.name)
  //         return<div className="flex items-center justify-between"><span className="text-green-700">{obj.name}</span><span className="font-semibold">x{obj.quantity}</span></div>
  //     })

  // console.log();

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-tr from-blue-200 via-white to-green-200">
        <div className="container mx-auto flex flex-col items-center text-black">
          <div className="grid xl:grid-cols-2 gap-5 my-5">
            <div className="bg-white border rounded-md shadow-xl p-3 overflow-x-scroll">
              <h1 className="text-lg mb-5 font-bold">Appointment Orders</h1>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Detail
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price ($)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                
                  {dataAppointment?.appointment?.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">1</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href="/doctor/3">
                          {dataAppointment?.doctorInfo[0]?.username}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item?.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center">
                        <button
                          onClick={() => {
                            handleOpenAppointmentModal(item);
                          }}
                          className="bg-green-600 rounded-md text-center text-gray-200 w-full py-2"
                        >
                          Open
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {dataAppointment?.doctorInfo[0]?.doctorInfo?.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white border rounded-md shadow-xl p-3 overflow-x-scroll">
              <h1 className="text-lg mb-5 font-bold">Medicine Orders</h1>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price ($)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {medicineData.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href="/medicine/3">{item.name}</Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative">
                          <select
                            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) =>
                              handleDropdownMedicine(item.id, e.target.value)
                            }
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            {/* Add more options if needed */}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isOpenModalAppointment}
        onClose={onCloseModalAppointment}
        center
      >
        <div className="text-black p-3 flex flex-col gap-4 px-3 ">
          <h2 className="w-full text-center text-lg font-bold">
            Detail Appointment
          </h2>
          <div className="flex gap-3 items-center">
            <label htmlFor="">Date & Time:</label>
            <div>
              {dataModalAppointment?.listSchedule?.map((item:any) => {
                let obj = { date: 0, listSchedule: 0 };
                obj.date = item.date;
                obj.listSchedule = item?.scheduleTimes?.map(
                  (time:any) => time?.label
                );
                return (
                  <div key={item?._id} className="flex items-center gap-3 justify-between">
                    <span className="text-green-700">{obj.date}</span>
                    <span className="font-semibold text-yellow-700">
                      {" " + obj.listSchedule}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col w-full gap-1 ">
            <label className="font-semibold" htmlFor="">
              Doctor note:
            </label>
            <textarea
              disabled
              onChange={() => {}}
              value={dataModalAppointment?.doctorNote ? dataModalAppointment?.doctorNote : 'This doctor did not note anything'}
              className="w-full border bg-gray-300 rounded-md px-3 py-1 text-black"
            ></textarea>
          </div>
          <div className="flex flex-col w-full gap-1 ">
            <label className="font-semibold" htmlFor="">
              List Medicine:
            </label>
            <div className="w-full border px-3 py-1 rounded-md flex flex-col gap-1">
              {/* {dataModalAppointment?.listMedicine?.map((item) => item?.name)} */}
              {dataModalAppointment?.listMedicine?.length > 0
                ? dataModalAppointment?.listMedicine?.map((item) => {
                    let obj = { quantity: 0, name: '' };
                    obj.quantity = item.quantity;
                    obj.name = item?.medicine?.map((med) => med?.name);
                    return (
                      <div key={item?._id} className="flex items-center justify-between">
                        <span className="text-green-700">{obj.name}</span>
                        <span className="font-semibold">x{obj.quantity}</span>
                      </div>
                    );
                  })
                : <div>No medicine...</div>}
            </div>
          </div>
          <div className="flex flex-col w-full gap-1 ">
            <label className="font-semibold" htmlFor="">
              Appointment Status:
            </label>
            <textarea
              disabled
              onChange={() => {}}
              value={dataModalAppointment?.status}
              className="w-full border bg-gray-300 rounded-md px-3 py-1 text-black"
            ></textarea>
          </div>
          <div className="flex flex-col w-full gap-1 ">
            <label className="font-semibold" htmlFor="">
              Payment status:
            </label>
            <textarea
              disabled
              onChange={() => {}}
              value={"status payment"}
              className="w-full border bg-gray-300 rounded-md px-3 py-1 text-black"
            ></textarea>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderPage;
