"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, Star, Download, Share2, MessageCircle, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs"

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
      <div className="container mx-auto px-4 py-8">
        {/* SignedOut View */}
        <SignedOut>
          <div className="bg-white rounded-xl border shadow-md p-8 text-center max-w-xl mx-auto mt-20">
            <Lock className="mx-auto h-10 w-10 text-gray-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">You're not signed in</h2>
            <p className="text-gray-600 mb-6">Sign in or create an account to view your dashboard and manage bookings.</p>
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

        {/* SignedIn View */}
        <SignedIn>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
            <p className="text-gray-600">Manage your event bookings and preferences</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-blue-600">{userStats.totalEvents}</div><div className="text-sm text-gray-600">Total Events</div></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{userStats.upcomingEvents}</div><div className="text-sm text-gray-600">Upcoming</div></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-purple-600">{userStats.completedEvents}</div><div className="text-sm text-gray-600">Completed</div></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><div className="text-lg font-bold text-orange-600">{userStats.favoriteCategory}</div><div className="text-sm text-gray-600">Favorite</div></CardContent></Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>

            {/* Upcoming Tab Content */}
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <EventCard event={event} key={event.id} />
                ))
              ) : (
                <NoEvents message="No upcoming events" buttonText="Browse Events" />
              )}
            </TabsContent>

            {/* Past Tab Content */}
            <TabsContent value="past" className="space-y-4">
              {pastEvents.map((event) => (
                <EventCard event={event} past key={event.id} />
              ))}
            </TabsContent>

            {/* Favorites Tab Content */}
            <TabsContent value="favorites" className="space-y-4">
              <NoEvents message="No favorite events yet" buttonText="Discover Events" icon={<Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />} />
            </TabsContent>
          </Tabs>
        </SignedIn>
      </div>
    </div>
  )
}

function NoEvents({ message, buttonText, icon }: { message: string, buttonText: string, icon?: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        {icon || <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{message}</h3>
        <p className="text-gray-600 mb-4">You currently have nothing here.</p>
        <Link href="/events">
          <Button>{buttonText}</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

function EventCard({ event, past = false }: { event: any, past?: boolean }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-48 h-32 md:h-auto">
            <Image src={event.image || "/placeholder.svg"} alt={event.title} width={150} height={100} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary">{event.category}</Badge>
                  <Badge className={`bg-${event.status === "confirmed" ? "green" : "gray"}-100 text-${event.status === "confirmed" ? "green" : "gray"}-700`}>
                    {event.status}
                  </Badge>
                  {past && event.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{event.rating}</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" />{event.date} • {event.time}</div>
                  <div className="flex items-center"><MapPin className="h-4 w-4 mr-2" />{event.location}</div>
                  {!past && <div className="flex items-center"><Clock className="h-4 w-4 mr-2" />Booking ID: {event.bookingId}</div>}
                </div>
              </div>
              <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                <Link href={`/events/${event.id}`}>
                  <Button variant="outline" size="sm" className="w-full md:w-auto">View Details</Button>
                </Link>
                <Button variant="outline" size="sm" className="w-full md:w-auto"><Download className="h-4 w-4 mr-2" />{past ? "Certificate" : "Download Ticket"}</Button>
                {past
                  ? <Button variant="outline" size="sm" className="w-full md:w-auto"><MessageCircle className="h-4 w-4 mr-2" />Write Review</Button>
                  : <Button variant="outline" size="sm" className="w-full md:w-auto"><Share2 className="h-4 w-4 mr-2" />Share</Button>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
