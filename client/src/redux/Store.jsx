import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './Slice'; // Update this import

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer, // Use the correct export name here
  },
});


