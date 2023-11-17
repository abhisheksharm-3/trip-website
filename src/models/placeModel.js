import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a Name"],
    minlength: [1, "Name must be at least 2 characters long"],
  },
  description: {
    type: String,
    required: [true, "Please Provide Description of the Destination"],
    minlength: [250, "Description should be at least 250 chars long"],
  },
  link: {
    type: String,
    required: [true, "Please Provide Image of the Destination"],
  },
  dateRange: {
    type: Number,
    required: [true, "Please Provide Duration of Trip"],
    min: [0, "Enter Something in Trip Duration"],
  },
  budget: {
    type: Number,
    required: [true, "Please Provide a Budget"],
    min: [2, "Budget Should be more than 99"],
  },
  itinerary: {
    type: String,
    required: [true, "Please Provide itinerary of the Destination"],
    minlength: [550, "Description should be at least 550 chars long"],
  },
  email: {
    type: String,
    required: [true, "Please provide an Email"],
  },
  votesInFavour: [
    {
      type: String, // Store user emails as strings
    },
  ],
  votesAgainst: [
    {
      type: String, // Store user emails as strings
    },
  ],
  isAccepted: {
    type: Boolean,
    default: false,
  },
  isRejected: {
    type: Boolean,
    default: false,
  },
  voters: [
    {
      type: String, // Store user emails as strings
    },
  ],
  placeImage: {
    type: String,
  },
});

const Place =
  mongoose.models.place ||
  mongoose.model("place", placeSchema); // name of the collection in mongoDB

export default Place;
