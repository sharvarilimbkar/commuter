import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { Toast} from '@ionic-native/toast'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase'

@IonicPage()
@Component({
  selector: 'page-send-annoncement',
  templateUrl: 'send-annoncement.html',
})
export class SendAnnoncementPage {
  announceForm
  announcementData
  anno={
    title:'',
    description:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider,public toast:Toast,public formBuilder:FormBuilder) {
    this.announceForm= this.formBuilder.group({
      description:["",Validators.compose([Validators.pattern('[a-zA-Z]*'),Validators.required])],
      title:["",Validators.compose([Validators.pattern('[a-zA-Z]*'),Validators.required])],
      //  phonenumber:["",Validators.compose([Validators.required])],
     
   });
  }

  ionViewDidLoad() {
    this.loadLastAnnouncement()
   }
  loadLastAnnouncement(){
    // this.auth.getdaycareProfile().then((data)=>{
    //   let data1 =[]
    //   this.announcementData = data.announcements;
      
    //   console.log(JSON.stringify(data1))

    // }).catch(error =>{
    //   console.log("error occured =>"+error)
    // })
    // firebase.database().ref(this.auth.databaseDaycare+'/'+firebase.auth().currentUser.uid+'/'+'announcements').limitToLast(1).on('value', data => {
    //           // this.announcementData = data.val();
    //           // console.log("fgh "+JSON.stringify(this.announcementData))
    //           data.forEach( child => {

    //             });
    //       });
    firebase.database().ref(this.auth.databaseDaycare+'/'+firebase.auth().currentUser.uid+'/'+'announcements').limitToLast(1).on('value', data => {
      let daycareData = [];
      
      data.forEach( child => {
        // console.log((child.val().uid_parent === firebase.auth().currentUser.uid))
        // if(child.val().uid_parent === firebase.auth().currentUser.uid){
          
          daycareData.push(child.val())
            return false;
        // }
      });
      this.announcementData = daycareData;
      console.log(JSON.stringify(this.announcementData[0].title))
    })
  }
  publishAnnouncement(){
      console.log(JSON.stringify(this.anno))
      this.auth.publishAnnouncement(this.anno).then((data)=>{
        if(data){
          // alert("sucessfully published")
          this.toast.show("Announcement published successfully.","short","center")
          this.navCtrl.setRoot("HomePage")
        }else{
          this.toast.show("Announcement is not published.","short","center")
        }
      },error=>{
          alert("canot publish annoncement")
      })

  }
  
}
