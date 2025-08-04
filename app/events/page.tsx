"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs"
import {
  Calendar, MapPin, Users, Star, Search, Filter, ArrowRight, Lock
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "@/components/ui/select"

const events = [
  {
    id: "1",
    title: "Tech Innovation Summit 2024",
    date: "March 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "MEI Auditorium",
    category: "Technology",
    price: "Free",
    attendees: 250,
    rating: 4.8,
    image: "https://source.unsplash.com/600x400/?technology,conference",
    description: "Join industry leaders and innovators for a day of cutting-edge technology discussions.",
  },
  {
    id: "2",
    title: "Cultural Festival",
    date: "March 20, 2024",
    time: "6:00 PM - 11:00 PM",
    location: "Campus Grounds",
    category: "Cultural",
    price: "₦200",
    attendees: 500,
    rating: 4.9,
    image: "https://source.unsplash.com/600x400/?culture,festival,colors",
    description: "Celebrate diversity with music, dance, food, and art from around the world.",
  },
  // Add more events as needed
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Technology", "Cultural", "Career", "Sports", "Academic"]

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Events</h1>
          <p className="text-lg text-gray-600">Find and book amazing university events</p>
        </div>

        <SignedOut>
          <div className="bg-white rounded-xl border shadow-md p-8 text-center max-w-xl mx-auto mt-12">
            <Lock className="mx-auto h-10 w-10 text-gray-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">You're not signed in</h2>
            <p className="text-gray-600 mb-6">Please sign in or create an account to view and book events.</p>
            <div className="flex justify-center gap-4">
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Event Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {filteredEvents.map((event) => (
  <Link href={`/events/${event.id}`} key={event.id} className="block">
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        <Image
          src={event.image}
          alt={event.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700">
          {event.category}
        </Badge>
        <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1">
          <div className="flex items-center space-x-1 px-2 py-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{event.rating}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {event.date} • {event.time}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            {event.attendees} attendees
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">{event.price}</div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </Link>
))}

          </div>
        </SignedIn>
      </div>
    </div>
  )
}
