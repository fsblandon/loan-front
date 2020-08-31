
import { Loan } from '../models/loan.model';

export default class LoanState {
    loan: Loan | null;
}

export const initializeState = (): LoanState => {
  return { loan: new Loan() };
};
