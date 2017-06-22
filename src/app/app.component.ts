import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
// import {HomePage} from "../pages/home/home"
import { AngularFireAuth } from 'angularfire2/auth';
// import {Transfer} from "@ionic-native/transfer"
  import{Camera} from "@ionic-native/camera"
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
  userProfile
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private menuCtrl: MenuController,private afAuth: AngularFireAuth,public auth:AuthProvider) {
      platform.ready().then(() => {
   
        statusBar.styleDefault();
        splashScreen.hide();
        
      });
        const authObserver = afAuth.authState.subscribe( user => {
                if (user) {
                  this.rootPage = "HomePage";
                  // this.userProfile=this.home.userProfile;
                  this.auth.getUserProfile().then( profileSnap => {
                      this.userProfile = profileSnap;
                      console.log("hello "+this.userProfile.profile_pic)
                      // this.birthDate = this.userProfile.birthDate;
                    });
                  authObserver.unsubscribe();
                    
                } else {
                  this.rootPage = 'LoginPage';
                  authObserver.unsubscribe();
                }
              })

              
  }

  onLogout(){ 
    this.menuCtrl.close();
    this.nav.setRoot("LoginPage");
  }

  onLoad(page: any){
      this.nav.setRoot(page);
      this.menuCtrl.close();
    } 
}

