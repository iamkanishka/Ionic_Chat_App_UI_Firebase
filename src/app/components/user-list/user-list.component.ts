import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface IUsers{
  id:number,
  name:string,
  photoURL:string
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent  implements OnInit {
  @Input() item!:IUsers
  constructor(private readonly router:Router) { }

  ngOnInit() {}

  
  redirecttoChatRoom(){
    this.router.navigate(['/', 'home', 'chats', this.item.id, this.item.name])
 }


}
