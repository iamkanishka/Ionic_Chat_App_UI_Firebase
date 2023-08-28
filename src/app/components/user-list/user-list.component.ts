import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface IUsers{
  uid:string,
  userName:string,
  photo:string,
  email:string,
  password:string
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent  implements OnInit {
  @Input() item!:IUsers
  constructor(private readonly router:Router) { }

  ngOnInit() { }

  
  redirecttoChatRoom(){
    this.router.navigate(['/', 'home', 'chats', this.item.uid, this.item.userName],{replaceUrl:true})
 }


}
