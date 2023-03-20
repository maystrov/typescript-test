import { createSlice } from '@reduxjs/toolkit';

const defaultlState = {
  value: 0,
  name: 'Jeka',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState: defaultlState,
  reducers: {
    increment: (state) => {
      state.value = state.value + 1;
    },
    decrement: (state) => {
      state.value = state.value - 1;
    },
    incrementByAmount: (state, action) => {
      const inputValue = +action.payload.value;

      isNaN(inputValue)
        ? alert('wrong input data')
        : (state.value = state.value + inputValue);
    },
    minusByValue: (state, action) => {
      state.value = state.value - action.payload.value;
    },
  },
});

export const { increment, decrement, incrementByAmount, minusByValue } =
  counterSlice.actions;

export default counterSlice.reducer;
