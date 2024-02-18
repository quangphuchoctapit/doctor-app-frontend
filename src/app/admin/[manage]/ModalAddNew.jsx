'use client'
import { useState, useEffect } from 'react'
// modal add new
const DisplayModalAddNew = ({ value, isAdmin, dataTable, close, refetch }) => {
    const [selectedFileImage, setSelectedFileImage] = useState(null);
    const [base64String, setBase64String] = useState('');
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the first selected file
        setSelectedFileImage(file); // Store the file object in state
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                setBase64String(base64); // Store the base64 string in state
            };
            reader.readAsDataURL(file); // Convert the file to base64
        }
    };


    const [dataInput, setDataInput] = useState({
        id: '',
        image: '',
        name: '',
        location: '',
        description: '',
        available: 0,
        totalDoctors: 0,
        brandOwner: '',
        usage: '',
        type: '',
        unit: '',
        price: 0,
        ingredients: [],
        dispensed: '',
        originCountry: '',
        provider: ''
    })

    const [dataSpecialties, setDataSpecialties] = useState([])
    // build data for react-select
    const buildDataOptions = (value) => {
        const options = []
        const dataFirstForm = dataTable[value].map((item, index) => {
            const obj = { value: '', label: '' }
            obj.value = item._id
            if (item.cityName) {
                obj.label = item.cityName
            } else {
                obj.label = item.name
            }
            return options.push(obj)
        })
        return options
    }
    const [selectedSpecialtyModalDoctorInfo, setSelectedSpecialtyModalDoctorInfo] = useState('')

    const handleChangeSelectedSpecialtyModalDoctorInfo = (selectedOption) => {
        setSelectedSpecialtyModalDoctorInfo(selectedOption)
    }

    // fetch all specialties, locations and assign it to options in react-select
    useEffect(() => {
        const specialtiesData = buildDataOptions('specialties')
        setDataSpecialties(specialtiesData)
    }, [])


    const { description, image, type, name, location, unit, price, ingredients,
        dispensed, originCountry, provider, totalDoctors, brandOwner, usage,
        available } = dataInput

    const handleAddSpecialty = async () => {
        const response = await fetch(`/api/specialty/new`, {
            method: "POST",
            body: JSON.stringify({
                description, image: base64String, name
            }),
        });
        if (response.ok) {
            const dataServer = await response.json()
            refetch.specialties()
            close()
        }
    }

    const handleAddClinic = async () => {
        const response = await fetch(`/api/clinic/new`, {
            method: "POST",
            body: JSON.stringify({
                description, image: base64String, name, location, brandOwner, type: selectedSpecialtyModalDoctorInfo.value
            }),
        });
        if (response.ok) {
            const dataServer = await response.json()
            refetch.clinics()
            close()
        }
    }

    const handleAddMedicine = async () => {
        const response = await fetch(`/api/medicine/new`, {
            method: "POST",
            body: JSON.stringify({
                name, image: base64String, price, description,
                brandOwner, usage, dispensed,
                originCountry, provider, ingredients,
                type, unit
            }),
        });
        if (response.ok) {
            const dataServer = await response.json()
            refetch.medicines()
            close()
        }
    }

    const handleOnChangeInput = (e, value) => {
        setDataInput(prevState => ({
            ...prevState,
            [value]: e
        }));
    }

    switch (value) {
        case 'medicines':

            return (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="doctorImage" className="text-gray-600">Doctor Image</label>
                            <div className="relative">
                                <input type="file" id="doctorImage" accept="image/*" className='hidden' onChange={handleFileChange} />
                                <label htmlFor="doctorImage" className="bg-white rounded-md px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-50 focus:outline-none focus:border-blue-500">
                                    <span className="text-sm text-gray-500">Choose Image</span>
                                </label>
                            </div>
                            {selectedFileImage && (
                                <div className='pt-1'>
                                    <p className='text-xs'>Selected file: {selectedFileImage.name}</p>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Name</label>
                            <input onChange={e => handleOnChangeInput(e.target.value, 'name')} value={dataInput.name} type="text" placeholder='name' className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Price</label>
                            <input onChange={e => handleOnChangeInput(e.target.value, 'price')} value={dataInput.price} type="text" placeholder='price' className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Description</label>
                            <textarea placeholder='description' value={dataInput.description} onChange={e => handleOnChangeInput(e.target.value, 'description')} className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Brand Owner</label>
                            <input onChange={e => handleOnChangeInput(e.target.value, 'brandOwner')} value={dataInput.brandOwner} type="text" placeholder='brand owner' className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Usage</label>
                            <input onChange={e => handleOnChangeInput(e.target.value, 'usage')} value={dataInput.usage} type="text" placeholder='usage' className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Dispensed</label>
                            <input onChange={e => handleOnChangeInput(e.target.value, 'dispensed')} value={dataInput.dispensed} type="text" placeholder='dispensed' className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Origin (country)</label>
                            <input onChange={e => handleOnChangeInput(e.target.value, 'originCountry')} value={dataInput.originCountry} type="text" placeholder='origin (country)' className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Provider</label>
                            <input onChange={e => handleOnChangeInput(e.target.value, 'provider')} value={dataInput.provider} type="text" placeholder='provider' className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Ingredients</label>
                            <input onChange={e => handleOnChangeInput(e.target.value, 'ingredients')} value={dataInput.ingredients} type="text" placeholder='ingredients' className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Medicine type</label>
                            <Select options={dataSpecialties} value={selectedSpecialtyModalDoctorInfo} onChange={handleChangeSelectedSpecialtyModalDoctorInfo} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Unit package</label>
                            <input onChange={e => handleOnChangeInput(e.target.value, 'unit')} value={dataInput.unit} type="text" placeholder='unit package' className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="col-span-3 flex justify-end">
                            <button onClick={handleAddMedicine} className='px-5 py-2 rounded-lg bg-green-600 hover:duration-200 hover:bg-green-700 text-white border'>Add</button>
                        </div>
                    </div>
                </>
            )
        case 'clinics':
            return (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="doctorImage" className="text-gray-600">Doctor Image</label>
                            <div className="relative">
                                <input type="file" id="doctorImage" accept="image/*" className='hidden' onChange={handleFileChange} />
                                <label htmlFor="doctorImage" className="bg-white rounded-md px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-50 focus:outline-none focus:border-blue-500">
                                    <span className="text-sm text-gray-500">Choose Image</span>
                                </label>
                            </div>
                            {selectedFileImage && (
                                <div className='pt-1'>
                                    <p className='text-xs'>Selected file: {selectedFileImage.name}</p>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Name</label>
                            <input value={dataInput.name} onChange={e => handleOnChangeInput(e.target.value, 'name')} type="text" placeholder='name' className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Description</label>
                            <textarea value={dataInput.description} onChange={e => handleOnChangeInput(e.target.value, 'description')} placeholder='description' className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Brand Owner</label>
                            <input type="text" placeholder='brand owner' value={dataInput.brandOwner} onChange={e => { handleOnChangeInput(e.target.value, 'brandOwner') }} className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Location</label>
                            <input onChange={e => handleOnChangeInput(e.target.value, 'location')} value={dataInput.location} type="text" placeholder='location' className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="col-span-3 flex justify-end">
                            <button onClick={handleAddClinic} className='px-5 py-2 rounded-lg bg-green-600 hover:duration-200 hover:bg-green-700 text-white border'>Add</button>
                        </div>
                    </div>
                </>
            )
        case 'specialties':
            return (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="doctorImage" className="text-gray-600">Doctor Image</label>
                            <div className="relative">
                                <input type="file" id="doctorImage" accept="image/*" className='hidden' onChange={handleFileChange} />
                                <label htmlFor="doctorImage" className="bg-white rounded-md px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-50 focus:outline-none focus:border-blue-500">
                                    <span className="text-sm text-gray-500">Choose Image</span>
                                </label>
                            </div>
                            {selectedFileImage && (
                                <div className='pt-1'>
                                    <p className='text-xs'>Selected file: {selectedFileImage.name}</p>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Name</label>
                            <input value={dataInput.name} onChange={e => handleOnChangeInput((e.target.value), 'name')} type="text" placeholder='name' className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="flex flex-col col-span-3 gap-1">
                            <label htmlFor="">Description</label>
                            <textarea value={dataInput.description} onChange={e => handleOnChangeInput(e.target.value, 'description')} placeholder='description' className='w-full px-3 py-1 rounded border' />
                        </div>
                        <div className="col-span-3 flex justify-end">
                            <button onClick={handleAddSpecialty} className='px-5 py-2 rounded-lg bg-green-600 hover:duration-200 hover:bg-green-700 text-white border'>Add</button>
                        </div>
                    </div>
                </>

            )
    }
}

export { DisplayModalAddNew }