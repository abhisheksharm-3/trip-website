import LandingPage from "./landing/page"
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Title',
}

export default function Home() {
  return (
    <>
    <LandingPage />
    </>
  )
}
