import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  @Input() chat: any;
  @Input() current_user_id: number = 0;

  constructor() { }

  ngOnInit() {   }

  protected getSlotPostion(): boolean {
     return Number(this.chat?.sender) === Number(this.current_user_id) 
  }

}
