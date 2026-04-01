import { NextResponse } from 'next/server'

const backendUrl = process.env.BACKEND_URL
const basePath = process.env.BASE_PATH

export async function GET() {

  try {
    const response = await fetch(`${backendUrl}${basePath}/clients`)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar clientes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  const response = await fetch(`${backendUrl}${basePath}/clients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return NextResponse.json(data, { status: response.status })
}