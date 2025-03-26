// store.ts
import feedReducer from '../slice/feedSlice';
import tabsReducer from '../slice/tabsSlice';
import userReducer from '../slice/userSlice';
import { AppState, AppStore } from '../../../types';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { configureStore, combineReducers, AnyAction, Reducer } from '@reduxjs/toolkit';

const combinedReducer = combineReducers({
  feeds: feedReducer,
  tabs: tabsReducer,
  user: userReducer
});

const rootReducer = (state: AppState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducer(state, action);
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer as Reducer<AppState>,
    devTools: process.env.NODE_ENV !== 'production',
  });
};


export const store = makeStore();
export const wrapper = createWrapper<AppStore>(makeStore, { debug: process.env.NODE_ENV !== 'production' });