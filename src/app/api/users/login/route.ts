import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import styled from 'styled-jsx/style';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //checkif user exists

    const user = await User.findOne({ email });

    //check password validation
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }
    if (!user) {
      return NextResponse.json({ error: "User doesnt exist" }, { status: 400 });
    }

    //create token data
    const tokenData = {
      id: user._id,
      lastLogin: user.lastLogin,
    };
    user.lastLogin = new Date();
    await user.save();
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "3d",
    });
    const response = NextResponse.json({
      message: "Logged in",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
