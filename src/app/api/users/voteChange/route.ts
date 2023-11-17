import { connect } from "@/dbConfig/dbConfig";
import Place from '@/models/placeModel';
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    let { placeId, type, userEmail } = {} as Record<string, string>;

    try {
      const data = JSON.parse(body);
      placeId = data.placeId;
      type = data.type;
      userEmail = data.userEmail; // Assuming you have the user's email
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON in the request body" },
        { status: 400 }
      );
    }

    if (!placeId || !type || !userEmail) {
      return NextResponse.json(
        { error: "Invalid request. Missing placeId, type, or userEmail." },
        { status: 400 }
      );
    }

    // Find the place by its ID
    const place = await Place.findById(placeId);

    if (!place) {
      return NextResponse.json(
        { error: "Place not found." },
        { status: 404 }
      );
    }

    // Check if the user's email is already in the voters array
    if (place.voters.includes(userEmail)) {
      return NextResponse.json(
        { error: "User has already voted for this place." },
        { status: 400 }
      );
    }

    // Add the user's email to the voters array
    place.voters.push(userEmail);

    // Update the votes based on the type ('inFavour' or 'against')
    if (type === 'inFavor') {
      place.votesInFavour.push(userEmail);
    } else if (type === 'against') {
      place.votesAgainst.push(userEmail);
    }

    // Save the updated place in the database
    await place.save();

    // Return a success response
    return NextResponse.json({ message: "Vote recorded successfully" });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error processing the form:", error);

    return NextResponse.json({ error: "An error occurred while processing the request" }, { status: 500 });
  }
}
