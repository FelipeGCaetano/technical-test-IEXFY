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