import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireDataServiceService {

  constructor(private readonly firestore:Firestore) { }
  
  docRef(path:string){
     return doc(this.firestore, path)
  }

  setDocument(path:string, userData:any){
    const docRef = this.docRef(path);
    return setDoc<any>(docRef,userData)

  }

  getDocbyId(path:string){
   const dataRef = this.docRef(path);
   return getDoc(dataRef)
  } 

}
