export interface Alert {
    marketId: number;
    marketName: string;
    contractName: string;
    contractId: number;
    indicator: string;
    operator: string;
    limit: number;
    openMarket: boolean;
    sent:boolean;
  }