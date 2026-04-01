import { Trash2, Eye, Edit, Loader2 } from 'lucide-react'
import { Opportunity, OpportunityFilteredStatus } from '@/lib/types/opportunity'

interface Props {
  opportunities: Opportunity[]
  isLoading: boolean
  onDelete: (id: string) => void
}

export const OpportunityTable = ({ opportunities, isLoading, onDelete }: Props) => {
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
            <th className="px-6 py-4">ID do Cliente</th>
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
                  {opp.clientId}
                </td>
                <td className="px-6 py-4 font-bold text-slate-900">
                  {new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  }).format(opp.value)}
                </td>
                <td className="px-6 py-4">
                   <span className="text-slate-800 font-medium">{OpportunityFilteredStatus[opp.status]}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">
                  {new Date(opp.createdAt).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button className="text-slate-600 hover:text-indigo-600 transition-colors" title="Ver Detalhes">
                      <Eye size={18} />
                    </button>
                    <button className="text-slate-600 hover:text-blue-600 transition-colors" title="Editar">
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