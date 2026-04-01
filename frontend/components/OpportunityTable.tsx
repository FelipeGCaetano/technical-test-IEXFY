import { Opportunity } from '@/lib/types/opportunity';

interface Props {
    opportunities: Opportunity[];
    isLoading: boolean;
}

export const OpportunityTable = ({ opportunities, isLoading }: Props) => {
    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Carregando oportunidades...</div>
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                    <tr>
                        <th className="px-6 py-4 font-semibold">Cliente</th>
                        <th className="px-6 py-4 font-semibold">Valor</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Data</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {opportunities.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                                Nenhuma oportunidade encontrada.
                            </td>
                        </tr>
                    ) : (
                        opportunities.map((opp) => (
                            <tr key={opp.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{opp.client.name}</td>
                                <td className="px-6 py-4">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(opp.value)}
                                </td>
                                <td className="px-6 py-4 text-sm">{opp.status}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(opp.createdAt).toLocaleDateString('pt-BR')}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}