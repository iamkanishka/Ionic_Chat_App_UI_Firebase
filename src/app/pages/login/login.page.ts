import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage   {

  loginForm!: FormGroup;
  isTypePassword: boolean = true;
  isLoading:boolean=false


  constructor(private readonly router: Router, private formBuilder: FormBuilder,private authService:AuthService,private alertController:AlertController ) {
    this.initForm();
  }



  initForm() {
    this.loginForm =this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });


    
  }

  get f(){
   return this.loginForm.controls;
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {
    if(this.loginForm.invalid) return;
   this.logUser();
  }


  logUser(){
    this.isLoading =true;
    this.authService.login(this.loginForm.value.email,this.loginForm.value.password).then((response:any)=>{
    this.isLoading =false;
     console.log(response);

     this.router.navigate(['/home']);
     this.showAlert('User Logged Successfully')
     this.loginForm.reset();
   }).catch(e=>{
    console.log(e)
    this.isLoading =false;

    let msg : string =  `Couldn't Login, Please try Again`;
    if(e.code==='auth/user-not-found')  msg = 'E-mail address could not be found';
    else if(e.code==='auth/wrong-password')  msg = 'Please enter Correct Password';

    this.showAlert(msg)

   })
  }

  async showAlert(message:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      //subHeader: 'Important message',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
