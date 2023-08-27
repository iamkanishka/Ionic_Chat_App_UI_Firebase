import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

interface IUsers{
  id:number,
  name:string,
  photoURL:string,
  time:string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('newChatModal') newChatModal!: ModalController;
  @ViewChild('popover') popover!: PopoverController;


  segment = 'chats'
  open_new_chat: boolean = false;
  users$: Observable<IUsers[]> = of([{
    id: 1,
    name: 'Kanishka',
    photoURL: 'https://png.pngtree.com/png-vector/20191104/ourmid/pngtree-businessman-avatar-cartoon-style-png-image_1953664.jpg',
    time:'10:00'
  },
  {
    id: 2,
    name: 'Atomlessmind',
    photoURL: 'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg',
    time:'08:00'
 
  },
  {
    id:3,
    name:'HotShot',
    photoURL:'https://www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js-150x150.png',
    time:'06:30',
 
  }]);


  rooms$: Observable<IUsers[]> = of([{
    id: 1,
    name: 'Kanishka',
    photoURL: 'https://png.pngtree.com/png-vector/20191104/ourmid/pngtree-businessman-avatar-cartoon-style-png-image_1953664.jpg',
    time:'10:00'
  },
  {
    id: 2,
    name: 'Atomlessmind',
    photoURL: 'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg',
    time:'08:00'
 
  },
  {
    id:3,
    name:'HotShot',
    photoURL:'https://www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js-150x150.png',
    time:'06:30',
 
  }]);

  constructor(private readonly router :Router, private readonly authService:AuthService) { }

  ngOnInit() {
  }

  Logout() {
    this.authService.logout().then(()=>{
      this.popover.dismiss();

    })

  }
  onSegmentChanged($event: any) {

  }
  newChat() {

  }

  closeNewChatModel() {
  this.newChatModal.dismiss();
  }

  onWillDismiss(event: Event) {

  }

  swipeEvent(event:any){
    console.log(event);
    
  }

  redirecttoChatRoom(room:IUsers){
     this.router.navigate(['/', 'home', 'chats', room.id, room.name]);
  }

}
