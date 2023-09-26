import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import { decode } from "punycode";

connect();

export async function POST(request: NextRequest) {
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
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
