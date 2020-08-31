import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import LoanState from 'src/app/redux/loan.state';

import { Store } from '@ngrx/store';
import * as loandActions from '../../redux/loan.actions';

import { Loan } from 'src/app/models/loan.model';


@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css']
})
export class CreateLoanComponent implements OnInit {

  LoanForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loanService: LoanService,
    private store: Store<LoanState>
  ) { }

  ngOnInit(): void {
    this.LoanForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  getErrorMessage(): string {
    if (this.LoanForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.LoanForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit(): void {
    const result: Loan = this.LoanForm.value;

    if (this.LoanForm.valid) {
      this.loanService.createLoan(result).subscribe(
        (response) => {
          this.store.dispatch(new loandActions.AddLoan(response));
          this.LoanForm.reset();
          this.router.navigateByUrl('/home');
        },
        (error) => {
          console.log(error);
          this.LoanForm.reset();
        }
      );
    }
  }

}
