import { Trash2, Eye, Edit, Loader2 } from 'lucide-react'
import { Opportunity, OpportunityFilteredStatus } from '@/lib/types/opportunity'
import { OpportunityStatus } from '@/lib/types/dashboard'

interface Props {
    opportunities: Opportunity[]
    isLoading: boolean
    onEdit: (opp: Opportunity) => void,
    onDelete: (id: string) => void
}

const getStatusStyles = (status: OpportunityStatus) => {
    const styles: Record<OpportunityStatus, string> = {
        OPEN: "bg-blue-50 text-blue-700 border-blue-200",
        NEGOTIATING: "bg-amber-50 text-amber-700 border-amber-200",
        WON: "bg-emerald-50 text-emerald-700 border-emerald-200",
        LOST: "bg-red-50 text-red-700 border-red-200",
        CANCELED: "bg-slate-100 text-slate-600 border-slate-300",
    }

    return styles[status] || "bg-gray-50 text-gray-600 border-gray-200"
}

export const OpportunityTable = ({ opportunities, isLoading, onDelete, onEdit }: Props) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-600">
                <Loader2 className="animate-spin mb-2" size={32} />
                <p>Carregando lista...</p>
            </div>
        )
    }

    const handleDeleteClick = (id: string) => {
        const confirmDelete = window.confirm("Tem certeza que deseja deletar esta oportunidade?")
        if (confirmDelete) {
            onDelete(id)
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="text-xs uppercase text-slate-700 font-bold tracking-wider">
                        <th className="px-6 py-4">Cliente</th>
                        <th className="px-6 py-4">Valor</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Criado em</th>
                        <th className="px-6 py-4 text-center">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {opportunities.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                                Nenhuma oportunidade encontrada.
                            </td>
                        </tr>
                    ) : (
                        opportunities.map((opp) => (
                            <tr key={opp.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs text-slate-800">
                                    {opp.client.name}
                                </td>
                                <td className="px-6 py-4 font-bold text-slate-900">
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(opp.value)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyles(opp.status)}`}>
                                        {OpportunityFilteredStatus[opp.status]}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                    {new Date(opp.createdAt).toLocaleDateString('pt-BR')}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-3">
                                        <button className="text-slate-600 hover:text-indigo-600 transition-colors" title="Ver Detalhes">
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            onClick={() => onEdit(opp)}
                                            className="text-slate-600 hover:text-blue-600 transition-colors"
                                            title="Editar"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(opp.id)}
                                            className="text-slate-600 hover:text-red-600 transition-colors"
                                            title="Deletar"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}