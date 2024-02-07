export const roles = [
    {
        id: 1,
        role: "Super Admin",
        actions: [
            { id: 1, action: "Manage all aspects of the system" },
            { id: 2, action: "Create and manage user accounts" },
            { id: 3, action: "Assign roles and permissions" },
            { id: 4, action: "Access to all features and data" }
        ]
    },
    {
        id: 2,
        role: "Administrator",
        actions: [
            { id: 5, action: "Manage system settings and configurations" },
            { id: 6, action: "Monitor user activities" },
            { id: 7, action: "Provide technical support" }
        ]
    },
    {
        id: 3,
        role: "Doctor",
        actions: [
            { id: 8, action: "View patient medical records" },
            { id: 9, action: "Schedule appointments" },
            { id: 10, action: "Prescribe medications" },
            { id: 11, action: "Order diagnostic tests" },
            { id: 12, action: "Update patient treatment plans" }
        ]
    },
    {
        id: 4,
        role: "Pharmacist",
        actions: [
            { id: 13, action: "Dispense medications" },
            { id: 14, action: "Manage pharmacy inventory" },
            { id: 15, action: "Verify prescription orders" },
            { id: 16, action: "Provide drug information to patients" }
        ]
    },
    {
        id: 5,
        role: "User (General Staff)",
        actions: [
            { id: 17, action: "Access basic system features" },
            { id: 18, action: "View own profile information" },
            { id: 19, action: "Update personal details" }
        ]
    },
    {
        id: 6,
        role: "Remote Doctor",
        actions: [
            { id: 20, action: "Conduct remote consultations" },
            { id: 21, action: "Review patient data remotely" },
            { id: 22, action: "Provide medical advice online" }
        ]
    },
    {
        id: 7,
        role: "IT Administrator",
        actions: [
            { id: 23, action: "Manage IT infrastructure" },
            { id: 24, action: "Ensure system security" },
            { id: 25, action: "Troubleshoot technical issues" }
        ]
    },
    {
        id: 8,
        role: "Patient",
        actions: [
            { id: 26, action: "View personal medical records" },
            { id: 27, action: "Schedule appointments with doctors" },
            { id: 28, action: "Request prescription refills" },
            { id: 29, action: "Communicate with healthcare providers" }
        ]
    }
];
