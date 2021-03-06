import { configureStore, combineReducers } from "@reduxjs/toolkit"; 
import searchSlice from './searchSlice';
import subscriptionSlice from './subscriptionSlice';
import latestSlice from './latestSlice';
import routeSlice from './routeSlice';
import orderSlice from "./orderSlice";
import seatsSlice from './seatsSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['searchSlice', 'routeSlice' ], //Things you want to persist
  blacklist: ['latestSlice', 'subscriptionSlice', 'orderSlice', 'seatsSlice'], //Things you dont
};

const rootReducer = combineReducers({
  searchSlice,
  subscriptionSlice,
  latestSlice,
  routeSlice,
  orderSlice,
  seatsSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

let persistor = persistStore(store);

export {
  store,
  persistor,
};