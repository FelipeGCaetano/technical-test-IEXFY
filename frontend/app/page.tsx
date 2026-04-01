'use client'

import { useState, useEffect } from 'react'
import { DashboardSummary } from '@/components/DashboardSummary'
import { Loader2, AlertCircle, TrendingUp, Notebook } from 'lucide-react'
import { DashboardData } from '@/lib/types/dashboard'
import { SummaryCard } from '@/components/SummaryCard'
import { OpportunityFilteredStatus } from '@/lib/types/opportunity'

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/dashboard/resumo')

        if (!response.ok) {
          throw new Error('Falha ao carregar os dados do dashboard')
        }

        const dashboardData: DashboardData = await response.json()

        setData(dashboardData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro inesperado')
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">

        <header className="mb-10">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-indigo-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Dashboard de Oportunidades</h1>
          </div>
          <p className="text-gray-500 mt-2">Acompanhe métricas das oportunidades.</p>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <DashboardSummary data={data} loading={isLoading} />

        {isLoading ? (
          <section className="mt-12 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="text-lg font-medium">Preparando a lista de oportunidades...</p>
            </div>
          </section>
        ) : (
          <div className='flex flex-row gap-4'>
            {data?.summary?.map((card, index) => (
              <SummaryCard label={OpportunityFilteredStatus[card.status]} value={card.totalValue} quantity={card.totalQuantity} icon={Notebook} colorClass='text-red-500' size="w-1/5" isLoading={false} key={index} />
            ))}
          </div>
        )
        }

      </div>
    </main>
  )
}