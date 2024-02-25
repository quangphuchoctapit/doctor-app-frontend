"use client";
import { RootState } from "@/app/redux/Store";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCreditCard } from "react-icons/fa";
import { GiBank } from "react-icons/gi";
import { toast } from "react-toastify";
import { deposit } from "@/app/redux/features/user/userSlice";

const moneyAmmount = [
    {id: 50, label: 50},
    {id: 100, label: 100},
    {id: 150, label: 150},
    {id: 200, label: 200},
    {id: 500, label: 500},
    {id: 1000, label: 1000},
]

const page = () => {
  const params = useParams();
  const dispatch = useDispatch()
  const userRedux = useSelector((state: RootState) => state.user.value);
  const [userReduxData, setUserReduxData] = useState<{
    email: string;
    id: string;
    role: string;
    image: string;
    username: string;
    gender: string;
    balance: number;
  }>();
  useEffect(() => {
    setUserReduxData(userRedux);
  }, [userRedux]);

  const [ammount, setAmmount] = useState(0)
  const handleDeposit = async () => {
    const response = await fetch(`/api/user/balance/deposit`, {
      method: "POST",
      body: JSON.stringify({
        userId: userRedux.id,
        ammount: ammount
      }),
    })
    if (response.ok) {
      toast.success('Succesfully desposited balance')
      dispatch(deposit({ammount}))
    }
    
  }
  // console.log(userReduxData);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-200 to-violet-200">
      <div className="container mx-auto flex flex-col gap-5 text-black">
        <div className="mx-auto grid grid-cols-2 gap-3 py-5">
          <div className="col-span-2 text-center text-2xl font-bold ">
            Choose payment method:
          </div>
          <div className="col-span-2 text-lg flex gap-1 items-center">
            <p>My Balance: </p>{" "}
            <span className="text-green-700 font-extrabold">
              {userReduxData?.balance}
            </span>
          </div>
          <div className="bg-gray-200 p-3 gap-3 hover:duration-300 hover:scale-95 hover:bg-gray-300 hover:border-red-500 hover:border flex items-center rounded-md border">
            <div className="min-w-16 h-16 border bg-red-200 flex items-center justify-center text-red-600">
              <FaRegCreditCard size={30} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Debit Card</h3>
              <p className="text-sm ">
                Deposit and invest right in your debit Card
              </p>
            </div>
          </div>
          <div className="bg-gray-200 p-3 gap-3 hover:duration-300 hover:scale-95 hover:bg-gray-300 hover:border-red-500 hover:border flex items-center rounded-md border">
            <div className="min-w-16 h-16 border bg-red-200 flex items-center justify-center text-red-600">
              <GiBank size={30} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Bank Account</h3>
              <p className="text-sm ">
                Connect your bank account to deposit and withdraw funds
              </p>
            </div>
          </div>
        </div>
            <h3 className="w-full text-xl font-bold">How much do you want to transfer?</h3>
        <div className="mx-auto grid grid-cols-3 gap-3 py-3">
            {moneyAmmount?.length > 0 &&
                moneyAmmount?.map((item:any) => (
                    <div onClick={() => setAmmount(item.id)} className="px-5 py-2 hover:duration-200 hover:border-red-500 hover:border hover:bg-white rounded-md bg-slate-300 text-black font-semibold flex items-center justify-center" key={item.id}>${item.label}</div>
                ))
            }
        </div>
        <div className="w-full flex items-center justify-center">
        <button onClick={handleDeposit} className="bg-red-600 text-white rounded-md px-8 py-2 flex items-center justify-center">Deposit</button>
        </div>
      </div>
    </div>
  );
};

export default page;
