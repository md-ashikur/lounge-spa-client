import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("image");
    const category = formData.get("category"); // Fetch the category from the form data

    if (!file || !category) {
      return NextResponse.json(
        { error: "Missing file or category" },
        { status: 400 }
      );
    }

    // Define folder path based on category
    let folder = "images";
    if (category === "gallery") folder = "images/gallery";
    else if (category === "spa") folder = "images/icons/spa";
    else if (category === "catering") folder = "images/icons/catering";
    else if (category === "souvenirs") folder = "images/icons/Souvenirs";
    else if (category === "logements") folder = "images/icons/logements";
    else if (category === "activities") folder = "images/icons/activities";

    // Resolve full path
    const uploadDir = path.join(process.cwd(), "public", folder);

    // Ensure the directory exists
    await mkdir(uploadDir, { recursive: true });

    const buffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);
    const imageName = `${Date.now()}-${file.name}`;
    const imagePath = path.join(uploadDir, imageName);

    // Save file in the correct folder
    await writeFile(imagePath, imageBuffer);

    // Store path in MySQL
    const dbPath = `/${folder}/${imageName}`;
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Insert data into the database with the correct category
    await connection.execute(
      "INSERT INTO images (category, image_name, image_path) VALUES (?, ?, ?)",
      [category, imageName, dbPath]
    );

    const [rows] = await connection.execute("SELECT LAST_INSERT_ID() as id");
    const imageId = rows[0].id;
    await connection.end();

    return NextResponse.json({
      message: "Image uploaded!",
      path: dbPath,
      id: imageId,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};