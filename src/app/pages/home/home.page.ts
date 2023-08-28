import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';

interface IUsers {
  uid: string,
  userName: string,
  photo: string,
  email: string,
  password: string
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
  users$: Observable<IUsers[]>

   rooms$: Observable<any[]> 

  constructor(private readonly router: Router, private readonly authService: AuthService, private chatService: ChatService) { }

  ngOnInit() {
    
    this.rooms$ = this.chatService.getChatRooms();
    this.rooms$.subscribe({
      next:(res)=>{
        res.forEach((resp)=>{
          console.log(resp);
          
          resp.user.subscribe((ress:any)=>{
            console.log(ress);
            
          })
        })

        
      },
      error:()=>{

      }
    })
     }

  Logout() {
    this.authService.logout().then(() => {
      this.popover.dismiss();
      this.router.navigateByUrl('/login')
    })

  }
  onSegmentChanged($event: any) {

  }
  newChat() {
    if (!this.users$) this.getUsers()
  }

  getUsers() {
    this.users$ = this.chatService.getUsers();
 

  }

  closeNewChatModel() {
    this.newChatModal.dismiss();
  }

  onWillDismiss(event: Event) {

  }

  swipeEvent(event: any) {
    console.log(event);

  }

  async redirecttoChatRoomandStartChat(item: IUsers) {
    console.log(item);
    
    try {


      const room = await this.chatService.createChatRoom(item.uid);
      console.log('room', room);
      this.closeNewChatModel()
      const navData: NavigationExtras = {
        queryParams: {
          name: item.userName
        }
      }
      console.log(navData);

      this.router.navigate(['/', 'home', 'chats', room.id,  item.userName ], navData);

    } catch (e) {
      console.log(e);

    }

  }

  getUser(user:any){
   return user
  }

}
