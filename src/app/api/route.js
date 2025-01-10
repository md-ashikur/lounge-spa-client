import { NextResponse } from "next/server";

let bookings = [
  {
    id: "1",
    title: "Meeting with Client",
    start: "2025-01-12",
    end: "2025-01-12",
  },
  {
    id: "2",
    title: "Conference",
    start: "2025-01-15",
    end: "2025-01-16",
  },
];

export async function GET() {
  return NextResponse.json(bookings);
}

export async function POST(request) {
  try {
    const newBooking = await request.json();
    bookings.push(newBooking);
    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
