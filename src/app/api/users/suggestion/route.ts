import { connect } from "@/dbConfig/dbConfig";
import Place from '@/models/placeModel';
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    if (request.method === "POST") {
      // Get the form data from the request body
      const reqBody = await request.text(); // Read the request body as text

      // Parse the request body as JSON
      const formData = JSON.parse(reqBody);

      if (formData) {
        // Extract the form fields from formData
        const {
          name,
          description,
          link,
          dateRange,
          budget,
          itinerary,
          email,
        } = formData;

        // Create a new Place document in MongoDB
        const newPlace = new Place({
          name,
          description,
          dateRange,
          budget,
          itinerary,
          email,
        });

        // Save the new place to the database
        await newPlace.save();

        return NextResponse.json({ message: "Form submitted successfully", success: true, newPlace });
      } else {
        return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
      }
    } else {
      return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error processing the form:", error);

    return NextResponse.json({ error: "An error occurred while processing the form" }, { status: 500 });
  }
}
