import { TrendingUp } from 'lucide-react';
import { SummaryCard } from './SummaryCard';
import { DashboardData } from '@/lib/types/dashboard';

interface Props {
    data: DashboardData | null
    loading: boolean
}

export const DashboardSummary = ({ data, loading }: Props) => {
    const totalQuantity = data?.summary.reduce((acc, curr) => acc + curr.totalQuantity, 0) ?? 0

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <SummaryCard
                label="Total Geral"
                value={data?.totalGeneral ?? 0}
                quantity={totalQuantity}
                icon={TrendingUp}
                colorClass="text-indigo-600"
                isLoading={loading}
            />
        </div>
    )
}