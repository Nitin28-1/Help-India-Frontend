import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import postSlice from "./postSlice.js"
import socketSlice from "./socketSlice.js"
import chatSlice from "./chatSlice.js"
import rtnSlice from "./rtnSlice.js"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
    blacklist: ['socketio'],
};

const rootReducer=combineReducers({
    auth:authSlice,
    post:postSlice,
    socketio:socketSlice,
    chat:chatSlice,
    realTimeNotification:rtnSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            // Ignore actions that match the redux-persist pattern
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE','socketio/setSocket'],
            // Optionally, you can also ignore specific paths where non-serializable values may appear
            ignoredPaths: ['register', 'rehydrate','socketio.socket'],
          },
    }),
});

export default store;
