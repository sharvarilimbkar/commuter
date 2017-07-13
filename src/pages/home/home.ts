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
  public loadedChildList=[];
  public childDataRef:firebase.database.Reference
  mykey
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider,public auth:AuthProvider,public event:Events) {

  }

  ionViewDidLoad(){
                    
               this.load()

  }
   ionViewDidEnter(){

this.load()
   }
   load(){
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
                           this.loadannouncements()
                          //  this.event.subscribe('userProfile', (userProfile) => {
                          //   // user and time are the same arguments passed in `events.publish(user, time)`
                          //   console.log('Welcome '+ JSON.stringify(userProfile));
                          // });
                    }
                  })
   }
  loadDaycarepage(){
     this.childDataRef = firebase.database().ref(this.auth.databaseChildren);
     this.childDataRef.limitToLast(3).on('value', childDataList => {
      let childData = [];
      var user = childDataList.val();
      childDataList.forEach( child => {
        
           childData.push({id:child.key,value:child.val()});
          //  this.loadedChildList.push(child.val().announcements)
            return false;
          
      });
      this.childDataList = childData.reverse();
        // console.log("dfdfg ==> "+JSON.stringify(this.childDataList))
   });
 
      // this.loadedChildList=this.childDataList 
  }
   loadParentspage(){
     this.childDataRef = firebase.database().ref(this.auth.databaseChildren);
     this.childDataRef.limitToLast(3).on('value', childDataList => {
      let childData = [];
      var user = childDataList.val();
      childDataList.forEach( child => {
        console.log((child.val().uid_parent === firebase.auth().currentUser.uid))
        if(child.val().uid_parent === firebase.auth().currentUser.uid){
           childData.push({id:child.key,value:child.val()});
          //  this.loadedChildList.push(child.val().announcements)
            return false;
        }
      });
      this.childDataList = childData;
    //  this.loadedChildList.push(childData.value)
   });
      
  }
  loadannouncements(){
    this.auth.getdaycareProfile().then((data)=>{
      let data1 =[]
      this.loadedChildList = data.announcements;
      
      console.log(JSON.stringify(data1))

  // // if (pickUpDate < alignFillDate) {
  // //   alignFillDate = alignFillDate.setDate(alignFillDate.getDate() + 30);
  // // }
  
  // $scope.pickUpDate = (pickUpDate.toDateString() == alignFillDate.toDateString());
  // $scope.alignFillDate = alignFillDate;
//   for (var event in data) {
//     var dataCopy = data[event];
//     // // for (let data12 in dataCopy) {
//     // //     var mainData = dataCopy[data12];
//     //     console.log("main data "+JSON.stringify(dataCopy[]))
       
//     // // }
// }​
  // for(var key in data1)
  // {
  //     console.log(key);
  // }

      // for(let i=0 ; i< this.loadedChildList.length ; i++){
      //   console.log("hiii hello  ")
        //  var announcedate = new Date(data1[i].date);
        //   var today = new Date();
        //   console.log(data[i])
        // if(announcedate.toDateString() == today.toDateString()){
        //     this.loadedChildList.push({date:"Today",title:data[i].title,description:data[i].description})
        // }else if(announcedate.toDateString() < today.toDateString()){
        //    this.loadedChildList.push({date:"Yesterday",title:data[i].title,description:data[i].description})
        // }else{
        //   this.loadedChildList.push(data1)
        // }
      // }

    }).catch(error =>{
      console.log("error occured =>"+error)
    })
    // firebase.database().ref(this.auth.databaseDaycare).limitToLast(3).on('value', childDataList => {
    //   let daycareData = [];
      
    //   childDataList.forEach( child => {
    //     // console.log((child.val().uid_parent === firebase.auth().currentUser.uid))
    //     // if(child.val().uid_parent === firebase.auth().currentUser.uid){
          
    //       daycareData.push(child.val().announcements)
    //         return false;
    //     // }
    //   });
    //   this.loadedChildList = daycareData;
    // })
  }

  goToPage(page:any){
    this.navCtrl.push(page,{"isDaycare":this.daycare});
  }
}
