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
import{ HttpModule,Http} from '@angular/http'
import { AngularFireAuth, } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ImagePicker } from '@ionic-native/image-picker';

import {Transfer} from "@ionic-native/transfer"
import{Camera} from "@ionic-native/camera"
import { StorageProvider } from '../providers/storage/storage';
import { IonicStorageModule } from '@ionic/storage';
import { SearchProvider } from '../providers/search/search';
import { SelectImageProvider } from '../providers/select-image/select-image';
import { Toast } from "@ionic-native/toast"

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
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
     IonicStorageModule.forRoot()
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
    AngularFireDatabase,
    Camera,
    ImagePicker,
    Toast,
    Transfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    SearchProvider,
    SelectImageProvider

  ]
})
export class AppModule {}
