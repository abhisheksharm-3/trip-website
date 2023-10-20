import { connect } from "@/dbConfig/dbConfig";
import Place from '@/models/placeModel';
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

connect();

export async function GET(request: NextRequest) {
  try {
    const places = await Place.find({
      isAccepted: true,
    });
    // Return the list of accepted places as a JSON response
    return NextResponse.json({ places });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error processing the request:", error);

    return NextResponse.json({ error: "An error occurred while processing the request" }, { status: 500 });
  }
}
