import ErrorHandler from "../middlewares/ErrorHandler.js";
import { Trip } from "../models/tripModel.js";
import apiFeatures from "../utils/apiFeatures.js";
import { locations } from "../test folder/locations.js";
export const getAllTrips = async (req, res, next) => {
  try {
    const apiFeature = new apiFeatures(
      Trip.find().populate("createdBy", "name avatar"),
      req.query
    )
      .search()
      .filter()
      .pagination();
    const trips = await apiFeature.query;

    res.json({
      success: true,
      trips,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};

export const searchLocations=async(req,res,next)=>{
    const startLoc = req.params.startLocation.toLowerCase();
    const records = JSON.parse(startLoc);
    let searchRes = records.filter((record) =>
      record.name.toLowerCase().includes(startLoc)
    );
    console.log(searchRes);

}
export const createTrip = async (req, res, next) => {
  try {
    
    const { date, time, startLocation, destination } = req.body;

    if (!date || !time || !startLocation || !destination) {
      return next(new ErrorHandler("Please Enter All The Credentials...", 400));
    }
    console.log(req.user);

    const trip = await Trip.create({
      date,
      time,
      startLocation,
      destination,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      trip,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};

export const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    const mytrips = await Trip.find({ createdBy: req.user._id });

    if (!trip) {
      return next(new ErrorHandler("No Trip Found!", 404));
    }
    trip.expired = true;
    await trip.save();
    return res.status(200).json({
      success: true,

      message: "Trip Deleted Successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};

export const getMyTrips = async (req, res, next) => {
  try {
    const mytrips = await Trip.find({ createdBy: req.user._id });
    res.json({
      success: true,
      mytrips,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};

export const getSingleTrip = async (req, res, next) => {
  try {
    const getSingleTrip = await Trip.find({ _id: req.params.id }).populate(
      "createdBy",
      "name email avatar"
    );
    res.json({
      success: true,
      getSingleTrip,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};
