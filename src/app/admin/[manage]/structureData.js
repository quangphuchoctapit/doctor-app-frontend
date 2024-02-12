

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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
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

const displayTableContent = (value, onOpenModalUserAction, dataTable, isAdmin) => {
    switch (value) {
        case 'users':
            return (
                <>
                    {dataTable?.users?.map((item, index) => (
                        <tr key={item._id}>
                            <td className=" w-16 h-16">
                                <img src={item?.image ? 'image' : (item?.gender === 'male' ? '/user/avatar/user-male.png' : '/user/avatar/user-female.png')} className='w-full h-full object-cover' />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.username}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.role}</td>
                            {isAdmin &&
                                <td className="max-sm:w-full flex items-center py-2 px-2 justify-center border border-transparent text-sm font-medium translate-y-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={onOpenModalUserAction}>
                                    <button className="">Set Action</button>
                                </td>
                            }
                            <td className="px-6 py-4 whitespace-nowrap">{item.location || 'Unset yet'}</td>
                        </tr>
                    ))}
                </>
            )
        case 'doctors':
            return (
                <>
                    {dataTable.doctors.map((item, index) => (
                        <tr key={item._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.image || 'image'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.name || 'doctor name'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.doctorName || 'doctor email'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.specialty || 'doctor specialty'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.pricePerHour || 'doctor price per hour'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.totalPatient || 'total patient'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.description || 'doctor description'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.location || 'doctor location'}</td>
                        </tr>
                    ))}
                </>
            )
        case 'medicines':
            return (
                <>
                    {dataTable.medicines.map((item, index) => (
                        <tr key={item._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.image || 'image'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.name || 'name'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.type || 'type medicien'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.price || 'price'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.unit || 'box'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.available || '2188'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.ingredient || 'Calci Carbonat, Natri bicarbonat, Natri alginate'}</td>
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
                    {dataTable.clinics.map((item, index) => (
                        <tr key={item._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.image || 'image'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.clinicName || 'clinic name'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.available || '212213'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.brandOwner || 'Reckitt Benckiser (England)'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.location || '221 fan huy ich'}</td>
                        </tr>
                    ))}
                </>
            )
        case 'specialties':
            return (
                <>
                    {dataTable.specialties.map((item, index) => (
                        <tr key={item._id}>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">{item?.image || 'image'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item?.type || 'cardiovascular'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item?.available || '732'}</td>
                            </tr>
                        </tr>
                    ))}
                </>

            )
    }
}

export { displayTableHeader, displayTableContent }


{/* <tr>
<td className="px-6 py-4 whitespace-nowrap">Image</td>
<td className="px-6 py-4 whitespace-nowrap">1</td>
<td className="px-6 py-4 whitespace-nowrap">John Doe</td>
<td className="px-6 py-4 whitespace-nowrap">john@example.com</td>
<td className="px-6 py-4 whitespace-nowrap">Doctor</td>
<td className="max-sm:w-full flex items-center py-2 px-2 justify-center border border-transparent text-sm font-medium translate-y-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={onOpenModalUserAction}>
    <button className="">Set Action</button>
</td>
<td className="px-6 py-4 whitespace-nowrap">Medicine Specialist</td>
<td className="px-6 py-4 whitespace-nowrap">$ 20/hour</td>
<td className="px-6 py-4 whitespace-nowrap">box</td>
<td className="px-6 py-4 whitespace-nowrap">988</td>
<td className="px-6 py-4 whitespace-nowrap">1222</td>
<td className="px-6 py-4 whitespace-nowrap">Calci Carbonat, Natri bicarbonat, Natri alginate</td>
<td className="px-6 py-4 whitespace-nowrap overflow-hidden text-overflow-ellipsis max-w-xs ">Điều trị các triệu chứng của trào ngược dạ dày - thực quản như ợ nóng, khó tiêu và ợ chua liên quan đến sự trào ngược như sau bữa ăn, hoặc trong khi mang thai, hoặc trên những bệnh nhân có các triệu chứng liên quan với viêm thực quản do trào ngược.</td>
<td className="px-6 py-4 whitespace-nowrap">England</td>
<td className="px-6 py-4 whitespace-nowrap">Blended Liquid</td>
<td className="px-6 py-4 whitespace-nowrap">England</td>
<td className="px-6 py-4 whitespace-nowrap">Reckitt Benckiser (England)</td>
<td className="px-6 py-4 whitespace-nowrap">description</td>
<td className="px-6 py-4 whitespace-nowrap">221 Phan Huy Ich</td>
</tr>  
*/}
