import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar, MapPin, Users, Star } from "lucide-react"

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
    image: "https://source.unsplash.com/1200x400/?technology,conference",
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
    image: "https://source.unsplash.com/1200x400/?culture,festival,colors",
    description: "Celebrate diversity with music, dance, food, and art from around the world.",
  },
]

export default function EventDetails({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id)

  if (!event) return notFound()

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border">
        {/* Banner Image */}
        <Image
          src={event.image}
          alt={event.title}
          width={1200}
          height={400}
          className="w-full h-64 sm:h-80 object-cover"
        />

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title and Rating */}
          <div className="flex justify-between items-center flex-wrap gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{event.title}</h1>
            <div className="flex items-center text-yellow-500">
              <Star className="h-5 w-5 fill-yellow-400 mr-1" />
              <span className="font-semibold">{event.rating}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            {event.description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-600">
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
            <div className="font-semibold text-blue-600 text-lg sm:text-xl">
              {event.price}
            </div>
          </div>

          {/* Optional: Call-to-action button */}
          <div className="pt-4">
            <button className="px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition">
              Book Event
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
