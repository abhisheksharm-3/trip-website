import LandingPage from "./landing/page"
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'TripTalkies',
}

export default function Home() {
  return (
    <>
    <LandingPage />
    </>
  )
}
