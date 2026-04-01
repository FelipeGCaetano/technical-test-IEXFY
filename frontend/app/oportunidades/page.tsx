'use client'

import { useState, useEffect } from 'react'
import { PaginatedResponse, Opportunity } from '@/lib/types/opportunity'
import { OpportunityTable } from '@/components/OpportunityTable'
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react'

export default function OportunidadesPage() {
    const [data, setData] = useState<PaginatedResponse<Opportunity> | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const [status, setStatus] = useState<string>('')
    const [page, setPage] = useState(1)
    const limit = 10

    const fetchOpportunities = async () => {
        try {
            setIsLoading(true)
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                ...(status && { status })
            })

            const response = await fetch(`/api/oportunidades?${params.toString()}`)
            const result = await response.json()
            setData(result)
        } catch (error) {
            console.error("Erro ao carregar oportunidades:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchOpportunities()
    }, [page, status])

    const handleDeleteOpportunity = async (id: string) => {
        try {
            const response = await fetch(`/api/oportunidades/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Oportunidade deletada com sucesso!")
                fetchOpportunities()
            } else {
                throw new Error("Erro ao deletar")
            }
        } catch (error) {
            alert("Não foi possível deletar a oportunidade.")
        }
    }

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestão de Oportunidades</h1>
                    <p className="text-gray-500 text-sm">Visualize e filtre todas as negociações em curso.</p>
                </div>

                <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                    <Filter size={18} className="text-gray-400 ml-2" />
                    <select
                        value={status}
                        onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                        className="text-sm font-medium outline-none bg-transparent pr-4 cursor-pointer"
                    >
                        <option value="">Todos os Status</option>
                        <option value="OPEN">Aberta</option>
                        <option value="NEGOTIATING">Em Negociação</option>
                        <option value="WON">Ganha</option>
                        <option value="LOST">Perdida</option>
                        <option value="CANCELED">Cancelada</option>
                    </select>
                </div>
            </header>

            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <OpportunityTable
                    opportunities={data?.items || []}
                    isLoading={isLoading}
                    onDelete={handleDeleteOpportunity}
                />

                {data && data.totalPages > 1 && (
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <span className="text-sm text-gray-500">
                            Página {data.currentPage} de {data.totalPages} ({data.totalItems} itens)
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || isLoading}
                                className="p-2 border rounded-lg hover:bg-white disabled:opacity-30 transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                                disabled={page === data.totalPages || isLoading}
                                className="p-2 border rounded-lg hover:bg-white disabled:opacity-30 transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}