import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export const GET = async (req) => {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
        }

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        const [rows] = await connection.execute(
            "SELECT category, image_name, image_path FROM images WHERE id = ?",
            [id]
        );
        await connection.end();

        if (rows.length === 0) {
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        return NextResponse.json({ name: rows[0].image_name, path: rows[0].image_path });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
