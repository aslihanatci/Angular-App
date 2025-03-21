import { Certificate } from "./certificate";

export interface Crew {
    id?: number;
    firstName: string;
    lastName: string;
    nationality: string;
    title: string;
    daysOnBoard: number;
    dailyRate: number;
    currency: 'USD' | 'EUR';
    certificates?: Certificate[];
  }
  

  
