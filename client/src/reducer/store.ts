import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import storageSession from "redux-persist/lib/storage/session";
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/lib/persistStore";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user", "auth"],
};

const rootReducer = combineReducers({ user: userReducer, auth: authReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //현재 전체 직렬화 비활성화
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

/**
 * persist 도입 이후
 *
 * Error
 * VM32:6 A non-serializable value was detected in an action, in the path: `register`.
 *
 */
