import { Calculation } from './calculation';
import { MortgageFormData } from './mortgage-form-data';

export interface FullCalculation {
  showError: boolean;
  formData: Partial<MortgageFormData>;
  calculation: Calculation;
}
