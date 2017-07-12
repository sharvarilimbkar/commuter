import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
// import KidsData from '../../data/KidsData';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  KidsData: any= [];
userProfile
daycare
  public childDataList:Array<any>;
   public childDataList1:Array<any>;
  public loadedChildList:Array<any>;
  public childDataRef:firebase.database.Reference
  mykey
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider,public auth:AuthProvider,public event:Events) {

  }

  ionViewDidLoad(){
                    this.storage.getStorage("isparent").then(data=>{
                      if(data){
                        this.auth.getUserProfile().then( profileSnap => {
                            this.userProfile = profileSnap;
                            this.event.publish('userProfile', this.userProfile);
                            this.daycare=false
                            // this.birthDate = this.userProfile.birthDate;
                          });
                         
                            this.loadParentspage()
                          // this.event.subscribe('userProfile', (userProfile) => {
                          //   // user and time are the same arguments passed in `events.publish(user, time)`
                          //   console.log('Welcome '+ JSON.stringify(userProfile));
                          // });
                    }else if(!data){
                          this.auth.getdaycareProfile().then( profileSnap => {
                            this.userProfile = profileSnap;
                            this.event.publish('userProfile', this.userProfile);
                              this.daycare=true
                          });
                           this.loadDaycarepage();
                          //  this.event.subscribe('userProfile', (userProfile) => {
                          //   // user and time are the same arguments passed in `events.publish(user, time)`
                          //   console.log('Welcome '+ JSON.stringify(userProfile));
                          // });
                    }
                  })
               

  }

  loadDaycarepage(){
     this.childDataRef = firebase.database().ref('childrenData');
     this.childDataRef.on('value', childDataList => {
      let childData = [];
      var user = childDataList.val();
      childDataList.forEach( child => {
        
           childData.push({id:child.key,value:child.val()});
            return false;
          
      });
      this.childDataList = childData.reverse();
      this.loadedChildList = childData;  
   });
      
  }
   loadParentspage(){
     this.childDataRef = firebase.database().ref('childrenData');
     this.childDataRef.on('value', childDataList => {
      let childData = [];
      var user = childDataList.val();
      childDataList.forEach( child => {
        console.log((child.val().uid_parent === firebase.auth().currentUser.uid))
        if(child.val().uid_parent === firebase.auth().currentUser.uid){
           childData.push({id:child.key,value:child.val()});
            return false;
        }
      });
      this.childDataList = childData;
      this.loadedChildList = childData;  
   });
      
  }


  goToPage(page:any){
    this.navCtrl.push(page,{"isDaycare":this.daycare});
  }
}
