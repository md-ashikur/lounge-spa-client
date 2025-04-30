import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export const POST = async (req) => {
  try {
    const formData = await req.formData();

    // Extract data from formData
    const discount = formData.get("discount");
    const couponCode = formData.get("couponCode");
    const messageTotalPrice = formData.get("messageTotalPrice");
    const category = formData.get("category");
    const bookedDate = formData.get("bookedDate");
    const booked_slot = formData.get("booked_slot");
    const totalPrice = formData.get("totalPrice");

    const name = formData.get("name");
    const sureName = formData.get("sureName");
    const country = formData.get("country");
    const postalCode = formData.get("postalCode");
    const laneNumber = formData.get("laneNumber");
    const address = formData.get("address");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const note = formData.get("note");

    // Check for missing fields
    if (
      !name ||
      !email ||
      !phone ||
      !bookedDate ||
      !booked_slot ||
      !totalPrice
    ) {
      console.error("Missing required fields:", {
        name,
        email,
        phone,
        bookedDate,
        booked_slot,
        totalPrice,
      });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to the database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("Database connected successfully");

    // Insert data into bookings table
    const query = `
      INSERT INTO bookings (
        token,
        category,
        email,
        phone_number,
        name,
        booking_date,
        booked_slot,
        payment_status,
        total_amount,
        discount,
        coupon_code,
        note
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const token = Math.random().toString(36).substr(2, 9); // Generate a random token
    const paymentStatus = "pending"; // Default payment status

    console.log("Executing query with data:", {
      token,
      category,
      email,
      phone,
      name: `${name} ${sureName}`,
      bookedDate,
      booked_slot,
      paymentStatus,
      totalPrice,
      discount,
      couponCode,
      note,
    });

    await connection.execute(query, [
      token,
      category,
      email,
      phone,
      `${name} ${sureName}`,
      bookedDate,
      booked_slot,
      paymentStatus,
      totalPrice,
      discount,
      couponCode,
      note,
    ]);

    await connection.end();
    console.log("Booking saved successfully");

    return NextResponse.json({ message: "Booking saved successfully" });
  } catch (error) {
    console.error("Error saving booking:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};