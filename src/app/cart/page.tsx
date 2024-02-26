'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';

const Cart = () => {
    const userRedux = useSelector((state: RootState) => state.user.value);
    const [userBalanceRedux, setUserBalanceRedux] = useState(0);
    const [userIdRedux, setUserIdRedux] = useState('');

    useEffect(() => {
        setUserBalanceRedux(userRedux.balance);
        setUserIdRedux(userRedux.id);
    }, [userRedux]);

    useEffect(() => {
        const fetchCart = async () => {
            // Check if userIdRedux is not empty
            if (userIdRedux) {
                const response = await fetch(`/api/cart/${userIdRedux}`, {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userIdRedux
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    let dataServer = await response.json();
                    console.log(dataServer);
                }
            }
        }
        fetchCart();
    }, [userIdRedux])

    return (
        <div className='w-full min-h-screen bg-gradient-to-tr from-purple-200 to-cyan-200 via-white'>
            <div className="flex flex-col gap-5 items-center text-black">
                <div className="p-3 rounded-md border shadow-lg bg-white my-5">
                    <h3 className=' text-xl font-bold text-center'>My Cart</h3>
                    <h3 className=' text-xl font-semibold text-center my-3 w-full flex'>My balance: $<span className='text-green-700 font-bold'>{userBalanceRedux}</span></h3>

                    <div className="lg:grid grid-cols-2">
                        <div className="mx-5 flex flex-col gap-5 my-5">
                            <div className="scale-95 rounded-lg shadow-md shadow-green-700 border-2 border-green-300 min-w-[250px] sm:min-w-[300px] text-black p-3 ">
                                <div className="flex items-center gap-3">
                                    <div className="basis-1/4">
                                        <div className="w-12 h-12 border flex items-center justify-center">item</div>
                                    </div>
                                    <div className="basis-3/4 flex justify-between">
                                        <div className="flex flex-col gap-1">
                                            <h3 className='font-semibold'>Eye Medicine</h3>
                                            <p className='text-sm text-gray-400'>Quantity: <span>1</span></p>
                                            <h3 className='text-bold'>$<span>12</span></h3>
                                        </div>
                                        <div className="">X</div>
                                    </div>
                                </div>
                            </div>
                            <div className=" rounded-lg border-2 min-w-[250px] sm:min-w-[300px] text-black p-3 ">
                                <div className="flex items-center gap-3">
                                    <div className="basis-1/4">
                                        <div className="w-12 h-12 border flex items-center justify-center">item</div>
                                    </div>
                                    <div className="basis-3/4 flex justify-between">
                                        <div className="flex flex-col gap-1">
                                            <h3 className='font-semibold'>Eye Medicine</h3>
                                            <p className='text-sm text-gray-400'>Quantity: <span>1</span></p>
                                            <h3 className='text-bold'>$<span>12</span></h3>
                                        </div>
                                        <div className="">X</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-md shadow-lg lg:my-5 p-3 border flex flex-col gap-3">
                            <h3 className='text-lg font-semibold'>Price Details</h3>
                            <div className="flex justify-between items-center">
                                <span className='text-gray-400'>Total product price</span>
                                <span>$12</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className='text-gray-400'>Total discounts</span>
                                <span>$1</span>

                            </div>
                            <div className="flex justify-between items-center">
                                <h3 className='text-lg font-bold'>Order Total</h3>
                                <span className='font-bold text-green-800'>$11</span>
                            </div>
                            <Link href='/orders' className="w-full flex items-center justify-center">
                                <div className='w-full bg-green-600 flex justify-center text-white py-3 rounded-md'>Continue</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;
