import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';

export interface UserState {
  user_id?: string;
  profile_picture: string | null;
  access_token?: string;
  refresh_token?: string;
}

export interface UserApiProps {
  is_member: boolean;
  user_id?: string;
  token: Token;
}

export interface Token {
  access_token?: string;
  refresh_token?: string;
}

const initialState: UserState = {
  user_id: undefined,
  access_token: undefined,
  refresh_token: undefined,
  profile_picture: null,
};

function isHydrateAction(action: AnyAction): action is AnyAction & { payload: { user?: UserState } } {
  return action.type === HYDRATE;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserApiProps>) => {
      state.user_id = action.payload.user_id;
      state.access_token = action.payload.token.access_token;
      state.refresh_token = action.payload.token.refresh_token;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isHydrateAction,
      (state, action) => ({
        ...state,
        ...(action.payload.user || {}),
      })
    );
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user;
export default userSlice.reducer;