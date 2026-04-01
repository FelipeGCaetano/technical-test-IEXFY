import { SummaryCardProps } from "@/lib/types/dashboard"

export const SummaryCard = ({ label, value, quantity, icon: Icon, colorClass, isLoading, size }: SummaryCardProps) => {
    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-xl border border-gray-100 animate-pulse">
                <div className="h-4 w-20 bg-gray-200 rounded mb-4" />
                <div className="h-8 w-32 bg-gray-200 rounded" />
            </div>
        )
    }

    return (
        <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-transform hover:scale-105 mb-4 ${size}`}>
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">{label}</span>
                <Icon className={colorClass} size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
            </div>
            <p className="text-sm text-gray-400 mt-2">{quantity} Oportunidades</p>
        </div>
    )
}