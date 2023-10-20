import { connect } from "@/dbConfig/dbConfig";
import Place from '@/models/placeModel';
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

connect();

export async function POST(request: NextRequest) {
  try {
    console.log("here")

    const body = await request.text();

    let { placeId, type } = {} as Record<string, string>;

  try {
    const data = JSON.parse(body);
    placeId = data.placeId;
    type = data.type;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON in the request body" },
      { status: 400 }
    );
  }

    if (!placeId || !type) {
      return NextResponse.json(
        { error: "Invalid request. Missing placeId or type." },
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

    // Update the votes based on the type ('inFavor' or 'against')
    if (type === 'inFavor') {
      place.votesInFavour += 1;
    } else if (type === 'against') {
      place.votesAgainst += 1;
    }

    // Save the updated place in the database
    await place.save();

    // Return a success response
    return NextResponse.json({ message: "Votes updated successfully" });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error processing the form:", error);

    return NextResponse.json({ error: "An error occurred while processing the request" }, { status: 500 });
  }
}
