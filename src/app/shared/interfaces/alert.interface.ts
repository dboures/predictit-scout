import { Contract } from "./contract.interface";

export interface Alert {
    marketName: string;
    contract: Contract;
    operator: string;
    limit: number;
    constant: boolean;
  }