import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider } from '../../../providers/auth/auth'
import {Toast} from '@ionic-native/toast'
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-kid-videos',
  templateUrl: 'kid-videos.html',
})
export class KidVideosPage {
    child
    enddate: any;
    startdate: string;
  allVideos=[];
KidPhotos=[]
domainFileUrl
nameofchildren
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider) {
  }

  ionViewDidLoad(){
    this.allVideos = this.navParams.data;
    this.domainFileUrl = this.auth.domainStorageUrl;
    this.getkidData()
  }
  searchData(){
    // console.log(this.navParams.get("childDataList"))
      let data = this.navParams.get("childDataList")
    console.log(this.startdate + "dgdg "+ this.enddate)
     this.child = firebase.database().ref(this.auth.databaseChildren+'/'+this.navParams.get("uid")+'/'+'videos').orderByChild("date").startAt(this.startdate)
            .endAt(this.enddate).on("value",(data)=>{
              console.log(data.val())
              this.KidPhotos = data.val()
            })
      
    
  }
 getkidData(){
    // alert(this.navParams.get("uid"))
                        
                            this.auth.getkidsProfile(this.navParams.get("uid")).then(data =>{
                                // console.log("Sharvari data ==> "+JSON.stringify(data.values[0].profileUrl));
                                 this.nameofchildren = data.name
                                this.KidPhotos = data.videos
                                console.log("ppp =>> "+JSON.stringify(this.KidPhotos))
                                  // this.userProfile.profile_pic=data.values[0].profileUrl
                            })
                            // this.birthDate = this.userProfile.birthDate;
                      
  }
}
