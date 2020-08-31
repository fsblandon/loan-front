import { Loan } from '../models/loan.model';
import * as LoanActions from '../redux/loan.actions';

import LoanState, { initializeState } from '../redux/loan.state';

export const intialState = initializeState();

export function reducer(state: Loan[] = [], action: LoanActions.ClassActions ): any {
    switch (action.type) {
        case LoanActions.LoanActionTypes.ADDLOAN: {
            return [...state, action.payload];
        }
        case LoanActions.LoanActionTypes.UPDATELOAN: {
            const obj = [
                ...state,
                action.payload
            ];

            return obj.filter(t => t === action.payload);

        }
        case LoanActions.LoanActionTypes.DELETELOAN: {
            state.splice(action.payload, 1);
            return state;
        }
        case LoanActions.LoanActionTypes.GETLOAN: {
            state.filter(t => t.id === action.payload);
            return state;
        }

        default: {
            return state;
        }
    }
}
