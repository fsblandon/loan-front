import { Action } from '@ngrx/store';
import { Loan } from '../models/loan.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum LoanActionTypes {
    ADDLOAN = '[Loan] AddLoan',
    UPDATELOAN = '[Loan] UpdateLoan',
    DELETELOAN = '[Loan] DeleteLoan',
    GETLOAN = '[Loan] GetLoan',
    LOAD = '[Loan] Load'
}

export class AddLoan implements Action {
    readonly type = LoanActionTypes.ADDLOAN;

    constructor(public payload: Loan) { }
}

export class UpdateLoan implements Action {
    readonly type = LoanActionTypes.UPDATELOAN;

    constructor(public payload: Loan){}
}

export class DeleteLoan implements Action {
    readonly type = LoanActionTypes.DELETELOAN;

    constructor(public payload: number) { }
}

export class GetLoan implements Action {
    readonly type = LoanActionTypes.GETLOAN;

    constructor(public payload: number) { }
}

export class Load implements Action {
    readonly type = LoanActionTypes.LOAD;

    constructor() { }
  }


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ClassActions = AddLoan| UpdateLoan | DeleteLoan | GetLoan;