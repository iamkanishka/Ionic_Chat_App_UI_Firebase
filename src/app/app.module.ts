import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth, initializeAuth, indexedDBLocalPersistence } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { Capacitor } from '@capacitor/core';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    //  provideAuth(() => getAuth() )
    // In Below ProvidedAuth we are checking which platform is application running, based on we need give the localpersistence of the Datebase for the Firebase  
    provideAuth(() => {
      if (Capacitor.isNativePlatform()) { //checking  Capacitor Platform  
        return initializeAuth(getApp(), {
          persistence: indexedDBLocalPersistence
        })
      } else {
        return getAuth()
      }
    }),
    provideFirestore(() => getFirestore())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
