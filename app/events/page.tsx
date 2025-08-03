"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, Star, Search, Filter, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")

  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      date: "March 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "MEI Auditorium",
      category: "Technology",
      price: "Free",
      attendees: 250,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      description: "Join industry leaders and innovators for a day of cutting-edge technology discussions.",
    },
    {
      id: 2,
      title: "Cultural Festival",
      date: "March 20, 2024",
      time: "6:00 PM - 11:00 PM",
      location: "Campus Grounds",
      category: "Cultural",
      price: "₹200",
      attendees: 500,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      description: "Celebrate diversity with music, dance, food, and art from around the world.",
    },
    {
      id: 3,
      title: "Career Fair 2024",
      date: "March 25, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Sports Complex",
      category: "Career",
      price: "Free",
      attendees: 800,
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300",
      description: "Connect with top employers and explore exciting career opportunities.",
    },
    {
      id: 4,
      title: "Annual Sports Meet",
      date: "April 2, 2024",
      time: "8:00 AM - 6:00 PM",
      location: "Sports Complex",
      category: "Sports",
      price: "₹100",
      attendees: 600,
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300",
      description: "Compete in various sports and cheer for your favorite teams.",
    },
    {
      id: 5,
      title: "Research Symposium",
      date: "April 8, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Conference Hall",
      category: "Academic",
      price: "Free",
      attendees: 200,
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=300",
      description: "Present and discover groundbreaking research from students and faculty.",
    },
    {
      id: 6,
      title: "Music Concert Night",
      date: "April 12, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "Open Air Theatre",
      category: "Cultural",
      price: "₹300",
      attendees: 400,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      description: "Enjoy an evening of live music performances by talented student artists.",
    },
  ]

  const categories = ["all", "Technology", "Cultural", "Career", "Sports", "Academic"]
  const dateFilters = ["all", "This Week", "This Month", "Next Month"]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MEI Events</h1>
                <p className="text-xs text-gray-500">University Event Platform</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/events" className="text-blue-600 font-medium">
                Events
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                My Bookings
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Events</h1>
          <p className="text-xl text-gray-600">Find and book amazing university events</p>
        </div>

        {/* Search and Filters */}
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
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                {dateFilters.map((filter) => (
                  <SelectItem key={filter} value={filter}>
                    {filter === "all" ? "All Dates" : filter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredEvents.length} of {events.length} events
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700">{event.category}</Badge>
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
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date} • {event.time}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    {event.attendees} attendees
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600">{event.price}</div>
                  <Link href={`/events/${event.id}`}>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
