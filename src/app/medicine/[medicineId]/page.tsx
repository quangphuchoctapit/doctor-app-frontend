"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/Store";
import { toast } from "react-toastify";
import Link from "next/link";

const MedicinePage = () => {
  const userRedux = useSelector((state: RootState) => state.user.value);
  const [userReduxId, setUserReduxId] = useState("");
  useEffect(() => {
    setUserReduxId(userRedux.id);
  }, [userRedux]);
  const params = useParams();
  const defaultDataMedicine = {
    brandOwner: "",
    description: "",
    dispensed: "",
    image: "",
    ingredients: "",
    name: "",
    originCountry: "",
    price: 0,
    provider: "",
    type: "",
    usage: "",
    _id: "",
  };
  const [dataMedicine, setDataMedicine] = useState(defaultDataMedicine);
  const [dataMedicineSimilar, setDataMedicineSimilar] = useState([]);

  const [isOpenModalConfirmAddToCart, setIsOpenModalConfirmAddToCart] =
    useState(false);
  const onCloseModalConfirmAddToCart = () =>
    setIsOpenModalConfirmAddToCart(false);
  const onOpenModalConfirmAddToCart = () =>
    setIsOpenModalConfirmAddToCart(true);
  const [quantityMedicine, setQuantityMedicine] = useState(1);

  useEffect(() => {
    const fetchMedicine = async () => {
      let id = params.medicineId;
      const response = await fetch(`/api/medicine/${id}`, {
        method: "POST",
        body: JSON.stringify({
          id: params.medicineId,
        }),
      });
      if (response.ok) {
        let dataServer = await response.json();
        let object = dataServer[0];
        setDataMedicine(object);
      }
    };
    fetchMedicine();
  }, [params.medicineId]);

  const handleAddToCart = async () => {
    const obj = {
      medicine: dataMedicine,
      quantity: +quantityMedicine,
    };
    console.log(obj);

    const response = await fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({
        medicineData: obj,
        userId: userReduxId,
      }),
    });
    if (response.ok) {
      const dataServer = await response.json();
      toast.success("Successfully add medicine to cart");
      onCloseModalConfirmAddToCart();
      setQuantityMedicine(0)
    }
  };

  useEffect(() => {
    const fetchSimilarMedicine = async () => {
      let id = params.medicineId;
      const response = await fetch(`/api/medicine/similar/${id}`, {
        method: "POST",
        body: JSON.stringify({
          id: params.medicineId,
        }),
      });
      if (response.ok) {
        let dataServer = await response.json();
        setDataMedicineSimilar(dataServer);
      }
    };
    fetchSimilarMedicine();
  }, [params.medicineId]);

  return (
    <>
      <div className="w-full py-5 min-h-screen bg-gradient-to-tr from-green-200 via-white to-blue-200">
        <div className="container mx-auto flex flex-col gap-5 items-center text-black">
          <div className="bg-white rounded-md border shadow-lg p-3 grid w-full lg:grid-cols-12">
            <div className="col-span-7 flex flex-col gap-5">
              <div className="w-full bg-white p-3 flex items-center justify-center">
                <img
                  src={dataMedicine?.image}
                  className="w-full h-full object-cover border"
                ></img>
              </div>

              {/* medicine detail */}
              <div className="flex flex-col p-3 gap-3">
                <div className="text-lg font-bold">Medicine Detail</div>
                <div className="flex flex-col gap-3 ">
                  <h2 className=" font-semibold">Ingredients</h2>
                  <p className="p-2">{dataMedicine?.ingredients}</p>
                </div>
                <div className="flex flex-col gap-3 ">
                  <h2 className=" font-semibold">Usage</h2>
                  <p className="p-2">{dataMedicine?.usage}</p>
                </div>
              </div>
            </div>
            <div className="col-span-5 flex flex-col gap-5 p-3">
              <h2 className="text-xl font-bold">{dataMedicine?.name}</h2>
              <div className="flex gap-3 items-center">
                <FaCheckCircle className="text-green-500" />
                <span>Available</span>
                <span>ID: 13088</span>
              </div>
              <div className="bg-white shadow-lg border p-3 flex justify-between items-center max-sm:gap-2">
                <span className="text-red-400 max-sm:text-base text-lg font-bold flex items-center">
                  $ <span>{dataMedicine?.price}</span>/<span>pack</span>
                </span>
                <button
                  onClick={onOpenModalConfirmAddToCart}
                  className="px-3 py-2 rounded-md bg-green-600 text-white"
                >
                  Add Medicine to Cart
                </button>
              </div>
              <p className="text-sm">
                Contact Medicine Specialist for more information:{" "}
                <span className="text-blue-600">1900 1222</span> (
                <span>$1</span>/<span>min</span>)
              </p>
              <div className="bg-white shadow-lg rounded-md border p-3 flex flex-col gap-3 items-center">
                <h3 className="text-lg font-semibold">
                  <span className="text-green-400">1</span> Available Medicine
                  Store
                </h3>
                <div className="w-full flex ">
                  <p>21 Banana Hill, Haloi, Vitnam</p>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-md border p-3 flex flex-col gap-3">
                <div className="flex flex-col gap-3 ">
                  <div className="grid grid-cols-8 gap-3">
                    <div className="col-span-3">
                      <h2 className="text-lg font-semibold leading-5">Usage</h2>
                    </div>
                    <div className="col-span-5">
                      <p className="text-gray-600 ">{dataMedicine?.usage}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-8 gap-3">
                    <div className="col-span-3">
                      <h2 className="text-lg font-semibold leading-5">
                        Main Ingredients
                      </h2>
                    </div>
                    <div className="col-span-5">
                      <p className="text-gray-600 ">
                        <span className="text-blue-500">
                          {dataMedicine?.ingredients}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-8 gap-3">
                    <div className="col-span-3">
                      <h2 className="text-lg font-semibold leading-5">
                        Brand Owner
                      </h2>
                    </div>
                    <div className="col-span-5">
                      <p className="text-gray-600 ">
                        {dataMedicine?.brandOwner}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-8 gap-3">
                    <div className="col-span-3">
                      <h2 className="text-lg font-semibold leading-5">
                        Provider
                      </h2>
                    </div>
                    <div className="col-span-5">
                      <p className="text-gray-600 ">{dataMedicine?.provider}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-8 gap-3">
                    <div className="col-span-3">
                      <h2 className="text-lg font-semibold leading-5">
                        Origin (country)
                      </h2>
                    </div>
                    <div className="col-span-5">
                      <p className="text-gray-600 ">
                        {dataMedicine?.originCountry}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-8 gap-3">
                    <div className="col-span-3">
                      <h2 className="text-lg font-semibold leading-5">
                        Dispensed
                      </h2>
                    </div>
                    <div className="col-span-5">
                      <p className="text-gray-600 ">
                        {dataMedicine?.dispensed}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* similar medicines */}
          <div className="w-full my-5 bg-white p-3 border shadow-lg rounded-md">
            <h2 className="text-xl font-bold my-5">Similar Medicines</h2>
            <div className="flex gap-3 items-center overflow-x-auto">
              {dataMedicineSimilar.map((item, index) => (
                <div
                  className="rounded-md border p-3 hover:border-green-400 hover:duration-200 hover:shadow-lg hover:scale-95"
                  key={item._id}
                >
                  <div className="h-[70%]">
                    <div className="h-48 max-w-48 bg-orange-300">
                      <img
                        src={item?.image}
                        alt=""
                        className="w-full object-cover h-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col py-2">
                    <p className="text-sm">{item?.name}</p>
                    <p className="">
                      <span className="text-red-400 max-sm:text-xs font-semibold">
                        ${item?.price}
                      </span>
                      /<span>box</span>
                    </p>
                    <Link
                      href={`/medicine/${item?._id}`}
                      className="w-full bg-green-700 px-3 flex justify-center items-center rounded-md text-white py-2"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* comment section */}
          <div className="w-full my-5">
            <div className="mx-auto lg:max-w-[80%] rounded-md p-3 bg-white shadow-lg border  flex flex-col gap-3">
              <h2 className="text-lg font-bold">Comment Section</h2>

              {/* each comment */}
              <div className="">
                <div className="flex flex-col p-3">
                  <h3 className="font-semibold">user1</h3>
                  <p className="text-sm text-gray-600">
                    Can I use this medicine if I am obesed?
                  </p>
                </div>
                <div className="mx-5 p-3 flex flex-col bg-gray-300 rounded-sm">
                  <h3 className="font-semibold">
                    doctor1 (medicine specialist)
                  </h3>
                  <p className="text-sm text-gray-800">
                    Nhà thuốc An Khang xin chào anh Khoa, dạ Hỗn dịch uống
                    Gaviscon trị triệu chứng trào ngược dạ dày, thực quản (24
                    gói x 10ml) không chống chỉ định cho người có huyết áp cao,
                    mình có thể sử dụng được ạ. Em xin thông tin đến anh. Cảm ơn
                    anh đã luôn quan tâm, chúc anh nhiều sức khỏe ạ!
                  </p>
                </div>
              </div>
              <div className="">
                <div className="flex flex-col p-3">
                  <h3 className="font-semibold">user1</h3>
                  <p className="text-sm text-gray-600">
                    Can I use this medicine if I am obesed?
                  </p>
                </div>
                <div className="mx-5 p-3 flex flex-col bg-gray-300 rounded-sm">
                  <h3 className="font-semibold">
                    doctor1 (medicine specialist)
                  </h3>
                  <p className="text-sm text-gray-800">
                    Nhà thuốc An Khang xin chào anh Khoa, dạ Hỗn dịch uống
                    Gaviscon trị triệu chứng trào ngược dạ dày, thực quản (24
                    gói x 10ml) không chống chỉ định cho người có huyết áp cao,
                    mình có thể sử dụng được ạ. Em xin thông tin đến anh. Cảm ơn
                    anh đã luôn quan tâm, chúc anh nhiều sức khỏe ạ!
                  </p>
                </div>
              </div>
              <div className="">
                <div className="flex flex-col p-3">
                  <h3 className="font-semibold">user1</h3>
                  <p className="text-sm text-gray-600">
                    Can I use this medicine if I am obesed?
                  </p>
                </div>
                <div className="mx-5 p-3 flex flex-col bg-gray-300 rounded-sm">
                  <h3 className="font-semibold">
                    doctor1 (medicine specialist)
                  </h3>
                  <p className="text-sm text-gray-800">
                    Nhà thuốc An Khang xin chào anh Khoa, dạ Hỗn dịch uống
                    Gaviscon trị triệu chứng trào ngược dạ dày, thực quản (24
                    gói x 10ml) không chống chỉ định cho người có huyết áp cao,
                    mình có thể sử dụng được ạ. Em xin thông tin đến anh. Cảm ơn
                    anh đã luôn quan tâm, chúc anh nhiều sức khỏe ạ!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isOpenModalConfirmAddToCart}
        onClose={onCloseModalConfirmAddToCart}
        center
      >
        <div className="text-black p-3 flex flex-col gap-4">
          <h2 className="my-4 text-lg font-bold text-center">
            Confirm Add to Cart
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">Name: </h3>
              <span className="text-lg font-bold text-green-700">
                {dataMedicine?.name}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">Price: </h3>
              <span className="text-lg font-bold text-green-700">
                {dataMedicine?.price}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">How much do you want to buy: </h3>
              <input
                className="text-lg border rounded-lg px-3 py-1 font-bold text-green-700"
                type="number"
                value={quantityMedicine}
                onChange={(e) => setQuantityMedicine(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              onClick={handleAddToCart}
              className="px-5 py-2 bg-yellow-500 text-white rounded-md"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MedicinePage;
