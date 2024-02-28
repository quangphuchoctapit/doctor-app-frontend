"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { toast } from "react-toastify";
import { deposit, withdraw } from "../redux/features/user/userSlice";

interface DataCart {
  userId: string;
  _id: string;
  listMedicine: {
    _id: string;
    quantity: number;
    medicine: { image: string; price: string; name: string }[];
  }[];
}

const Cart = () => {
  const dispatch = useDispatch()

  const userRedux = useSelector((state: RootState) => state.user.value);
  const [userBalanceRedux, setUserBalanceRedux] = useState(0);
  const [userIdRedux, setUserIdRedux] = useState("");
  const [listSelectedItem, setListSelectedItem] = useState<any>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(0)
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    setUserBalanceRedux(Math.round(userRedux.balance * 100) / 100);
    setUserIdRedux(userRedux.id);
  }, [userRedux]);
  const [listDataCart, setListDataCart] = useState<DataCart>();
  const fetchCart = async () => {
    // Check if userIdRedux is not empty
    if (userIdRedux) {
      const response = await fetch(`/api/cart/${userIdRedux}`, {
        method: "POST",
        body: JSON.stringify({
          userId: userIdRedux,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let dataServer = await response.json();        
        setListDataCart(dataServer[0]);
      }
    }
  };
  useEffect(() => {
  
    fetchCart();
  }, [userIdRedux]);

  const handleAddSelectedItem = (newItem:any) => {
    const listSelectedItemCopy = [...listSelectedItem]
    if (listSelectedItemCopy.some(item => item === newItem)) {
        setListSelectedItem(listSelectedItemCopy.filter(item => item !== newItem))
    } else {
        setListSelectedItem([...listSelectedItemCopy, newItem])
    }
  }

  useEffect(() => {
    // const obj = {price: 0, quantity: 0}
    const price  = listSelectedItem?.map(item => item?.medicine[0]?.price)
    const quantity = listSelectedItem?.map(item => item?.quantity)
    let result = 0
    for (let i = 0 ; i < price.length; i++) {
      result += price[i] * quantity[i]
    }
    setTotalPrice(result)
    setTotalPriceAfterDiscount(result - discount)
  }, [listSelectedItem])

  const handleCheckout = async () => {
    if (userBalanceRedux >=  totalPriceAfterDiscount) {
      const listMedicineId = listSelectedItem?.map(item => {return ({
        id: item?.medicine[0]?._id,
        quantity: item?.quantity
      })})
      const response = await fetch(`/api/cart/checkout`, {
        method: 'POST',
        body: JSON.stringify({
          listMedicine: listMedicineId,
          userId: userIdRedux,
          price: totalPriceAfterDiscount
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.ok) {
        toast.success('Succefully purchased product')
        dispatch(withdraw({ammount: totalPriceAfterDiscount}))
        await fetchCart()
      }
    } else {
      toast.warning('Your balance is not sufficient to purchase!!!')
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-purple-200 to-cyan-200 via-white">
      <div className="flex flex-col gap-5 items-center text-black">
        <div className="p-3 rounded-md border shadow-lg bg-white my-5">
          <h3 className=" text-xl font-bold text-center">My Cart</h3>
          <h3 className=" text-xl font-semibold text-center my-3 w-full flex">
            My balance: $
            <span className="text-green-700 font-bold">{userBalanceRedux}</span>
          </h3>

          <div className="mx-5 flex flex-col md:grid md:grid-cols-2 gap-5 my-5">
            {/* <div className="scale-95 rounded-lg shadow-md shadow-green-700 border-2 border-green-300 min-w-[250px] sm:min-w-[300px] text-black p-3 ">
              <div className="flex items-center gap-3">
                <div className="basis-1/4">
                  <div className="w-12 h-12 border flex items-center justify-center">
                    item
                  </div>
                </div>
                <div className="basis-3/4 flex justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">Eye Medicine</h3>
                    <p className="text-sm text-gray-400">
                      Quantity: <span>1</span>
                    </p>
                    <h3 className="text-bold">
                      $<span>12</span>
                    </h3>
                  </div>
                  <div className="">X</div>
                </div>
              </div>
            </div> */}
            {listDataCart?.listMedicine?.length > 0 &&
              listDataCart?.listMedicine?.map((item) => (
                <div
                  key={item._id} onClick={() => handleAddSelectedItem(item)}
                  className={listSelectedItem?.some(itemData => itemData === item) ? "scale-95 rounded-lg shadow-md shadow-green-700 border-2 bg-gray-50 border-green-300 min-w-[250px] sm:min-w-[300px] text-black p-3 " : "scale-95 rounded-lg border-2 bg-gray-50  min-w-[250px] sm:min-w-[300px] text-black p-3 "}
                >
                  <div className="flex items-center gap-3">
                    <div className="basis-1/4">
                      <div className="w-12 h-12 border flex items-center justify-center">
                        <img src={item.medicine[0]?.image} className="w-full h-full object-cover" alt="" />
                      </div>
                    </div>
                    <div className="basis-3/4 flex justify-between">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold">{item?.medicine[0].name}</h3>
                        <p className="text-sm text-gray-400">
                          Quantity: <span>{item?.quantity}</span>
                        </p>
                        <h3 className="text-bold">
                          $<span>{item?.medicine[0]?.price}</span>
                        </h3>
                      </div>
                      <div className="">X</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="bg-white rounded-md shadow-lg lg:my-5 p-3 border flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Price Details</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total product price</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total discounts</span>
              <span>${discount}</span>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Order Total</h3>
              <span className="font-bold text-green-800">${totalPriceAfterDiscount}</span>
            </div>
              <div onClick={handleCheckout} className="w-full bg-green-600 flex justify-center text-white py-3 rounded-md">
                Check Out
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
