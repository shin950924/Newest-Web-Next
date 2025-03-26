import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface TabsState {
  tabIndex: string;
}

function isHydrateAction(action: AnyAction): action is AnyAction & { payload: { tabs?: TabsState } } {
  return action.type === HYDRATE;
}

const initialState: TabsState = { tabIndex: "home" };

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setIndex: (state, action: PayloadAction<string>) => {
      state.tabIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isHydrateAction,
      (state, action) => {
        return {
          ...state,
          ...(action.payload.tabs || {}),
        };
      }
    );
  },
});

export const { setIndex } = tabsSlice.actions;
export const selectActiveTab = (state: { tabs: TabsState }) => state.tabs.tabIndex;
export default tabsSlice.reducer;