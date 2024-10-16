import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js';
import { createTrip, deleteTrip, getAllTrips, getMyTrips, getSingleTrip, searchLocations } from '../controllers/tripController.js';
export const tripRouter=express.Router();

// tripRouter.get('/all')
tripRouter.post('/create',isAuthenticated,createTrip);
tripRouter.get('/all',isAuthenticated,getAllTrips);
tripRouter.get('/my',isAuthenticated,getMyTrips);



// tripRouter.get('/searchloc/:startLocation',isAuthenticated,searchLocations)
tripRouter.get('/:id',isAuthenticated,getSingleTrip);


tripRouter.delete('/delete/:id',isAuthenticated,deleteTrip);