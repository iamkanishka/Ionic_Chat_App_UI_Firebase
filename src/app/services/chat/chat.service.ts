import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, elementAt, filter, last, map, of, switchMap } from 'rxjs';
import { FireDataServiceService } from '../fireDataService/fire-data-service.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  currentUserId: string;

  chatRooms: any;

  public users: Observable<any[]>
  constructor(private fireDataServiceService: FireDataServiceService, private authService: AuthService) {
    this.getCurrentUserId()
  }

  getCurrentUserId() {
    this.currentUserId = this.authService.getId();
    console.log(this.currentUserId);

  }

  getUsers() {
    console.log(this.currentUserId);

    return this.fireDataServiceService.collectioDataQuery('users', 
    this.fireDataServiceService.whereQuery( "uid", "!=",this.currentUserId)
      )
      // .pipe(last((user:any)=>{
      //   console.log(user);
      //   return null
      // // return  user.uid != String(this.currentUserId)
      // }))
     // .pipe(last())

  }


  async createChatRoom(user_id: string) {
    console.log(user_id);

    try {
      let room: any;
      const querySnapshot = await this.fireDataServiceService.
        getDocs('chatRooms', this.fireDataServiceService.whereQuery('members', 'in',
          [[user_id, this.currentUserId], [this.currentUserId, user_id]]
        ));

      room = await querySnapshot.docs.map((doc: any) => {
        let item = doc.data();
        item.id = doc.id
        return item
      })

      console.log('exist docs', room);
      if (room?.length > 0) return room[0];

      const data = {
        members: [
          this.currentUserId,
          user_id
        ],
        type: 'private',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      room = await this.fireDataServiceService.addDocument('chatRooms', data)

    } catch (e) {

    }
  }

  getChatRooms() {

    return this.fireDataServiceService.collectioDataQuery('chatRooms',
      this.fireDataServiceService.whereQuery('members', 'array-contains', this.currentUserId))
      .pipe(map((data: any[]) => {
         let rooms = data
         rooms.map((element, index) => {
          const user_data = element.members.filter((x: any) => x != this.currentUserId);
          console.log(user_data);
          if (user_data.length != 0) {
            let user
            user = this.fireDataServiceService.docDataQuery(`users/${user_data[0]}`, true);
            element.user = user

          }else{
            rooms.splice(index,1)
          }
    });
        return rooms
      }),
        switchMap((data: any) => {
          console.log(data);

          return of(data)
        })
      )
  }

}
