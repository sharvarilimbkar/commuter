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
  ,public storage:StorageProvider,public store:Storage, public event:Events) {
      platform.ready().then(() => {

          statusBar.styleDefault();
          splashScreen.hide();
          this.domainUrl =this.auth.domainStorageUrl
      });
      const authObserver = afAuth.authState.subscribe( user => {
        if (user) {
              this.rootPage = "HomePage";

              this.event.subscribe('userProfile', (userProfile) => {
              this.userProfile = userProfile;
              console.log("from appcomponent ===>>>> "+this.userProfile)
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
              console.log("from appcomponent ===>>>> "+this.userProfile)
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

