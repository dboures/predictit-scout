import { Contract } from "./contract.interface";

export interface Alert {
    marketName: string;
    contractName: string;
    indicator: string;
    operator: string;
    limit: number;
    constant: boolean;
  }