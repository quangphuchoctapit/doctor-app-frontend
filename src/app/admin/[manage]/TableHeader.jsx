'use client'
import { useState, useEffect } from 'react'
export const DisplayTableHeader = (value, isAdmin) => {
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