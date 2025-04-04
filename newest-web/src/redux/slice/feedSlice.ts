import { Feeds } from "../../../types";
import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// Use Feeds[] for an array of feed items.
interface feedState {
  feeds: Feeds[];
  selectFeed: Feeds | undefined
}

function isHydrateAction(
  action: AnyAction
): action is AnyAction & { payload: { feed?: Feeds[] } } {
  return action.type === HYDRATE;
}

const initialState: feedState = { feeds: [], selectFeed: undefined };

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<Feeds[]>) => {
      state.feeds = action.payload;
    },
    setSelectFeed: (state, action: PayloadAction<Feeds>) => {
      state.selectFeed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isHydrateAction,
      (state, action) => {
        return {
          ...state,
          ...(action.payload.feed || {}),
        };
      }
    );
  },
});

export const { setFeed, setSelectFeed } = feedSlice.actions;
export const feeds = (state: { feed: feedState }) => state.feed.feeds;
export default feedSlice.reducer;