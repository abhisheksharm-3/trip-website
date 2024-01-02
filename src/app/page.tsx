"use client" //temp fix for vercel failed deploys
import LandingPage from "./landing/page"
import { Metadata } from 'next'
import {NextUIProvider} from "@nextui-org/react";
 //temp fix for vercel failed deploys
// export const metadata: Metadata = {
//   title: 'TripTalkies',
// }

export default function Home() {
  return (
    <NextUIProvider>
    <LandingPage />
    </NextUIProvider>
  )
}
