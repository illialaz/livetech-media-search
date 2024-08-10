import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ITunesResult } from '@/types/itunes';

export interface LikesState {
  value: ITunesResult[];
}

const initialState: LikesState = {
  value: [],
};

export const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    like: (state, action: PayloadAction<ITunesResult>) => {
      return {
        ...state,
        value: [...state.value, action.payload],
      };
    },
    dislike: (state, action: PayloadAction<ITunesResult>) => {
      return {
        ...state,
        value: [
          ...state.value.filter(
            (i) =>
              !(
                i.trackName === action.payload.trackName &&
                i.artistName === action.payload.artistName &&
                i.collectionName === action.payload.collectionName
              ),
          ),
        ],
      };
    },
  },
});

export const { like, dislike } = likesSlice.actions;

export default likesSlice.reducer;
