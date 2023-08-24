import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  isLoading: boolean = false;
  message: string = ''
  userName: string = ''
  currentUserId: number =1;

  chats$ =[{id:1, sender:1, message:'hi'},
  {id:2, sender:2, message:'hi there'}]
  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: any) => {
      console.log(params);
      this.userName = params.name;
      this.currentUserId=params.id;
    })
  }

  ngOnInit() {
  }

  sendMessage() {

  }

}
