export type HeaderProperties = {
  title: string;
  description: string;
};

export type PersonalForm = {
  dateOfBirth: Date | null;
  status: '';
};

export type IncomeAndPartnerForm = {
  income: number;
  partner: boolean | null;
  incomePartner: number | null;
};

export type LivingForm = {
  previousHouse: boolean;
  debt: number;
  savings: number;
};
