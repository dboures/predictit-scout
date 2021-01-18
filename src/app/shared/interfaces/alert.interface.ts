import { Contract } from "./contract.interface";

export interface Alert {
    contract: Contract;
    operator: string;
    limit: number;
    constant: boolean;
  }