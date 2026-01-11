export interface MortgageCalculation {
  brutoInkomen: number;
  leeftijd: number;
  partner: boolean;
  brutoInkomenPartner: number | null;
  leeftijdPartner: number | null;
  previousHouse: boolean;
  spaargeld: boolean;
  totaalGespaard: number | null;
}
