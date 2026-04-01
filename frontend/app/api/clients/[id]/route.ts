import { NextResponse } from 'next/server'

type RouteContext = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, context: RouteContext) {
    const { id } = await context.params
    const body = await request.json()
    const response = await fetch(`${process.env.BACKEND_URL}${process.env.BASE_PATH}/clients/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    const data = await response.json()
    return NextResponse.json(data)
}

export async function DELETE(request: Request, context: RouteContext) {
    const { id } = await context.params
    const response = await fetch(`${process.env.BACKEND_URL}${process.env.BASE_PATH}/clients/${id}`, {
        method: 'DELETE',
    })
    return new NextResponse(null, { status: response.status })
}