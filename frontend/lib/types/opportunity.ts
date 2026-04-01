import { OpportunityStatus } from "./dashboard";

export interface Opportunity {
  id: string;
  clientId: string;
  value: number;
  status: OpportunityStatus;
  createdAt: string;
  updatedAt: string;
}

export const OpportunityFilteredStatus = {
  "OPEN": "Em Aberto",
  "NEGOTIATING": "Em negociação",
  "WON": "Fechado",
  "LOST": "Perdido",
  "CANCELED": "Cancelado"
}

export interface PaginatedResponse<T> {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];
}