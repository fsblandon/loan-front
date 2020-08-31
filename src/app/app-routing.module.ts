import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from '../app/views/home/home.component';
import { CreateLoanComponent } from '../app/views/create-loan/create-loan.component';
import { EditLoanComponent } from '../app/views/edit-loan/edit-loan.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'createloan',
    component: CreateLoanComponent
  },
  {
    path: 'editloan/:id',
    component: EditLoanComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
