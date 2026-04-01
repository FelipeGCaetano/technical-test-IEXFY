import { Trash2, Edit, Loader2, User, MapPin, Phone } from 'lucide-react'
import { Client } from '@/lib/types/client'

interface ClientTableProps {
    clients: Client[]
    isLoading: boolean
    onEdit: (client: Client) => void
    onDelete: (id: string) => void
}

export const ClientTable = ({ clients, isLoading, onEdit, onDelete }: ClientTableProps) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-600">
                <Loader2 className="animate-spin mb-2 text-indigo-600" size={32} />
                <p className="font-medium">Carregando clientes...</p>
            </div>
        )
    }

    const handleDeleteClick = (client: Client) => {
        const confirmed = window.confirm(`Tem certeza que deseja excluir o cliente "${client.name}"? TODAS as oportunidades relacionadas a este cliente serão deletadas. Esta ação não pode ser desfeita.`)

        if (confirmed) {
            onDelete(client.id)
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="text-xs uppercase text-slate-700 font-bold tracking-wider">
                        <th className="px-6 py-4">Cliente</th>
                        <th className="px-6 py-4">Documento</th>
                        <th className="px-6 py-4">Contato</th>
                        <th className="px-6 py-4 text-center">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {clients.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-10 text-center text-slate-500 font-medium">
                                Nenhum cliente encontrado.
                            </td>
                        </tr>
                    ) : (
                        clients.map((client) => (
                            <tr key={client.id} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">{client.name}</div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                                <MapPin size={12} /> {client.address.split(',')[0]}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                    {client.cpfCnpj}
                                </td>

                                <td className="px-6 py-4">
                                    <div className="text-sm text-slate-700 flex items-center gap-2">
                                        <Phone size={14} className="text-slate-400" />
                                        {client.phone}
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => onEdit(client)}
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                            title="Editar"
                                        >
                                            <Edit size={18} />
                                        </button>

                                        <button
                                            onClick={() => handleDeleteClick(client)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                            title="Excluir"
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