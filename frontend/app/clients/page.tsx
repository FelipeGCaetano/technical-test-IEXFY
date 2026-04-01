'use client'

import { useState, useEffect } from 'react'
import { Client } from '@/lib/types/client'
import { ClientTable } from '@/components/ClientTable'
import { Plus, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { PaginatedResponse } from '@/lib/types/opportunity'
import { ClientModal } from '@/components/modals/ClientModal'

export default function ClientsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingClient, setEditingClient] = useState<Client | null>(null)
    const [data, setData] = useState<PaginatedResponse<Client> | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const limit = 10

    const fetchClients = async () => {
        try {
            setIsLoading(true)
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString()
            })

            const response = await fetch(`/api/clients?${params.toString()}`)
            const result = await response.json()
            setData(result)
        } catch (error) {
            console.error("Erro ao carregar clientes:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchClients()
    }, [page, searchTerm])

    const handleDeleteClient = async (id: string) => {
        try {
            const response = await fetch(`/api/clients/${id}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                fetchClients()
            } else {
                alert("Erro ao excluir cliente. Verifique se ele possui oportunidades vinculadas.")
            }
        } catch (error) {
            console.error("Erro na deleção:", error)
        }
    }

    const openEditModal = (client: Client) => {
        setEditingClient(client)
        setIsModalOpen(true)
    }

    const closeItems = () => {
        setIsModalOpen(false)
        setEditingClient(null)
    }

    const openCreateModal = () => {
        setEditingClient(null)
        setIsModalOpen(true)
    };

    return (
        <div className="space-y-6 pb-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Gestão de Clientes</h1>
                    <p className="text-slate-500 text-sm">Cadastre e gerencie a base de contatos do CRM.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95"
                    >
                        <Plus size={20} />
                        Novo Cliente
                    </button>
                </div>
            </header>

            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <ClientTable
                    clients={data?.items || []}
                    isLoading={isLoading}
                    onEdit={openEditModal}
                    onDelete={handleDeleteClient}
                />

                {data && (
                    <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <span className="text-sm text-slate-500 font-medium">
                            Exibindo {data.items.length} de {data.totalItems} clientes
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || isLoading}
                                className="p-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-30 transition-colors"
                            >
                                <ChevronLeft size={20} className="text-slate-600" />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                                disabled={page === data.totalPages || isLoading}
                                className="p-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-30 transition-colors"
                            >
                                <ChevronRight size={20} className="text-slate-600" />
                            </button>
                        </div>
                    </div>
                )}
            </section>

            <ClientModal
                isOpen={isModalOpen}
                onClose={closeItems}
                onSuccess={fetchClients}
                client={editingClient}
            />
        </div>
    )
}