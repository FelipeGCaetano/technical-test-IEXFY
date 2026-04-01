import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const backendUrl = process.env.BACKEND_URL
  const basePath = process.env.BASE_PATH
  const { id } = await params
  console.log(id)
  try {
    const response = await fetch(`${backendUrl}${basePath}/oportunidades/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Erro no backend' }, { status: response.status })
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro de conexão' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  const backendUrl = process.env.BACKEND_URL
  const basePath = process.env.BASE_PATH

  try {
    const response = await fetch(`${backendUrl}${basePath}/oportunidades/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 })
  }
}