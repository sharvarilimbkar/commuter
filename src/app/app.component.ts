import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { StorageProvider } from '../providers/storage/storage';
// import {HomePage} from "../pages/home/home"
import { AngularFireAuth } from 'angularfire2/auth';
// import {Transfer} from "@ionic-native/transfer"
import{Camera} from "@ionic-native/camera"
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
  @Component({
  templateUrl: 'app.html'
  })
  export class MyApp {
  rootPage:any;

  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
  userProfile
  daycare:boolean;
  domainUrl
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private menuCtrl: MenuController,private afAuth: AngularFireAuth,public auth:AuthProvider
  ,public storage:StorageProvider,public store:Storage, public event:Events, public oneSignal:OneSignal) {
      platform.ready().then(() => {

          statusBar.styleDefault();
          splashScreen.hide();
     
         
    
      });
      const authObserver = afAuth.authState.subscribe( user => {
        this.domainUrl =this.auth.domainStorageUrl
        if (user) {
           this.oneSignal.startInit('f1edd1a5-35f5-4b50-bbdc-ccc8bcdfd420', '398522364586');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        // alert(user.uid)
        // this.oneSignal.sendTags({user_id: "value", key2: "value2"});
        this.oneSignal.handleNotificationReceived().subscribe((data) => {
        // do something when notification is received
        console.log(JSON.stringify(data))
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });
      this.oneSignal.endInit();
              this.rootPage = "HomePage";

              this.event.subscribe('userProfile', (userProfile) => {
              this.userProfile = userProfile;
              // console.log("from appcomponent ===>>>> "+this.userProfile)
              this.storage.getStorage("isparent").then(data=>{
                
              if(data){
                this.daycare=false
              }else if(!data){
                this.daycare=true
              }
              })
         
            });

            authObserver.unsubscribe();

        } else {
            // this.rootPage = 'SelectDaycarePage';
            this.rootPage = 'LoginPage';
            this.event.subscribe('userProfile', (userProfile) => {
              this.userProfile = userProfile;
              this.storage.getStorage("isparent").then(data=>{
              if(data){
                this.daycare=false
              }else if(!data){
                this.daycare=true
              }
              })
              // console.log("from appcomponent ===>>>> "+this.userProfile)
            })
            authObserver.unsubscribe();
        }
      })


  }
  
  onLogout(){ 
    // this.storage.removeStorage("isparent")
    this.store.remove("isparent")
    this.menuCtrl.close();

    this.auth.doLogout();
    this.nav.setRoot("LoginPage");

  }

  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  } 

  }

