import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trips: [],
  loading: false,
  error: null,
  
};

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    ALL_TRIP_REQUEST: (state) => {
      state.loading = true;
      state.trips = [];
    },
    ALL_TRIP_SUCCESS: (state, action) => {
      state.loading = false;
      state.trips = action.payload.trips;
      
    },
    ALL_TRIP_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CREATE_TRIP_REQUEST: (state) => {
      state.loading = true;
      
    },
    CREATE_TRIP_SUCCESS: (state, action) => {
      state.loading = false;
      
      
    },
    CREATE_TRIP_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  },
});




export const {
  ALL_TRIP_SUCCESS,
  ALL_TRIP_REQUEST,
  ALL_TRIP_FAIL,
  CREATE_TRIP_REQUEST,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_FAIL,
  CLEAR_ERRORS
} = tripsSlice.actions;

export default tripsSlice.reducer;


