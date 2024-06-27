import {NextResponse} from "next/server";
import {db} from '../../../db/db.js'

export async function GET() {
    const result = await db.$queryRaw`SELECT id, name, email FROM Users ORDER BY 1 `
    return NextResponse.json(result);
}

export async function POST(request) {
    const data = await request.json()
    const newUser = await  db.$queryRaw`INSERT INTO users(name, email) 
                                        VALUES (${data.name}, ${data.email});`
    return NextResponse.json(newUser);
}

export async function DELETE(request) {
    const data = await request.json()
    const deleteUser = await db.$queryRaw`DELETE FROM users WHERE id = ${data.id}`
    return NextResponse.json(deleteUser);
}

export async function PUT(request) {
    const data = await request.json()
    const result = await db.$executeRaw`UPDATE users
                                        SET name = ${data.name},
                                        email = ${data.email}
                                        WHERE id = ${data.id};`
    return NextResponse.json(data);
}
