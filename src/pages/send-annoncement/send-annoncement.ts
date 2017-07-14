import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { Toast} from '@ionic-native/toast'

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
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider,public toast:Toast) {
  }

  ionViewDidLoad() { }
  
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
