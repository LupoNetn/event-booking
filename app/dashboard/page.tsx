"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Clock, Star, Download, Share2, MessageCircle, Settings } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      date: "March 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "MEI Auditorium",
      category: "Technology",
      status: "confirmed",
      image: "/placeholder.svg?height=100&width=150",
      bookingId: "TIS2024001",
    },
    {
      id: 2,
      title: "Cultural Festival",
      date: "March 20, 2024",
      time: "6:00 PM - 11:00 PM",
      location: "Campus Grounds",
      category: "Cultural",
      status: "confirmed",
      image: "/placeholder.svg?height=100&width=150",
      bookingId: "CF2024002",
    },
  ]

  const pastEvents = [
    {
      id: 3,
      title: "Winter Sports Meet",
      date: "February 10, 2024",
      time: "8:00 AM - 6:00 PM",
      location: "Sports Complex",
      category: "Sports",
      status: "attended",
      rating: 4.5,
      image: "/placeholder.svg?height=100&width=150",
      bookingId: "WSM2024003",
    },
    {
      id: 4,
      title: "AI Workshop Series",
      date: "January 25, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Computer Lab",
      category: "Technology",
      status: "attended",
      rating: 4.8,
      image: "/placeholder.svg?height=100&width=150",
      bookingId: "AWS2024004",
    },
  ]

  const userStats = {
    totalEvents: 12,
    upcomingEvents: 2,
    completedEvents: 10,
    favoriteCategory: "Technology",
  }

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
              <Link href="/events" className="text-gray-600 hover:text-blue-600 transition-colors">
                Events
              </Link>
              <Link href="/dashboard" className="text-blue-600 font-medium">
                My Bookings
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage your event bookings and preferences</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{userStats.totalEvents}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{userStats.upcomingEvents}</div>
              <div className="text-sm text-gray-600">Upcoming</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{userStats.completedEvents}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-orange-600 mb-1">{userStats.favoriteCategory}</div>
              <div className="text-sm text-gray-600">Favorite</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 h-32 md:h-auto">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          width={150}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="secondary">{event.category}</Badge>
                              <Badge
                                className={
                                  event.status === "confirmed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }
                              >
                                {event.status}
                              </Badge>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                {event.date} • {event.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                {event.location}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                Booking ID: {event.bookingId}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                            <Link href={`/events/${event.id}`}>
                              <Button variant="outline" size="sm" className="w-full md:w-auto bg-transparent">
                                View Details
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm" className="w-full md:w-auto bg-transparent">
                              <Download className="h-4 w-4 mr-2" />
                              Download Ticket
                            </Button>
                            <Button variant="outline" size="sm" className="w-full md:w-auto bg-transparent">
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming events</h3>
                  <p className="text-gray-600 mb-4">You don't have any upcoming events booked.</p>
                  <Link href="/events">
                    <Button>Browse Events</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 h-32 md:h-auto">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        width={150}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary">{event.category}</Badge>
                            <Badge className="bg-gray-100 text-gray-700">{event.status}</Badge>
                            {event.rating && (
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{event.rating}</span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              {event.date} • {event.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                          <Button variant="outline" size="sm" className="w-full md:w-auto bg-transparent">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Write Review
                          </Button>
                          <Button variant="outline" size="sm" className="w-full md:w-auto bg-transparent">
                            <Download className="h-4 w-4 mr-2" />
                            Certificate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <Card>
              <CardContent className="p-8 text-center">
                <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorite events yet</h3>
                <p className="text-gray-600 mb-4">Start adding events to your favorites to see them here.</p>
                <Link href="/events">
                  <Button>Discover Events</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
