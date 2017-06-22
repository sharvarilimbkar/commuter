import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
// import { HomePage } from "../pages/home/home";
import firebase from 'firebase';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';
import{ HttpModule} from '@angular/http'
  import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

// import {Transfer} from "@ionic-native/transfer"
  import{Camera} from "@ionic-native/camera"
const config = {
 apiKey: "AIzaSyBM1ysxV1LMxhfhpvT67H26DlxlWZpyWfQ",
 authDomain: "ssss-164410.firebaseapp.com",
 databaseURL: "https://ssss-164410.firebaseio.com",
 storageBucket: "ssss-164410.appspot.com"
};
firebase.initializeApp(config);
@NgModule({
  declarations: [
    MyApp,
    // HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
     AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
     AngularFireModule,
     AuthProvider,
    AngularFireAuth,
    HttpModule,
    Camera,
    // Transfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
