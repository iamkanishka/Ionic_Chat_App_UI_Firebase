import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule],
})
export class LoginPageRoutingModule {}
