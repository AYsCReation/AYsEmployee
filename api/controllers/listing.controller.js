import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async(req, res , next) =>{
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error); 
    }
}
export const deleteListing = async(req, res, next) =>{
    const listing = await Listing.findById(req.params.id);
    if(!listing) return next(errorHandler(404 , 'listing not found!'));

    try {
        const deletedList = await Listing.findByIdAndDelete(req.params.id);
        return res.status(201).json("deleted successfully")
    } catch (error) {
        next(error)
    }
}
export const updateListing = async(req, res, next) =>{
    const listing = await Listing.findById(req.params.id);
    if(!listing) return next(errorHandler(404 , 'listing not found!'));

    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id ,
            req.body,
            {new : true})
            res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
}

export const getListings = async (req, res, next) => {
    try {
        const listings = await Listing.find({});
        return res.status(200).json(listings);

    } catch (error) {
        next(error)
    }
}
export const getListing = async(req , res , next) => {
    try {
        const listing = await Listing.findById(req.params.id);
    if(!listing) return next(errorHandler(404 , 'listing not found!'));
    res.status(200).json(listing);
    } catch (error) {
        next(error)
    }
    
}
