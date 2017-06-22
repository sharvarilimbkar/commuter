import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import firebase from 'firebase';
import { MyApp } from './app.component';
// import { HomePage } from "../pages/home/home";
// import { LoginPage } from "../pages/login/login";
// import { SignUpPage } from "../pages/sign-up/sign-up";
// import { ForgotPassPage } from "../pages/forgot-pass/forgot-pass";
import { IndexPage } from "../pages/index/index";
import { KidsPhotosPage } from "../pages/kids-photos/kids-photos";
import { KidsVideosPage } from "../pages/kids-videos/kids-videos";
import { KidPhotosPage } from "../pages/kids-photos/kid-photos/kid-photos";
import { KidVideosPage } from "../pages/kids-videos/kid-videos/kid-videos";
// import { ProfilePage } from "../pages/User/profile/profile";
import { AddchildPage } from "../pages/User/addchild/addchild";
import { SubscriptionPage } from "../pages/User/subscription/subscription";
import { SettingsPage } from "../pages/User/settings/settings";
import { AnnouncementPage } from "../pages/announcement/announcement";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';
import{ HttpModule} from '@angular/http'
  import { AngularFireAuth } from 'angularfire2/auth';
import {Transfer} from "@ionic-native/transfer"
  import{Camera} from "@ionic-native/camera"

// firebase.initializeApp( {
   /* export const firebaseConfig = {

        apiKey: "AIzaSyBM1ysxV1LMxhfhpvT67H26DlxlWZpyWfQ",
        authDomain: "ssss-164410.firebaseapp.com",
        databaseURL: "https://ssss-164410.firebaseio.com",
        projectId: "ssss-164410",
        storageBucket: "ssss-164410.appspot.com",
        messagingSenderId: "144923457663"
  }
  // firebase.initializeApp(firebaseConfig)
// });
*/
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
    IndexPage,
    // LoginPage,
    // SignUpPage,
    // ForgotPassPage,
    // HomePage,
    KidsPhotosPage,
    KidPhotosPage,
    KidsVideosPage,
    KidVideosPage,
    // ProfilePage,
    AddchildPage,
    SubscriptionPage,
    AnnouncementPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp) ,
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config)
     
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IndexPage,
    // LoginPage,
    // SignUpPage,
    // ForgotPassPage,
    // HomePage,
    KidsPhotosPage,
    KidPhotosPage,
    KidsVideosPage,
    KidVideosPage,
    // ProfilePage,
    AddchildPage,
    SubscriptionPage,
    AnnouncementPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    HttpModule,
    Camera,
    Transfer
  ]
})
export class AppModule {}
