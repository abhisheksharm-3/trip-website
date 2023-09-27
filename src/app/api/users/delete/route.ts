import { NextResponse, NextRequest } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import axios from "axios";
import jwt from "jsonwebtoken";

connect();


//make this function a component

async function getDatafromToken(request: NextRequest) {
    try {
      const token: any = request.cookies.get("token");
      if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
      }
      
  
      const decodedToken: any = jwt.verify(token.value, process.env.TOKEN_SECRET!);
      
      if (!decodedToken) {
        return NextResponse.json({ message: "Invalid token" }, { status: 400 });
      }
      const userId = decodedToken.id;
      const lastLogin = decodedToken.lastLogin;
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ message: "User not found" });
      }
  
      return NextResponse.json({ user, lastLogin }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }


export async function POST(request: NextRequest) {
    try {
        const response: any = await getDatafromToken(request);
        const user: any = response.data.user
        const userId = user._id;
        console.log(user);
        const deleteStatus = await User.findByIdAndDelete(userId);
        console.log(deleteStatus);
        if (!deleteStatus) {
            throw new Error(`User with ID ${userId} not found or already deleted`);
          }
          return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}