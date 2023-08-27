import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth/auth.service';
interface ISignup{
  email:string,
  password:string,
  userName:string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  isTypePassword: boolean = true;
  isLoading:boolean=false

  constructor(private authService:AuthService, private router:Router, private alertController: AlertController,
    
    private formBuilder: FormBuilder,
    ) {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.signupForm =this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f(){
  return  this.signupForm.controls;
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {
    if(!this.signupForm.valid) return;
    console.log(this.signupForm.value);
    this.register();
  }

  register(){
    this.isLoading =true;
    this.authService.register(this.signupForm.value).then((resposne:any)=>{
    this.isLoading =false;
     console.log(resposne);

     this.router.navigate(['/home']);
     this.showAlert('User Created Successfully')
     this.signupForm.reset();
   }).catch(e=>{
    console.log(e)
    this.isLoading =false;

    let msg : string =  `Couldn't Signup, Please try Again`;
    if(e.code==='auth/email-already-in-use'){
      msg = 'Email is already in Use'
    }
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
