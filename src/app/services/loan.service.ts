import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Loan } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private baseURL = 'https://localhost:5001/api/loans';

  constructor(
    private http: HttpClient
  ) { }

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.baseURL);
  }

  getLoan(id: number): Observable<Loan> {
    return this.http.get<Loan>(this.baseURL + '/' + id);
  }

  createLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.baseURL,
      {
          Name: loan.name,
          Email: loan.email,
          Phone: loan.phone,
          Amount: loan.amount
      }
    );
  }

  editLoan(id: number, loan: Loan): Observable<any> {
    return this.http.put(this.baseURL + '/' + id,
      {
        Id: id,
        Name: loan.name,
        Email: loan.email,
        Phone: loan.phone,
        Amount: loan.amount
      }
    );
  }
}
