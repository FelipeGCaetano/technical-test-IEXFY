'use client'

import { useState, useEffect } from 'react'
import { PaginatedResponse, Opportunity } from '@/lib/types/opportunity'
import { OpportunityTable } from '@/components/OpportunityTable'
import { Filter, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { EditOpportunityModal } from '@/components/modals/EditOpportunityModal'
import { CreateOpportunityModal } from '@/components/modals/CreateOpportunityModal'

export default function OportunidadesPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [data, setData] = useState<PaginatedResponse<Opportunity> | null>(null)
    const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null)
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
                clientDetails: "true",
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
        if (!window.confirm("Tem certeza que deseja deletar?")) return
        try {
            const response = await fetch(`/api/oportunidades/${id}`, { method: 'DELETE' })
            if (response.ok) {
                fetchOpportunities()
            }
        } catch (error) {
            alert("Não foi possível deletar a oportunidade.")
        }
    }

    return (
        <div className="space-y-6 pb-10">
            {/* HEADER AJUSTADO: Botão e Filtro organizados à direita */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestão de Oportunidades</h1>
                    <p className="text-gray-500 text-sm">Visualize e filtre todas as negociações em curso.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                    {/* Botão Nova Oportunidade (Agora no Header) */}
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95"
                    >
                        <Plus size={20} />
                        Nova Oportunidade
                    </button>

                    {/* Filtro de Status */}
                    <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm h-[44px]">
                        <Filter size={18} className="text-gray-400 ml-2" />
                        <select
                            value={status}
                            onChange={(e) => { setStatus(e.target.value); setPage(1) }}
                            className="text-sm font-medium text-black outline-none bg-transparent pr-4 cursor-pointer"
                        >
                            <option value="">Todos os Status</option>
                            <option value="OPEN">Aberta</option>
                            <option value="NEGOTIATING">Em Negociação</option>
                            <option value="WON">Fechado</option>
                            <option value="LOST">Perdida</option>
                            <option value="CANCELED">Cancelada</option>
                        </select>
                    </div>
                </div>
            </header>

            {/* MODAIS */}
            <CreateOpportunityModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={fetchOpportunities}
            />

            {editingOpportunity && (
                <EditOpportunityModal
                    opportunity={editingOpportunity}
                    isOpen={!!editingOpportunity}
                    onClose={() => setEditingOpportunity(null)}
                    onSuccess={fetchOpportunities}
                />
            )}

            {/* TABELA E PAGINAÇÃO */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <OpportunityTable
                    opportunities={data?.items || []}
                    isLoading={isLoading}
                    onEdit={(opp: Opportunity) => setEditingOpportunity(opp)}
                    onDelete={handleDeleteOpportunity}
                />

                {/* PAGINAÇÃO: Removi o check de totalPages > 1 para você ver ela sempre, 
                    ou você pode manter se tiver certeza que os dados estão vindo com totalPages > 1 */}
                {data && (
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <span className="text-sm text-gray-500 font-medium">
                            Página {data.currentPage} de {data.totalPages} ({data.totalItems} itens)
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || isLoading}
                                className="p-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-30 transition-colors shadow-sm"
                            >
                                <ChevronLeft size={20} className="text-gray-600" />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                                disabled={page === data.totalPages || isLoading}
                                className="p-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-30 transition-colors shadow-sm"
                            >
                                <ChevronRight size={20} className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}