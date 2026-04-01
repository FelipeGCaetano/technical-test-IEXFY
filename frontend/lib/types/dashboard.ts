import { LucideIcon } from 'lucide-react';

export type OpportunityStatus = 'OPEN' | 'NEGOTIATING' | 'WON' | 'LOST' | 'CANCELED'

export interface SummaryItem {
  status: OpportunityStatus,
  totalQuantity: number,
  totalValue: number,
}

export interface DashboardData {
  summary: SummaryItem[],
  totalGeneral: number,
}

export interface SummaryCardProps {
    label: string;
    value: number;
    quantity: number;
    icon: LucideIcon;
    colorClass: string;
    isLoading?: boolean;
}