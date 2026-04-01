import { NextResponse } from 'next/server'

export async function GET() {
    const backendUrl = process.env.BACKEND_URL
    const basePath = process.env.BASE_PATH

    try {
        const response = await fetch(`${backendUrl}${basePath}/dashboard/resumo`)
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Erro de conexão' }, { status: 500 })
    }
}