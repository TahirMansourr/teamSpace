'use server'
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const GetDataFromToken = async (request: NextRequest) => {
  // console.log("🚀 ~ GetDataFromToken ~ request:", request.cookies)
  try {
    const token = request.cookies.get('token')?.value;
    console.log("🚀 ~ GetDataFromToken ~ token:", token?.slice(1,5));
    if (!token) throw new Error('Sorry but there is no Token');

    const decodedToken = jwt.verify(token, process.env.TokenSecret!);
    console.log("🚀 ~ GetDataFromToken ~ decodedToken:", decodedToken);
    return decodedToken;
  } catch (error: any) {
    console.error(`Error in GetDataFromToken: ${error.message}`);
    throw new Error(`error at authenticationUtils : ${error.message}`);
  }
};

