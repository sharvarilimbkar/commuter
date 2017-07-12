import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider } from '../../providers/auth/auth'
import {Toast} from '@ionic-native/toast'
import firebase from 'firebase';

// import KidsData from '../../data/KidsData';
@IonicPage()
@Component({
  selector: 'page-kids-videos',
  templateUrl: 'kids-videos.html',
})
export class KidsVideosPage {
  kidsVideo;
  domainFileUrl
  public childDataList:Array<any>;
  // public loadedChildList:Array<any>;
  public childDataRef:firebase.database.Reference
    public childDataRef12:firebase.database.Reference
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider,public toast:Toast) {
    this.domainFileUrl = this.auth.domainStorageUrl
  }
ionViewDidLoad(){
        this.getKidsPhotos()  
}
ionViewDidEnter(){
        this.getKidsPhotos()  
}
loadHomepage(){
   
      
  }
getKidsPhotos(){
    this.childDataRef = firebase.database().ref(this.auth.databaseChildren);
      this.childDataRef.on('value', childDataList => {
        let childData = [];
        let parentData = [];
        let i =0
        var user = childDataList.val();
        childDataList.forEach( child => {
            //  childData.push({id:child.key,value:child.val()});
              //  console.log(child.val().uid_parent)
              firebase.database().ref(this.auth.databaseParents)
            
                .child(child.val().uid_parent)
                .on('value', data => {
                  console.log('this.navParams.get("isDaycare")'+this.navParams.get("isDaycare"))
                   parentData = data.val().username
                  if(this.navParams.get("isDaycare")){
                    var duid= child.val().uid_daycare;
                    if(duid == firebase.auth().currentUser.uid)
                     childData.push({id:child.key,value:child.val(),parentsData:parentData});
                  
                  }else{
                     if(child.val().uid_parent === firebase.auth().currentUser.uid)
                     childData.push({id:child.key,value:child.val(),parentsData:parentData});
                  }
                  
                });
                
                
              return false;
            
      });
      this.childDataList = childData;
      // this.loadedChildList = childData;  
      console.log(this.childDataList)
   });
   
}
  
// allPhotos(kids,uid){
//     // alert(uid)
//     this.navCtrl.push("KidPhotosPage", {"uid":uid});
//   }
  allVideos(kids,uid){
    this.navCtrl.push("KidVideosPage", {"uid":uid});
  }

}
