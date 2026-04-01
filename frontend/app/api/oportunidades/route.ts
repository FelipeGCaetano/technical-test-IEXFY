import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const backendUrl = process.env.BACKEND_URL
    const basePath = process.env.BASE_PATH

    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()

    try {
        const response = await fetch(`${backendUrl}${basePath}/oportunidades?${queryString}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Erro ao buscar oportunidades no backend' },
                { status: response.status }
            )
        }

        const data = await response.json()

        return NextResponse.json(data)
    } catch (error) {
        console.error("Erro na Route API:", error)
        return NextResponse.json(
            { error: 'Falha na conexão com o servidor backend' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
  const backendUrl = process.env.BACKEND_URL
  const basePath = process.env.BASE_PATH

  try {
    const body = await request.json()

    const response = await fetch(`${backendUrl}${basePath}/oportunidades`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar oportunidade' }, { status: 500 })
  }
}