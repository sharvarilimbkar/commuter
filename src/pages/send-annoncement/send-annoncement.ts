import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";


@IonicPage()
@Component({
  selector: 'page-send-annoncement',
  templateUrl: 'send-annoncement.html',
})
export class SendAnnoncementPage {

  anno={
    title:'',
    description:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider) {
  }

  ionViewDidLoad() { }
  
  publishAnnouncement(){
      console.log(JSON.stringify(this.anno))
      this.auth.publishAnnouncement(this.anno).then((data)=>{
        if(data){
          // alert("sucessfully published")
          this.navCtrl.setRoot("HomePage")
        }else{
          alert("not published")
        }
      },error=>{
          alert("canot publish annoncement")
      })

  }
  
}
