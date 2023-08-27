import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FireDataServiceService } from '../fireDataService/fire-data-service.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  userAvatarPhoto: String[] = [ // List of User Avatar PhotoURLS
    'https://png.pngtree.com/png-vector/20191104/ourmid/pngtree-businessman-avatar-cartoon-style-png-image_1953664.jpg',
    'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg',
    'https://www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js-150x150.png',
    'https://png.pngtree.com/png-vector/20191103/ourmid/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_1947775.jpg',
    'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkkVsRNVJ7O7xNGK7IXtRwchi4NsKzUUdPMMcmIdbDKH_x6DKXR2EQGWrBiM8KKga7Ey0&usqp=CAU',
  ];

  public _uid = new BehaviorSubject<string>(null);
  currentUser: any
  private fireAuth: Auth = inject(Auth);

  constructor( private readonly dataService: FireDataServiceService) { }

  // Login with Firebase Email and Password
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await signInWithEmailAndPassword(this.fireAuth, email, password);
      if (response.user) {
        //Set User Data once successfull login
        this.setUserData(response.user.uid);
      }
    } catch (e) {
      throw (e)
    }
  }

  // Gets UID(Unique Id Which is Generated by Fireabase) of Current User
  getId() {
    const auth = getAuth();
    this.currentUser = auth.currentUser;
    return this.currentUser?.uid;
  }


  //setting userid 
  setUserData(uid: string) {
    this._uid.next(uid)
  }


  //Regester User
  async register(formValue: { email: string, password: string, userName:string }) {
    try {
      // Create User with Email and Password
      const registeredUser = await createUserWithEmailAndPassword(this.fireAuth, formValue.email, formValue.password);
      let userData = {
        email: formValue.email,
        password: formValue.password,
        uid: registeredUser.user.uid,
        userName: formValue.userName,
        photo: this.userAvatarPhoto[Math.floor(Math.random() * this.userAvatarPhoto.length)] // Choosing Random User Avatar Image from Array
      };
      // Adding User Creds to Firestore
      await this.dataService.setDocument(`users/${registeredUser.user.uid}`, userData)
      const userId = {
        id: registeredUser.user.uid
      };
      return userId
    } catch (e) {
      throw (e)
    }
  }

  async logout() {
    try {
      await this.fireAuth.signOut();
      this._uid.next(null);
      return true
    } catch (e) {
      throw (e)
    }
  }

  checkAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.fireAuth, user => {
        console.log('auth-user', user);
        resolve(user)
      })
    })
  }
  async getUserData(id: string) {
    const docsnapShot: any = await this.dataService.getDocbyId(`users/${id}`);
    if (docsnapShot?.exists()) {
      return docsnapShot.data();
    } else {
      throw ('No such doncument exists')
    }
  }

}
