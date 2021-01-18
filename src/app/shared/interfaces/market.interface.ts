import { Contract } from "./contract.interface";

export interface Market {
    id: number;
    name: string;
    shortName: string;
    contracts: Contract[];
    isOpen: boolean;
  }