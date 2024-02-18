import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the interface for the search state
export interface SearchState {
    doctors: {
        query: string;
        listDoctors: {
            username?: string;
            image?: string;
            doctorInfo?: {
                specialty?: { name?: string };
                price?: number;
            };
        }[];
        resultSearch: {
            username?: string;
            image?: string;
            _id?: string
            doctorInfo?: {
                specialty?: { name?: string };
                price?: number;
            };
        }[];
    };
    medicines: {
        query: string;
        listMedicines: {
            name?: string;
            image?: string;
            doctorInfo?: {
                specialty?: { name?: string };
                price?: number;
            };
        }[];
        resultSearch: {
            name?: string;
            image?: string;
            _id?: string,
            doctorInfo?: {
                specialty?: { name?: string };
                price?: number;
            };
        }[];
    };
}

// Initial state
const initState: SearchState = {
    doctors: {
        query: '',
        listDoctors: [],
        resultSearch: []
    },
    medicines: {
        query: '',
        listMedicines: [],
        resultSearch: []
    },
};

// Create the search slice
export const searchSlice = createSlice({
    name: 'search',
    initialState: initState,
    reducers: {
        // Action to update the search query
        inputSearchDoctors: (state, action: PayloadAction<{ query: string }>) => {
            const { query } = action.payload;
            state.doctors.query = query;
        },

        // Action to update the list of doctors
        addListDoctors: (state, action: PayloadAction<{
            listDoctors: {
                username?: string;
                image?: string;
                doctorInfo?: {
                    specialty?: { name?: string };
                    price?: number;
                };
            }[];
        }>) => {
            const { listDoctors } = action.payload;
            state.doctors.listDoctors = listDoctors;
        },

        // Action to handle search result
        handleSearchResultDoctors: (state) => {
            const { query, listDoctors } = state.doctors;
            const result = listDoctors.filter(item => {
                return (
                    item.username?.toLowerCase().includes(query.toLowerCase())
                );
            });
            state.doctors.resultSearch = result;
        },

        // Action to update the search query
        inputSearchMedicines: (state, action: PayloadAction<{ query: string }>) => {
            const { query } = action.payload;
            state.medicines.query = query;
        },

        // Action to update the list of doctors
        addListMedicines: (state, action: PayloadAction<{
            listMedicines: {
                name?: string;
                image?: string;
                doctorInfo?: {
                    specialty?: { name?: string };
                    price?: number;
                };
            }[];
        }>) => {
            const { listMedicines } = action.payload;
            state.medicines.listMedicines = listMedicines;
        },

        // Action to handle search result
        handleSearchResultMedicines: (state) => {
            const { query, listMedicines } = state.medicines;
            const result = listMedicines.filter(item => {
                return (
                    item.name?.toLowerCase().includes(query.toLowerCase())
                );
            });
            state.medicines.resultSearch = result;
        }
    }
});

// Export actions
export const { inputSearchDoctors, addListDoctors,
    handleSearchResultDoctors, inputSearchMedicines,
    addListMedicines, handleSearchResultMedicines } = searchSlice.actions;

// Export reducer
export default searchSlice.reducer;
