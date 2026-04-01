import { OpportunityStatus } from "./dashboard";

export interface Opportunity {
  id: string;
  client: { name: string };
  value: number;
  status: OpportunityStatus;
  createdAt: string;
}

export const OpportunityFilteredStatus = {
  "OPEN": "Em Aberto",
  "NEGOTIATING": "Em negociação",
  "WON": "Fechado",
  "LOST": "Perdido",
  "CANCELED": "Cancelado"
}