"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MapPin, Users, Star, Clock, Share2, Heart, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function EventDetailPage() {
  const params = useParams()
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  })

  // Mock event data - in real app, this would be fetched based on params.id
  const event = {
    id: params.id,
    title: "Tech Innovation Summit 2024",
    date: "March 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "MEI Auditorium",
    category: "Technology",
    price: "Free",
    originalPrice: "₹500",
    attendees: 250,
    maxAttendees: 300,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Join industry leaders and innovators for a day of cutting-edge technology discussions, networking opportunities, and hands-on workshops. This summit brings together the brightest minds in technology to share insights on AI, blockchain, IoT, and the future of digital innovation.",
    highlights: [
      "Keynote speeches from industry leaders",
      "Interactive workshops and demos",
      "Networking lunch and coffee breaks",
      "Certificate of participation",
      "Access to exclusive resources",
    ],
    schedule: [
      { time: "9:00 AM", activity: "Registration & Welcome Coffee" },
      { time: "10:00 AM", activity: "Opening Keynote: Future of AI" },
      { time: "11:30 AM", activity: "Panel Discussion: Blockchain Revolution" },
      { time: "1:00 PM", activity: "Networking Lunch" },
      { time: "2:30 PM", activity: "Workshop: IoT Development" },
      { time: "4:00 PM", activity: "Closing Remarks & Networking" },
    ],
    organizer: {
      name: "MEI Tech Club",
      image: "/placeholder.svg?height=50&width=50",
      rating: 4.9,
      events: 25,
    },
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBookingConfirmed(true)
    setTimeout(() => {
      setIsBookingOpen(false)
      setIsBookingConfirmed(false)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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
        {/* Back Button */}
        <Link href="/events" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="relative mb-8">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                width={600}
                height={400}
                className="w-full h-64 md:h-80 object-cover rounded-xl"
              />
              <Badge className="absolute top-4 left-4 bg-white/90 text-gray-700">{event.category}</Badge>
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{event.rating}</span>
                    <span className="ml-1">({event.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>
                      {event.attendees}/{event.maxAttendees} attendees
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 p-4 bg-white rounded-lg border">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">{event.date}</div>
                    <div className="text-sm text-gray-600">{event.time}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">{event.location}</div>
                    <div className="text-sm text-gray-600">MEI University</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">8 hours</div>
                    <div className="text-sm text-gray-600">Full day event</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Get</h2>
                <ul className="space-y-2">
                  {event.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Schedule</h2>
                <div className="space-y-4">
                  {event.schedule.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg border">
                      <div className="text-blue-600 font-medium min-w-[80px]">{item.time}</div>
                      <div className="text-gray-900">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Book Your Spot</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{event.price}</div>
                      {event.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">{event.originalPrice}</div>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between mb-2">
                      <span>Available spots:</span>
                      <span className="font-medium">{event.maxAttendees - event.attendees}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3">
                        Book Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Book Your Spot</DialogTitle>
                      </DialogHeader>
                      {!isBookingConfirmed ? (
                        <form onSubmit={handleBooking} className="space-y-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                            <Textarea
                              id="specialRequests"
                              name="specialRequests"
                              value={formData.specialRequests}
                              onChange={handleInputChange}
                              rows={3}
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Confirm Booking
                          </Button>
                        </form>
                      ) : (
                        <div className="text-center py-8">
                          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h3>
                          <p className="text-gray-600">You'll receive a confirmation email shortly.</p>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <div className="text-xs text-gray-500 text-center">
                    Free cancellation up to 24 hours before the event
                  </div>
                </CardContent>
              </Card>

              {/* Organizer Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Organizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <Image
                      src={event.organizer.image || "/placeholder.svg"}
                      alt={event.organizer.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{event.organizer.name}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {event.organizer.rating} • {event.organizer.events} events
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
