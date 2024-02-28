import { connectToDB } from "../../../../../utils/database"
import Cart from "../../../../models/Cart"
import User from "../../../../models/User"
import Medicine from "../../../../models/Medicine"

export const POST = async (req, res) => {
    const { userId, price, listMedicine } = await req.json();
    // console.log(listMedicine);
    try {
        await connectToDB();
        let existingCart = await Cart.findOne({ userId: userId });

        if (existingCart) {
            for (const med of listMedicine) {
                const medicine = await Medicine.findById(med.id);
                if (medicine) {
                    if (medicine.available === undefined || medicine.available === null || medicine.available < med.quantity) {
                        // If available quantity is not sufficient, return a response
                        return new Response(
                            JSON.stringify({ error: `Not enough quantity available for ${medicine.name}` }),
                            {
                                status: 400,
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                    }
                    medicine.available -= med.quantity;
                    await medicine.save();
                }
            }

            // Filter out purchased medicines
            const remainingMedicineIds = listMedicine.map(med => med.id);
            existingCart.listMedicine = existingCart.listMedicine.filter(cartMed => {
                const medIds = cartMed.medicine.map(med => med._id.toString());
                return !remainingMedicineIds.includes(medIds[0]); // Assuming you only have one medicine in cartMed.medicine array
            });

            const existingUser = await User.findById(userId);
            if (existingUser) {
                existingUser.balance -= price;
                const newUserData = await existingUser.save();
                const updatedCart = await existingCart.save();

                if (newUserData && updatedCart) {
                    return new Response(
                        JSON.stringify({ message: "Successfully purchased products", updatedCart }),
                        {
                            status: 201,
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                }

                return new Response(
                    JSON.stringify({ error: "Failed to update user balance or cart" }),
                    {
                        status: 500,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            }

            return new Response("Cannot find user", {
                status: 404,
                code: 1,
            });
        }

        return new Response("Cart not found", {
            status: 404,
            code: 2,
        });
    } catch (e) {
        console.log(e);
        return new Response(`Failed to process request: ${e.message}`, {
            status: 500,
            code: 3,
        });
    }
};
