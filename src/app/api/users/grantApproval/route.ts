import { connect } from "@/dbConfig/dbConfig";
import Place from "@/models/placeModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { log } from "console";

connect();

export async function POST(request: NextRequest) {
  const body = await request.text();

  let { itemId, status } = {} as Record<string, string>;

  try {
    const data = JSON.parse(body);
    itemId = data.itemId;
    status = data.status;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON in the request body" },
      { status: 400 }
    );
  }

  try {
    // Handle the approval status
    if (status === "accept") {
      // Handle acceptance logic and update your database
      const acceptedPlace = await Place.findOneAndUpdate(
        { _id: itemId },
        { isAccepted: true }
      );
      if (!acceptedPlace) {
        return NextResponse.json({ error: "Place not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "Place accepted" });
    } else if (status === "reject") {
      // Handle rejection logic and update your database
      const rejectedPlace = await Place.findOneAndUpdate(
        { _id: itemId },
        { isRejected: true }
      );
      if (!rejectedPlace) {
        return NextResponse.json({ error: "Place not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "Place rejected" });
    } else {
      return NextResponse.json(
        { error: "Invalid approval status" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}
