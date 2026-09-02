export interface HeaderProperties {
  title: string;
  description: string;
}

export interface PersonalForm {
  dateOfBirth: Date | null;
  status: '';
}

export interface IncomeAndPartnerForm {
  income: number;
  partner: boolean | null;
  incomePartner: number | null;
}

export interface LivingForm {
  previousHouse: boolean;
  debt: number;
  savings: number;
}
