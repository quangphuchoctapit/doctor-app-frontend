import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
import userReducer, { userState } from './features/user/userSlice';
import counterReducer, { CounterState } from './features/counter/counterSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// Define RootState interface
export interface RootState {
    user: userState;
    counter: CounterState;
}

// Configure persistence for the root reducer
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'] // Only persist 'user' slice
};

// Combine reducers
const rootReducer: Reducer<RootState> = combineReducers({
    user: userReducer,
    counter: counterReducer
});

// Wrap the root reducer with redux-persist's persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Enable persistence
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
