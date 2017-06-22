import { Component, ViewChild,NgZone } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IndexPage } from "../pages/index/index";
// import { HomePage } from "../pages/home/home";
// import { ProfilePage } from "../pages/User/profile/profile";
import { AddchildPage } from "../pages/User/addchild/addchild";
import { SubscriptionPage } from "../pages/User/subscription/subscription";
import { SettingsPage } from "../pages/User/settings/settings";
// import {LoginPage} from "../pages/login/login"
import { AuthProvider } from '../providers/auth/auth';
// import {HomePage} from "../pages/home/home"
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;// LoginPage;
  homepage = "HomePage";
  profilepage = "ProfilePage";
  addchildpage = AddchildPage;
  subscriptionpage = SubscriptionPage;
  settingsPage = SettingsPage;

  @ViewChild('nav') nav:NavController;
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
  ionViewDidEnter() {
    this.auth.getUserProfile().then( profileSnap => {
      this.userProfile = profileSnap;
      console.log("hello "+this.userProfile.username)
      // this.birthDate = this.userProfile.birthDate;
    });
  }
  ngOnLoad(){
    
  }
   onLogout(){ 
    this.menuCtrl.close();
    this.auth.doLogout();
    this.nav.setRoot("LoginPage");
  }

  onLoad(page: any){
      this.nav.setRoot(page);
      this.menuCtrl.close();
    } 

}


