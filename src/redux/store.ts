import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as deskReducer } from "./room/room.slice";
import userReducer from "./user/user.slice";
import { 
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';

const redusers = combineReducers({
    place: deskReducer,
    user: userReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['place']
  }
  
const persistedReducer = persistReducer(persistConfig, redusers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch