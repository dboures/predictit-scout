export interface Alert {
    marketName: string;
    contractName: string;
    indicator: string;
    operator: string;
    limit: number;
    // constant: boolean;
    openMarket: boolean;
  }