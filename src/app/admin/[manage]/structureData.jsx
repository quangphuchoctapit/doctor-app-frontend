import { useState, useEffect } from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Select from 'react-select'
// import { handleFileChange } from '../../../../utils/imageUtils'

const displayTableHeader = (value, isAdmin) => {
    switch (value) {
        case 'users':
            return (
                <tr className="font-semibold uppercase">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    {isAdmin &&
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    }
                    {isAdmin &&
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    }
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                </tr>
            )
        case 'doctors':
            return (
                <tr className="uppercase font-semibold">
                    <td className="px-6 py-4 whitespace-nowrap">Image</td>
                    <td className="px-6 py-4 whitespace-nowrap">ID</td>
                    <td className="px-6 py-4 whitespace-nowrap">name</td>
                    <td className="px-6 py-4 whitespace-nowrap">email</td>
                    <td className="px-6 py-4 whitespace-nowrap">Specialty</td>
                    <td className="px-6 py-4 whitespace-nowrap">Price</td>
                    <td className="px-6 py-4 whitespace-nowrap">Total Patients</td>
                    <td className="px-6 py-4 whitespace-nowrap">Description</td>
                    <td className="px-6 py-4 whitespace-nowrap">Location</td>
                    <td className="px-6 py-4 whitespace-nowrap">Clinic</td>
                </tr>
            )
        case 'medicines':
            return (
                <tr className="uppercase font-semibold">
                    <td className="px-6 py-4 whitespace-nowrap">Image</td>
                    <td className="px-6 py-4 whitespace-nowrap">ID</td>
                    <td className="px-6 py-4 whitespace-nowrap">name</td>
                    <td className="px-6 py-4 whitespace-nowrap">type</td>
                    <td className="px-6 py-4 whitespace-nowrap">Price</td>
                    <td className="px-6 py-4 whitespace-nowrap">unit</td>
                    <td className="px-6 py-4 whitespace-nowrap">available</td>
                    <td className="px-6 py-4 whitespace-nowrap">ingredients</td>
                    <td className="px-6 py-4 whitespace-nowrap">description</td>
                    <td className="px-6 py-4 whitespace-nowrap">usage</td>
                    <td className="px-6 py-4 whitespace-nowrap">dispensed</td>
                    <td className="px-6 py-4 whitespace-nowrap">origin (country)</td>
                    <td className="px-6 py-4 whitespace-nowrap">brand owner</td>
                    <td className="px-6 py-4 whitespace-nowrap">Provider</td>
                </tr>
            )
        case 'clinics':
            return (
                <tr className="uppercase font-semibold">
                    <td className="px-6 py-4 whitespace-nowrap">Image</td>
                    <td className="px-6 py-4 whitespace-nowrap">ID</td>
                    <td className="px-6 py-4 whitespace-nowrap">name</td>
                    <td className="px-6 py-4 whitespace-nowrap">available</td>
                    <td className="px-6 py-4 whitespace-nowrap">Total doctors</td>
                    <td className="px-6 py-4 whitespace-nowrap">brand owner</td>
                    <td className="px-6 py-4 whitespace-nowrap">Location</td>
                </tr>
            )
        case 'specialties':
            return (
                <tr className="uppercase font-semibold">
                    <td className="px-6 py-4 whitespace-nowrap">Image</td>
                    <td className="px-6 py-4 whitespace-nowrap">ID</td>
                    <td className="px-6 py-4 whitespace-nowrap">name</td>
                    <td className="px-6 py-4 whitespace-nowrap">Total doctors</td>
                </tr>
            )
    }
}

const DisplayTableContent = ({ value, onOpenModalUserAction, dataTable, isAdmin }) => {
    const [isOpenModalSetRoleUser, setIsOpenModalSetRoleUser] = useState(false)
    const onCloseModalSetRoleUser = () => setIsOpenModalSetRoleUser(false)
    const onOpenModalSetRoleUser = () => setIsOpenModalSetRoleUser(true)
    const [currentSetRoleUser, setCurrentSetRoleUser] = useState('')
    const [selectedRole, setSelectedRole] = useState(''); // State to store the selected radio button value
    const [dataSpecialties, setDataSpecialties] = useState([])
    const [dataLocations, setDataLocations] = useState([])
    const [dataClinics, setDataClinics] = useState([])
    const [dataPrices, setDataPrices] = useState([
        { value: 50, label: 50 },
        { value: 100, label: 100 },
        { value: 200, label: 200 },
        { value: 500, label: 500 },
        { value: 1000, label: 1000 },
        { value: 1500, label: 1500 }
    ])

    // Function to handle radio button click
    const handleRadioChangeUserRole = (event) => {
        setSelectedRole(event.target.value); // Update the state with the selected radio button value
    };

    // change user role
    const handleChangeUserRole = async () => {
        fetch(`/api/user/role/${currentSetRoleUser}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ userId: currentSetRoleUser, newRole: selectedRole }) // Convert data to JSON format
        })
            .then(response => {
                // Check if the response status is ok (2xx)
                if (response.ok) {
                    console.log('User role updated successfully');
                    // Handle successful response
                } else {
                    console.error('Error updating user role:', response.statusText);
                    // Handle error response
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                // Handle network error
            });
    }

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

    // fetch all specialties, locations and assign it to options in react-select
    useEffect(() => {
        const specialtiesData = buildDataOptions('specialties')
        const clinicsData = buildDataOptions('clinics')
        const locationsData = buildDataOptions('locations')
        setDataSpecialties(specialtiesData)
        setDataLocations(locationsData)
        setDataClinics(clinicsData)
    }, [dataTable])


    switch (value) {
        case 'users':
            return (
                <>
                    {dataTable?.users?.map((item, index) => (
                        <tr key={item._id}>
                            <td className=" w-16 h-16">
                                <img src={item?.image ? item.image : (item?.gender === 'male' ? '/user/avatar/user-male.png' : '/user/avatar/user-female.png')} className='w-full h-full object-cover' />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.username}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.email}</td>
                            {isAdmin &&
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className='underline text-green-800 font-semibold' onClick={() => { onOpenModalSetRoleUser(); setCurrentSetRoleUser(item._id) }}>{item?.role}</button>
                                </td>
                            }
                            {isAdmin &&
                                <td className="max-sm:w-full flex items-center py-2 px-2 justify-center border border-transparent text-sm font-medium translate-y-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={onOpenModalUserAction}>
                                    <button className="">Set Action</button>
                                </td>
                            }
                            <td className="px-6 py-4 whitespace-nowrap">{item.location || 'Unset yet'}</td>
                        </tr>
                    ))}
                    <Modal open={isOpenModalSetRoleUser} onClose={onCloseModalSetRoleUser} center>
                        <div className="text-black p-3 flex flex-col gap-4">
                            <h2 className='my-4 text-lg font-bold text-center'>Set User Role</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="D"
                                        checked={selectedRole === 'D'}
                                        onChange={handleRadioChangeUserRole}
                                    />
                                    <span className="ml-2">Doctor</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="SA"
                                        checked={selectedRole === 'SA'}
                                        onChange={handleRadioChangeUserRole}
                                    />
                                    <span className="ml-2">Admin</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="P"
                                        checked={selectedRole === 'P'}
                                        onChange={handleRadioChangeUserRole}
                                    />
                                    <span className="ml-2">Patient</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="PH"
                                        checked={selectedRole === 'PH'}
                                        onChange={handleRadioChangeUserRole}
                                    />
                                    <span className="ml-2">Pharmacist</span>
                                </label>
                                <div className='col-span-4 my-3'>
                                    <button onClick={handleChangeUserRole} className='text-center px-5 py-2 text-white bg-green-600 rounded-md hover:duration-200 hover:bg-green-800 cursor-pointer'>Change</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </>
            )
        case 'doctors':
            const [isOpenModalEditDoctor, setIsOpenModalEditDoctor] = useState(false)
            const onOpenModalEditDoctor = () => setIsOpenModalEditDoctor(true)
            const onCloseModalEditDoctor = () => setIsOpenModalEditDoctor(false)
            const [currentSelectedDoctorId, setCurrentSelectedDoctorId] = useState('')
            const [doctorDescription, setDoctorDescription] = useState('')
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
            const handleChangeDoctorDescription = (e) => {
                setDoctorDescription(e)
            }
            const [selectedSpecialtyModalDoctorInfo, setSelectedSpecialtyModalDoctorInfo] = useState('')
            const [selectedLocationModalDoctorInfo, setSelectedLocationModalDoctorInfo] = useState('')
            const [selectedClinicModalDoctorInfo, setSelectedClinicModalDoctorInfo] = useState('')
            const [selectedPriceModalDoctorInfo, setSelectedPriceModalDoctorInfo] = useState('')

            const handleChangeSelectedSpecialtyModalDoctorInfo = (selectedOption) => {
                setSelectedSpecialtyModalDoctorInfo(selectedOption)
            }
            const handleChangeSelectedLocationModalDoctorInfo = (selectedOption) => {
                setSelectedLocationModalDoctorInfo(selectedOption)
            }
            const handleChangeSelectedClinicModalDoctorInfo = (selectedOption) => {
                setSelectedClinicModalDoctorInfo(selectedOption)
            }
            const handleChangeSelectedPriceModalDoctorInfo = (selectedOption) => {
                setSelectedPriceModalDoctorInfo(selectedOption)
            }

            const handleChangeDoctorInfo = async () => {
                let response = await fetch(`/api/doctor-info/new-or-update`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            doctorId: currentSelectedDoctorId,
                            locationId: selectedLocationModalDoctorInfo.value,
                            specialtyId: selectedSpecialtyModalDoctorInfo.value,
                            description: doctorDescription, price: selectedPriceModalDoctorInfo.value,
                            clinicId: selectedClinicModalDoctorInfo.value,
                        })
                    }
                )
                let dataServer = await response.json()
                console.log(dataServer)
            }

            return (
                <>
                    {dataTable.doctors.map((item, index) => (
                        <tr onClick={() => { onOpenModalEditDoctor(), setCurrentSelectedDoctorId(item._id) }} key={item._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={item.image} alt={item.name} className='w-8 h-8 object-cover' />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.username || 'doctor name'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.email || 'doctor email'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.doctorInfo?.specialty?.name || 'doctor specialty'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.doctorInfo?.price || 'doctor price per hour'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.totalPatient || 'total patient'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.doctorInfo?.description || 'doctor description'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.doctorInfo?.location?.cityName || 'doctor location'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.doctorInfo?.clinic?.name || 'doctor clinic'}</td>

                        </tr>
                    ))}
                    <Modal open={isOpenModalEditDoctor} onClose={onCloseModalEditDoctor} center>
                        <div className="text-black p-3 flex flex-col gap-4">
                            <h2 className='my-4 text-lg font-bold text-center'>Set Doctor Info</h2>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="">Doctor Specialty</label>
                                    <Select options={dataSpecialties} value={selectedSpecialtyModalDoctorInfo} onChange={handleChangeSelectedSpecialtyModalDoctorInfo} />
                                    {/* <input type="text" placeholder='image' className='px-4 py-2 rounded-md outline-none border ' /> */}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="">Doctor Description</label>
                                    <textarea value={doctorDescription} onChange={e => handleChangeDoctorDescription(e.target.value)} placeholder='description' className='px-4 py-2 rounded-md outline-none border ' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="">Doctor Location</label>
                                    <Select options={dataLocations} value={selectedLocationModalDoctorInfo} onChange={handleChangeSelectedLocationModalDoctorInfo} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="">Doctor Clinic</label>
                                    <Select options={dataClinics} value={selectedClinicModalDoctorInfo} onChange={handleChangeSelectedClinicModalDoctorInfo} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="">Doctor Price</label>
                                    <Select options={dataPrices} value={selectedPriceModalDoctorInfo} onChange={handleChangeSelectedPriceModalDoctorInfo} />
                                </div>
                                <div className='col-span-4 my-3'>
                                    <button onClick={handleChangeDoctorInfo} className='text-center px-5 py-2 text-white bg-green-600 rounded-md hover:duration-200 hover:bg-green-800 cursor-pointer'>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </>
            )
        case 'medicines':
            return (
                <>
                    {dataTable.medicines.map((item, index) => (
                        <tr key={item._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={item.image} alt={item.name} className='w-8 h-8 object-cover' />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.name || 'name'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.type || 'type medicien'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.price || 'price'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.unit || 'box'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.available || '2188'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.ingredients || 'Calci Carbonat, Natri bicarbonat, Natri alginate'}</td>
                            <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-overflow-ellipsis max-w-xs ">{item?.description || 'Điều trị các triệu chứng của trào ngược dạ dày - thực quản như ợ nóng, khó tiêu và ợ chua liên quan đến sự trào ngược như sau bữa ăn, hoặc trong khi mang thai, hoặc trên những bệnh nhân có các triệu chứng liên quan với viêm thực quản do trào ngược.'}</td>
                            <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-overflow-ellipsis max-w-xs ">{item?.usage || 'Điều trị các triệu chứng của trào ngược dạ dày - thực quản như ợ nóng, khó tiêu và ợ chua liên quan đến sự trào ngược như sau bữa ăn, hoặc trong khi mang thai, hoặc trên những bệnh nhân có các triệu chứng liên quan với viêm thực quản do trào ngược.'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.dispensed || 'blended liquid'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.originCountry || 'England'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.brandOwner || 'Reckitt Benckiser (England)'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.provider || 'England'}</td>
                        </tr>
                    ))}
                </>
            )
        case 'clinics':
            return (
                <>
                    {dataTable?.clinics?.map((item, index) => (
                        <tr key={item._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={item.image} alt={item.name} className='w-8 h-8 object-cover' />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.available || 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.totalDoctors || 9}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.brandOwner || 'tommy le'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.location || 'sai gon'}</td>
                        </tr>
                    ))}
                </>
            )
        case 'specialties':
            return (
                <>
                    {dataTable?.specialties?.map((item, index) => (
                        <tr key={item._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={item.image} alt={item.name} className='w-8 h-8 object-cover' />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.totalDoctors || 888}</td>
                        </tr>
                    ))}
                </>
            )
    }
}


// modal add new
const DisplayModalAddNew = ({ value, isAdmin, dataTable }) => {
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
        const dataServer = await response.json()
    }

    const handleAddClinic = async () => {
        const response = await fetch(`/api/clinic/new`, {
            method: "POST",
            body: JSON.stringify({
                description, image: base64String, name, location, brandOwner, type: selectedSpecialtyModalDoctorInfo.value
            }),
        });
        const dataServer = await response.json()
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
        const dataServer = await response.json()
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

export { displayTableHeader, DisplayTableContent, DisplayModalAddNew }
