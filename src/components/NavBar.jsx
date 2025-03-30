"use client"

import { SignedOut, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import { SignedIn } from "@clerk/nextjs"
import { SignInButton } from "@clerk/nextjs"
import Image from "next/image"

function NavBar() {

  const { user } = useUser();

  return (
    <div className="flex justify-between gap-4 p-4 pt-8 text-xl"> 
      <div className="flex items-center">
        <Image src='/Logo.png' width={120} height={120} alt="RentRide"></Image>
      </div>
      <div className="hidden lg:flex gap-8 text-center items-center justify-center">
        <div className="cursor-pointer hover:text-black hover:scale-110 transition-all duration-300">Became a rental</div>
        <div className="cursor-pointer hover:text-black hover:scale-110 transition-all duration-300">Rental deals</div>
        <div className="cursor-pointer hover:text-black hover:scale-110 transition-all duration-300">How it work</div>
        <div className="cursor-pointer hover:text-black hover:scale-110 transition-all duration-300">Why choose us</div>
      </div>
      <div className="flex">
        <SignedOut>
          <SignInButton>
        <div type="button" className="text-[#1572D3] cursor-pointer w-24 h-10 flex items-center justify-center rounded-lg hover:text-black hover:scale-110 transition-all duration-300">Sign in</div>
          </SignInButton>
          <SignUpButton>
          <button className="bg-[#1572D3] outline-none border-none text-white cursor-pointer px-4 rounded-lg hover:bg-black hover:scale-110 transition-all duration-300">Sign Up</button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-2 bg-gray-400 py-1 pl-4 pr-1 rounded-full">
          <span className="text-white font-semibold text-lg">{user?.firstName}</span>
          <UserButton
            appearance={{ elements: { avatarBox: { width: "35px", height: "35px" } } }}
          />
          </div>
        </SignedIn>
      </div>
    </div>
  )
}

export default NavBar
