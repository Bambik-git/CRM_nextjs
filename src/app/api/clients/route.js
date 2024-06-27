import {NextResponse} from "next/server";
import {db} from '../../../db/db.js'
export async function GET() {
    const result = await db.$queryRaw`SELECT * FROM clients ORDER BY id ASC`
    return NextResponse.json(result);
}

export async function POST(request) {
    const data = await request.json()
    const newClient = await db.$queryRaw`INSERT INTO clients(name, tel, comment) 
                                            VALUES (${data.name}, ${data.tel}, ${data.comment});`
    return NextResponse.json(newClient);
}

export async function DELETE(request) {
    const data = await request.json()
    const deleteClient = await db.$queryRaw`DELETE FROM clients WHERE id = ${data.id}`
    return NextResponse.json(deleteClient);
}

export async function PUT(request) {
    const data = await request.json()
    const result = await db.$executeRaw`UPDATE clients 
                                        SET name = ${data.data.name},
                                        tel = ${data.data.tel},
                                        comment = ${data.data.comment}
                                        WHERE id = ${data.data.id};`
    return NextResponse.json(result);
}