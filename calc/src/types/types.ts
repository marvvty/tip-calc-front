export interface ParticipantDto {
  name: string;
  custom_precent?: number;
  custom_amount?: number;
}

export interface CreateCheckDto {
  base_amount: number;
  tip_precent?: number;
  people_count: number;
  participants: ParticipantDto[];
}

export interface CalculationResult {
  tipAmount: number;
  total: number;
  participants: Array<{
    participant: {
      id: number;
      name: string;
      custom_precent?: number;
      custom_amount?: number;
      accountsId: number;
    };
    calculated_share: number;
  }>;
}

export interface CreatedAccount {
  id: number;
  base_amount: string;
  tip_precent?: number;
  people_count: number;
  participants: Array<{
    id: number;
    name: string;
    custom_precent?: number;
    custom_amount?: number;
    accountsId: number;
  }>;
}

export type UpdateCheckDto = Partial<CreateCheckDto>;
