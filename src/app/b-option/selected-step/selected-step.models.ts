export interface HeaderProperties {
  title: string;
  description: string;
}

export interface PersonalForm {
  dateOfBirth: Date | null;
  status: '';
}

export interface IncomeAndPartnerForm {
  income: number | null;
  partner: boolean | null;
  incomePartner: number | null;
}

export interface LivingForm {
  previousHouse: boolean;
  debt: boolean;
  savings: number;
}
