import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider } from '../../providers/auth/auth'
import {Toast} from '@ionic-native/toast'
import firebase from 'firebase';
// import KidsData from '../../data/KidsData';
@IonicPage()
@Component({
  selector: 'page-kids-photos',
  templateUrl: 'kids-photos.html',
})
export class KidsPhotosPage {
  kidsPhotos=[];
  public childDataList:Array<any>;
  // public loadedChildList:Array<any>;
  public childDataRef:firebase.database.Reference
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider,public toast:Toast) {
  }

ionViewDidLoad(){
        this.getKidsPhotos()  
}
loadHomepage(){
   
      
  }
getKidsPhotos(){
    this.childDataRef = firebase.database().ref('childrenData');
     this.childDataRef.on('value', childDataList => {
      let childData = [];
      var user = childDataList.val();
      childDataList.forEach( child => {
           childData.push({id:child.key,value:child.val()});
            return false;
          
      });
      this.childDataList = childData;
      // this.loadedChildList = childData;  
      console.log(this.childDataList)
   });
    // this.auth.getChildrens().subscribe(result=>{
    //   if(result.status == "true" && result.statusCode=="200"){
    //         this.kidsPhotos = result.values;
    //         console.log("this.kidsPhotos ==>> "+JSON.stringify(this.kidsPhotos))
    //   }else{
    //       this.toast.show("No records Found","long","center");
    //   }

    // })
}
  // ngOnInit(){
  //   this.kidsPhotos = [{"values":[{"_id":"595a3b18471025551c5de7e8","uid":"1498629668350","profileUrl":"http://192.168.10.193:3000/public/images/1499085592314.jpg","__v":0,"photos":[]},{"_id":"595a3d6b471025551c5de7e9","uid":"1499086186812","profileUrl":"http://192.168.10.193:3000/public/images/1499086187458.jpg","__v":0,"photos":[{"_id":"595b4157e5602d0477fd1a12","url":"child_profile.profileUrl"},{"_id":"595b4157e5602d0477fd1a13","url":"child_profile.profileUrl"},{"_id":"595b4157e5602d0477fd1a14","url":"child_profile.profileUrl"},{"_id":"595b4263e5602d0477fd1a15","url":"child_profile.profileUrl"},{"_id":"595b4263e5602d0477fd1a16","url":"child_profile.profileUrl"},{"_id":"595b4264e5602d0477fd1a17","url":"child_profile.profileUrl"},{"_id":"595b432376a37206166cabf7","url":"http://192.168.10.193:3000/public/uploads/1499153187730.jpg"},{"_id":"595b432376a37206166cabf8","url":"http://192.168.10.193:3000/public/uploads/1499153187734.jpg"},{"_id":"595b432376a37206166cabf9","url":"http://192.168.10.193:3000/public/uploads/1499153187725.jpg"},{"_id":"595b440b2929be06e8579eee","url":"http://192.168.10.193:3000/public/uploads/1499153419963.jpg"},{"_id":"595b440b2929be06e8579eef","url":"http://192.168.10.193:3000/public/uploads/1499153419966.jpg"},{"_id":"595b440c2929be06e8579ef0","url":"http://192.168.10.193:3000/public/uploads/1499153419958.jpg"},{"_id":"595b4442e5fc1907107e503e","url":"http://192.168.10.193:3000/public/uploads/1499153474450.jpg"},{"_id":"595b4442e5fc1907107e503f","url":"http://192.168.10.193:3000/public/uploads/1499153474461.jpg"},{"_id":"595b4442e5fc1907107e5040","url":"http://192.168.10.193:3000/public/uploads/1499153474455.jpg"},{"_id":"595b447e7a075907663124b4","added_date_time":"2017-07-04 13:02:14","url":"http://192.168.10.193:3000/public/uploads/1499153534108.jpg"},{"_id":"595b447e7a075907663124b5","added_date_time":"2017-07-04 13:02:14","url":"http://192.168.10.193:3000/public/uploads/1499153534112.jpg"},{"_id":"595b70597a075907663124b6","added_date_time":"2017-07-04 16:09:21","url":"http://192.168.10.193:3000/public/uploads/1499164761003.jpg"},{"_id":"595b70b6047d9727a342eb99","added_date_time":"2017-07-04 16:10:54","url":"http://192.168.10.193:3000/public/uploads/1499164854560.jpg"}]}]}];

  //   console.log("type of" +typeof this.kidsPhotos)
  // }

  allPhotos(kids,uid){
    alert(uid)
    this.navCtrl.push("KidPhotosPage", {"uid":uid});
  }

}
