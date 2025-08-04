'use client'

import React, { useState } from 'react'
import Link from "next/link"
import { useUser, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, SignOutButton } from '@clerk/nextjs'
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SquareMenu, LogOut } from "lucide-react"

const Navbar = () => {
  const [openSheet, setOpenSheet] = useState(false)
  const { user } = useUser()

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MEI Events</h1>
              <p className="text-xs text-gray-500">University Event Platform</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/events" className="text-gray-600 hover:text-blue-600 transition-colors">
              Events
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
              My Bookings
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
              <SignOutButton>
                <Button variant="ghost" size="icon" title="Sign Out">
                  <LogOut className="h-5 w-5 text-gray-600 hover:text-red-600 transition-colors" />
                </Button>
              </SignOutButton>
            </SignedIn>
          </div>

          {/* Mobile Nav – User Icon + Menu */}
          <div className="md:hidden flex items-center space-x-3">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SquareMenu
              onClick={() => setOpenSheet(true)}
              className="h-8 w-8 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Mobile Sheet Menu */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent
          side="right"
          className="bg-gradient-to-br from-blue-250 via-white to-purple-200 w-[75%] sm:w-[300px] p-6 space-y-8"
        >
          <nav className="flex flex-col space-y-4 text-left">
            <Link href="/events" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Events
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              My Bookings
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
          </nav>

          <SignedOut>
            <div className="flex flex-col space-y-4">
              <SignInButton mode="modal">
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex flex-col space-y-4">
              <SignOutButton>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-start gap-2 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          </SignedIn>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default Navbar
