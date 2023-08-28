import { Injectable } from '@angular/core';
import { CollectionReference, DocumentReference, Firestore, Query, QueryFieldFilterConstraint, QuerySnapshot, WhereFilterOp, addDoc, collection, collectionData, doc, docData, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireDataServiceService {

  constructor(private readonly firestore: Firestore) { }

  docRef(path: string) {
    return doc(this.firestore, path)
  }

  collectionRef(path: string) {
    return collection(this.firestore, path)
  }

  setDocument(path: string, userData: any) {
    const docRef = this.docRef(path);
    return setDoc<any>(docRef, userData)

  }
  addDocument(path: string, userData: any) {
    const docRef = this.collectionRef(path);
    return addDoc<any>(docRef, userData)

  }

  getDocbyId(path: string) {
    const dataRef: DocumentReference = this.docRef(path);
    return getDoc(dataRef)
  }


  collectioDataQuery(path: string, queryFn: QueryFieldFilterConstraint): Observable<any[]> {
    let dataRef: CollectionReference = this.collectionRef(path)
    let dataQuery: Query = query(dataRef, queryFn);
    const collection_Data: Observable<any[]> = collectionData<any>(dataQuery, { idField: 'id' });
    return collection_Data
  }



  docDataQuery(path: string, id?: string | boolean, queryFn?: QueryFieldFilterConstraint) : Observable<any>{
    let dataRef: any= this.docRef(path)
    let docDataQuery: Query
    if (queryFn) {
      docDataQuery = query(dataRef, queryFn);
    }
    let doc_data : Observable<any>
    if (id) doc_data = docData<any>(dataRef, { idField: 'id' });
    else doc_data = docData<any>(dataRef);
    return doc_data
  }

  whereQuery(fieldpath: string, Condition: WhereFilterOp, value: string | string[][]) {
    return where(fieldpath, Condition, value)
  }



  getDocs(path: string, queryFn: QueryFieldFilterConstraint): Promise<QuerySnapshot<any>> {
    let dataRef: any = this.collectionRef(path);
    const docsQuery: Query = query(dataRef, queryFn);
    return getDocs<any>(dataRef)
  }



}
