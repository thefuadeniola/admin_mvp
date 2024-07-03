// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client'

import { createContext, useContext, useState } from 'react';

import SideNav from "@/components/ui/SideNav";
import NavBar from '@/components/NavBar'
import { Barlow, Inter } from "next/font/google";

const barlow = Barlow({weight:['100', '200', '300', '400', '500'] ,subsets:['latin']})
const inter = Inter({subsets: ['latin']})

const userContext = createContext();

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) 



{

  const [currentUser, setCurrentUser] = useState({})

  const fetchUser = async () => {
    const res = await fetch('/api/fetch_user')
    const data = await res.json()
    setCurrentUser(data)
  }


  return (
    <html lang="en">
      <body className="flex flex-row pl-[22vw]">
        <SideNav />
        <div className={`${inter.className} w-full bg-gray px-8 py-4 min-h-screen`}>
          <userContext.Provider value={{ currentUser, fetchUser }}>
            <NavBar />
            {children}
          </userContext.Provider>
        </div>
      </body>
    </html>
  );
}
