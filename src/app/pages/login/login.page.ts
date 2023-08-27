import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage   {

  form!: FormGroup;
  isTypePassword: boolean = true;

  constructor(private readonly router: Router) {
    this.initForm();
  }



  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', 
        {validators: [Validators.required, Validators.email]}
      ),
      password: new FormControl('', 
        {validators: [Validators.required, Validators.minLength(8)]}
      ),
    });

    console.log(this.form.get('password')?.errors);
    
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {
    // if(!this.form.valid) return;
    // console.log(this.form.value);
    this.router.navigate(['/home'])
  }

}
