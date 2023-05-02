import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  boards: [],
}

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    getBoards: () => {

    },
    addBoard: (state) => {

    },
    deleteBoard: () => {

    },
  }
});


export const { getBoards, addBoard, deleteBoard} = boardSlice.actions;

export default boardSlice.reducer;
