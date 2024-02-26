import { connectToDB } from "../../../../utils/database";
import Cart from "../../../models/Cart";

export const POST = async (req, res) => {
  const { medicineData, userId } = await req.json();

  try {
    await connectToDB();

    // Find the user's cart by userId
    let existingCart = await Cart.findOne({ userId: userId });

    if (!existingCart) {
      // If user's cart doesn't exist, create a new one
      existingCart = new Cart({
        userId: userId,
        listMedicine: [],
      });
    }

    // Check if listMedicine is null or undefined
    if (!existingCart.listMedicine) {
      existingCart.listMedicine = [];
    }

    // Check if medicineData already exists in listMedicine
    const existingMedicine = existingCart.listMedicine.find(item => {
      if (item && item.medicine) {
        return item.medicine.some(med => med.name === medicineData.medicine.name);
      }
      return false;
    });
    console.log('existingMedicine', existingMedicine);
    if (existingMedicine) {
      // If medicineData exists, update its quantity
      existingMedicine.quantity += medicineData.quantity;
    } else {
      // If medicineData doesn't exist, add it to the listMedicine array
      existingCart.listMedicine.push({
        medicine: {
          ...medicineData.medicine
        },
        quantity: medicineData.quantity
      });
    }

    // Save the updated user with the modified listMedicine
    const updateResult = await existingCart.save();

    if (updateResult) {
      return new Response(
        JSON.stringify({ message: "Cart updated successfully" }),
        {
          status: 201,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Cannot update cart" }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({ error: "Failed to update cart" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
