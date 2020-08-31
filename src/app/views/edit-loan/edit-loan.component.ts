import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { Store } from '@ngrx/store';

import LoanState from 'src/app/redux/loan.state';

import { Loan } from 'src/app/models/loan.model';

import * as loandActions from '../../redux/loan.actions';


@Component({
  selector: 'app-edit-loan',
  templateUrl: './edit-loan.component.html',
  styleUrls: ['./edit-loan.component.css']
})
export class EditLoanComponent implements OnInit {

  LoanForm: FormGroup;

  idLoan: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loanService: LoanService,
    private store: Store<LoanState>,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe((p: Params) => {
      this.idLoan = p['id'];
      console.log(this.idLoan);
    });

    this.loanService.getLoan(this.idLoan).subscribe(
      (data) => {
        this.LoanForm = this.formBuilder.group({
          name: [data.name.toString().valueOf(), Validators.required],
          email: [data.email.toString().valueOf(), [Validators.required, Validators.email]],
          phone: [data.phone.toString().valueOf(), Validators.required],
          amount: [data.amount, Validators.required]
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getErrorMessage(): string {
    if (this.LoanForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.LoanForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  onEdit(): void {
    const result: Loan = this.LoanForm.value;

    if (this.LoanForm.valid) {
      debugger;
      this.store.dispatch(new loandActions.UpdateLoan(result));
      const id = Number(this.idLoan);
      this.loanService.editLoan(id, result).subscribe(
        (response) => {
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
