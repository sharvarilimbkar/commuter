import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider } from '../../../providers/auth/auth'
import {Toast} from '@ionic-native/toast'
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-kid-photos',
  templateUrl: 'kid-photos.html',
})
export class KidPhotosPage {
  allPhotos=[];
  KidPhotos =[]
  nameofchildren
  domainUrl 
  child
  startdate
  enddate
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider,public toast:Toast) {
  }

  ionViewDidLoad(){
    this.allPhotos = this.navParams.data;
    this.domainUrl =this.auth.domainStorageUrl;
    this.getkidData()
  }
  searchData(){
    // console.log(this.navParams.get("childDataList"))
      let data = this.navParams.get("childDataList")
    console.log(this.startdate + "dgdg "+ this.enddate)
     this.child = firebase.database().ref(this.auth.databaseChildren+'/'+this.navParams.get("uid")+'/'+'photos').orderByChild("date").startAt(this.startdate)
            .endAt(this.enddate).on("value",(data)=>{
              console.log(data.val())
              this.KidPhotos = data.val()
            })
      
    
  }
  getkidData(){
    // alert(this.navParams.get("uid"))                     
    this.auth.getkidsProfile(this.navParams.get("uid")).then(data =>{
        console.log("Sharvari data ==> "+data.name);
        this.nameofchildren = data.name
        this.KidPhotos = data.photos
        console.log("ppp =>> "+JSON.stringify(this.KidPhotos))
          // this.userProfile.profile_pic=data.values[0].profileUrl
    })
                            // this.birthDate = this.userProfile.birthDate;
                      
  }
}
