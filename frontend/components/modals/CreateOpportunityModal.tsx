import { useState, useEffect } from 'react'
import { OpportunityStatus } from '@/lib/types/dashboard'

interface Client {
    id: string
    name: string
}

interface Props {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export const CreateOpportunityModal = ({ isOpen, onClose, onSuccess }: Props) => {
    const [value, setValue] = useState<number | string>("")
    const [status, setStatus] = useState<OpportunityStatus>("OPEN")
    const [clientId, setClientId] = useState("")
    const [clients, setClients] = useState<Client[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (!isOpen) return

        async function loadClients() {
            const res = await fetch('/api/clients')
            const data = await res.json()
            setClients(data.items || [])
            if (data.items?.length > 0) setClientId(data.items[0].id)
        }
        loadClients()
    }, [isOpen])

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await fetch('/api/oportunidades', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    value: Number(value),
                    status,
                    clientId
                }),
            })

            if (res.ok) {
                setValue("")
                onSuccess()
                onClose()
            }
        } catch (error) {
            alert("Erro ao criar oportunidade")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Nova Oportunidade</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Selecionar Cliente</label>
                        <select
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            className="w-full border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        >
                            <option value="" disabled>Escolha um cliente...</option>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Valor (R$)</label>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value === "" ? "" : Number(e.target.value))}
                            className="w-full border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Ex: 1500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Status Inicial</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as OpportunityStatus)}
                            className="w-full border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="OPEN">Aberta</option>
                            <option value="NEGOTIATING">Negociando</option>
                            <option value="WON">Fechado</option>
                            <option value="LOST">Perdida</option>
                            <option value="CANCELED">Cancelada</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-6">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !clientId}
                            className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all"
                        >
                            {isSubmitting ? 'Criando...' : 'Criar Oportunidade'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}