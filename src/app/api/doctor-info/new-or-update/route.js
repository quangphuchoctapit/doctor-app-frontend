import { connectToDB } from "../../../../../utils/database"
import DoctorInfo from "../../../../models/DoctorInfo"
export const POST = async (req, res) => {
    const { doctorId, locationId, description, price, clinicId, specialtyId, listSchedule } = await req.json();
    try {
        await connectToDB();
        const existingDoctorInfo = await DoctorInfo.findOne({ doctorId: doctorId });

        if (existingDoctorInfo) {
            // If listSchedule length in the input is less than the one in the database
            if (listSchedule.length < existingDoctorInfo.listSchedule.length) {
                // Filter out the listSchedule items from the database that are also in the input
                const updatedListSchedule = existingDoctorInfo.listSchedule.filter(existingItem =>
                    listSchedule.some(inputItem => inputItem.date === existingItem.date)
                );

                // Update operations excluding listSchedule
                const updateResult = await DoctorInfo.findOneAndUpdate(
                    { doctorId: doctorId },
                    {
                        $set: {
                            locationId: locationId,
                            description: description,
                            price: price,
                            clinicId: clinicId,
                            specialtyId: specialtyId,
                            listSchedule: updatedListSchedule // Update with the filtered listSchedule
                        }
                    },
                    { upsert: true, returnOriginal: false }
                );

                if (updateResult) {
                    return new Response(JSON.stringify('Doctor info updated successfully'), {
                        status: 201
                    });
                }
            }
        }

        // If no existing document or conditions not met, perform a normal update
        const updateOrCreateDoctorInfo = await DoctorInfo.findOneAndUpdate(
            { doctorId: doctorId },
            { $set: { locationId, description, price, clinicId, specialtyId, listSchedule } },
            { upsert: true, returnOriginal: false }
        );

        if (updateOrCreateDoctorInfo) {
            return new Response(JSON.stringify('Doctor info created/updated successfully'), {
                status: 201
            });
        }

        return new Response(JSON.stringify('Cannot update doctor info'), {
            status: 201
        });
    } catch (e) {
        console.log(e);
        return new Response('Failed to create/update DoctorInfo', {
            status: 500
        });
    }
};
