
import { BookFlip, Hero, Loading } from '@/components'
import Allbook from '@/components/AllBooksPage/Allbook';
import {Carsol} from '@/components/Carsol/Carsol';
import { useSession } from 'next-auth/react';
import React from 'react';
import "./globals.css";

const page = () => {
  return (
    <div>
      <Hero/>
      <Carsol/>
      <Allbook/>
      
    </div>
  )
}

export default page
