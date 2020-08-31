import { Component, OnInit } from '@angular/core';

import { LoanService } from '../../services/loan.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import LoanState from 'src/app/redux/loan.state';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'amount', 'edit'];

  loans$: Observable<Loan[]>;

  constructor(
    private loanService: LoanService,
    private router: Router,
    private store: Store<LoanState>
  ) {
  }

  ngOnInit(): void {

    this.loanService.getLoans().subscribe(
      (data) => {
        this.dataSource.data = data;

        const dataStore = this.store.pipe(select(d => d.loan));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadCreate(): void {
    this.router.navigateByUrl('/createloan');
  }

  editLoan(id: number): void {
    this.router.navigate(['/editloan', id]);
  }

}
