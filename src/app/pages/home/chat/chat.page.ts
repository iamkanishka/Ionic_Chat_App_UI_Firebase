import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  isLoading:boolean=false;
  message:string=''
  userName:string =''
  constructor(private readonly activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe((params:any)=>{
      console.log(params);
  this.userName=params.name
      
    })
   }

  ngOnInit() {
  }
 
  sendMessage(){

  }

}
