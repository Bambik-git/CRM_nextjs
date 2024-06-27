
import {NextResponse} from "next/server";
import {db} from '../../../db/db.js'



export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    if (!status || status==='Все') {
        const result = await db.$queryRaw`SELECT ts.id, date, updated_at, status, us.name as to_whom_user_id, usr.name as creator_user_id  FROM tasks ts
                                        left join users us on us.id = ts.to_whom_user_id
                                        left join users usr on usr.id = ts.creator_user_id
                                        ORDER BY ts.id ASC`
        return NextResponse.json(result);
    }   else {
        const result = await db.$queryRaw`SELECT ts.id, date, updated_at, status, us.name as to_whom_user_id, usr.name as creator_user_id  FROM tasks ts
                                        left join users us on us.id = ts.to_whom_user_id
                                        left join users usr on usr.id = ts.creator_user_id
                                        where status = ${status}
                                        ORDER BY ts.id ASC;`
        return NextResponse.json(result);
    }

}

export async function POST(request) {
    const data = await request.json()
    const newTaskData = await db.$queryRaw`INSERT INTO tasks(creator_user_id, to_whom_user_id, updated_at) VALUES (${data.creator_user_id}, ${data.to_whom_user_id}, now()); `
    return NextResponse.json(newTaskData);
}

export async function DELETE(request) {
    const data = await request.json()
    const deleteTask = await db.$queryRaw`DELETE FROM tasks WHERE id = ${data.id}`
    return NextResponse.json(deleteTask);
}

export async function PUT(request) {
    const data = await request.json()
    const result = await db.$executeRaw`  Update tasks
                                        set creator_user_id = (Select id FROM users WHERE name = ${data.data.creator_user_id}),
                                        to_whom_user_id = (Select id FROM users WHERE name = ${data.data.to_whom_user_id}),
                                        status = ${data.data.status}
                                        WHERE id = ${data.data.id}`
    return NextResponse.json(result);
}