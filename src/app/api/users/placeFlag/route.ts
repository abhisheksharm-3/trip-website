import { connect } from "@/dbConfig/dbConfig";
import Place from "@/models/placeModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
// Accept a place
connect();

export async function acceptPlace(request: NextRequest) {
  try {
    const { placeId } = await request.json(); // Assuming you send the placeId in the request body
    const place = await Place.findById(placeId);

    if (!place) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    // Set the isAccepted flag to true
    place.isAccepted = true;
    await place.save();

    return NextResponse.json({ message: "Place accepted successfully" });
  } catch (error) {
    console.error("Error accepting place:", error);
    return NextResponse.json(
      { error: "An error occurred while accepting the place" },
      { status: 500 }
    );
  }
}

// Reject a place
export async function rejectPlace(request: NextRequest) {
  try {
    const { placeId } = await request.json(); // Assuming you send the placeId in the request body
    const place = await Place.findById(placeId);

    if (!place) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    // Set the isRejected flag to true
    place.isRejected = true;
    await place.save();

    return NextResponse.json({ message: "Place rejected successfully" });
  } catch (error) {
    console.error("Error rejecting place:", error);
    return NextResponse.json(
      { error: "An error occurred while rejecting the place" },
      { status: 500 }
    );
  }
}
