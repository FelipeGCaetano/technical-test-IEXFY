import { useState, useEffect } from 'react'
import { OpportunityStatus } from '@/lib/types/dashboard'
import { Opportunity } from '@/lib/types/opportunity'
import { Client } from '@/lib/types/client'

interface Props {
    opportunity: Opportunity
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export const EditOpportunityModal = ({ opportunity, isOpen, onClose, onSuccess }: Props) => {
    const [value, setValue] = useState<number | string>(opportunity.value)
    const [status, setStatus] = useState<OpportunityStatus>(opportunity.status)
    const [clientId, setClientId] = useState(opportunity.clientId)
    const [clients, setClients] = useState<Client[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoadingClients, setIsLoadingClients] = useState(true)

    useEffect(() => {
        if (!isOpen) return

        async function loadClients() {
            try {
                setIsLoadingClients(true)
                const res = await fetch('/api/clients')
                const data = await res.json()
                setClients(data.items || [])
            } catch (error) {
                console.error("Erro ao carregar clientes")
            } finally {
                setIsLoadingClients(false)
            }
        }

        loadClients()
    }, [isOpen])

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await fetch(`/api/oportunidades/${opportunity.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    value: Number(value),
                    status,
                    clientId
                }),
            })

            if (res.ok) {
                onSuccess()
                onClose()
            }
        } catch (error) {
            alert("Erro ao atualizar oportunidade")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Editar Oportunidade</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Cliente</label>
                        <select
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            disabled={isLoadingClients}
                            className="w-full border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 disabled:opacity-50"
                            required
                        >
                            {isLoadingClients ? (
                                <option>Carregando clientes...</option>
                            ) : (
                                clients.map(client => (
                                    <option key={client.id} value={client.id}>
                                        {client.name}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Valor (R$)</label>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => {
                                const val = e.target.value
                                setValue(val === "" ? "" : Number(val))
                            }}
                            onFocus={(e) => value === 0 && setValue("")}
                            className="w-full border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="0,00"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as OpportunityStatus)}
                            className="w-full border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="OPEN">Aberta</option>
                            <option value="NEGOTIATING">Negociando</option>
                            <option value="WON">Ganha</option>
                            <option value="LOST">Perdida</option>
                            <option value="CANCELED">Cancelada</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                        >
                            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}