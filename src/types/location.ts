export interface FilterState {
  regions: string[];
  managers: string[];
  feeStatus: string[];
}

export interface Location {
  id: string;
  name: string;
  region: string;
  manager: string;
  openingBalance: string;
  remainingBalance: string;
  amountMopped: string;
  feeStatus: string;
}
