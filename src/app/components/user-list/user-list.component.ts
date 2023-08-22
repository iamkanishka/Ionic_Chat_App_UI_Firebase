import { Component, Input, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit() {}

}
