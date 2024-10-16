import axios from 'axios'

import {ALL_TRIP_REQUEST,ALL_TRIP_SUCCESS,ALL_TRIP_FAIL,CLEAR_ERRORS, CREATE_TRIP_REQUEST, CREATE_TRIP_SUCCESS, CREATE_TRIP_FAIL    } from '../Reducers/TripReducer.js'

import toast from 'react-hot-toast'

export const getAllTrips = (startLocation = "", destination = "",date="") => async (dispatch) => {
    try {
        dispatch(ALL_TRIP_REQUEST());
        
        let newData = {};

        let query = `/trips/all`;
        let queryParams = [];

        if (startLocation) {
            queryParams.push(`startLocation=${startLocation}`);
        }
        if (destination) {
            queryParams.push(`destination=${destination}`);
        }
        if (date) {
            queryParams.push(`date=${date}`);
        }
        queryParams.push(`expired=false`);
        if (queryParams.length > 0) {
            query += `?${queryParams.join("&")}`;
        }

        const { data } = await axios.get(query);
        newData = data;
        // console.log(newData);
        // const { data } = await axios.get(query);
        // newData = data;

        if (newData.trips==[]) {
            toast.error("No Product Found");
        }

        dispatch(ALL_TRIP_SUCCESS(newData));
    } catch (error) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
        dispatch(ALL_TRIP_FAIL(error.response.data.error));
    }
};
export const createTrip=()=>async(dispatch)=>{
    try {
        dispatch(CREATE_TRIP_REQUEST());
        const {data}=await axios.post('http://localhost:3000/trips/create',)
        
        console.log(newData);
        dispatch(CREATE_TRIP_SUCCESS(newData));
    } catch (error) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error)
        dispatch(CREATE_TRIP_FAIL(error.response.data.error))
    }
}

