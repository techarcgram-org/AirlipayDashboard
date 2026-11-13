export const REGION_OPTIONS = [
  { value: 'adamaoua', label: 'Adamaoua' },
  { value: 'centre', label: 'Centre' },
  { value: 'east', label: 'East' },
  { value: 'farNorth', label: 'Far North' },
  { value: 'littoral', label: 'Littoral' },
  { value: 'north', label: 'North' },
  { value: 'northwest', label: 'Northwest' },
  { value: 'west', label: 'West' },
  { value: 'south', label: 'South' },
  { value: 'southwest', label: 'Southwest' },
];

export const SEX_OPTIONS = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
];

export const BANK_OPTIONS = [
  { value: 'afriland_first_bank', label: 'Afriland First Bank' },
  { value: 'banque_atlantique', label: 'Banque Atlantique' },
  { value: 'bicec', label: 'BICEC' },
  { value: 'bnc', label: 'Banque Nationale de Crédit (BNC)' },
  { value: 'bsic', label: 'BSIC' },
  { value: 'cbc', label: 'Commercial Bank of Cameroon (CBC)' },
  { value: 'ecobank', label: 'Ecobank Cameroon' },
  { value: 'equity_bank', label: 'Equity Bank Cameroon' },
  { value: 'standard_chartered_bank', label: 'Standard Chartered Bank Cameroon' },
  { value: 'ubc', label: 'Union Bank of Cameroon (UBC)' },
];

export function optionLabel(options, value) {
  if (value === null || value === undefined || value === '') return '—';
  return options.find((option) => String(option.value) === String(value))?.label || value;
}
