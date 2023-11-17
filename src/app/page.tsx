import LandingPage from "./landing/page"
import { Metadata } from 'next'
import {NextUIProvider} from "@nextui-org/react";
 
export const metadata: Metadata = {
  title: 'TripTalkies',
}

export default function Home() {
  return (
    <NextUIProvider>
    <LandingPage />
    </NextUIProvider>
  )
}
