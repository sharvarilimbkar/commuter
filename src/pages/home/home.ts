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
  public loadedChildList:Array<any>;
  public childDataRef:firebase.database.Reference;
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
                          //  this.event.subscribe('userProfile', (userProfile) => {
                          //   // user and time are the same arguments passed in `events.publish(user, time)`
                          //   console.log('Welcome '+ JSON.stringify(userProfile));
                          // });
                    }
                  })
                this.images();
                this.loadHomepage();

  }

  loadHomepage(){
     this.childDataRef = firebase.database().ref('childrenData');
     this.childDataRef.on('value', childDataList => {
      let childData = [];
      var user = childDataList.val();
      childDataList.forEach( child => {
          // console.log()
          // this.uid = child.val().d_uid;
          // console.log(typeof this.uid+" "+this.uid);
          // console.log(typeof firebase.auth().currentUser.uid.toString() + " "+firebase.auth().currentUser.uid);
          // console.log(this.uid === firebase.auth().currentUser.uid)
          // if(this.uid === firebase.auth().currentUser.uid){
            var photos=child.val().photos;
         photos.forEach( child1 => {
           console.log("123/ ",child1.key);
         })
         //   console.log("123/ ",child.val().photos.key("-KoBUZ8N0AIiOCxw0Xk5").val());
         /*for(var i = 0; i < newfriends.length; i++){
    var ref = firebase.database().ref('users/' + newfriends[i].$id);
         }*/
            childData.push({id:child.key,value:child.val()});
           //   return false;
          // }
           
              return false;
          // }
          
      });
      this.childDataList = childData;
      this.loadedChildList = childData;     
      console.log("childDataList ====>  "+JSON.stringify(this.childDataList));
    });
      // forEach(function (openTicketSnapshot) {
      //   console.log(openTicketSnapshot.key); // The random key.
      //   var val = openTicketSnapshot.val();
      //   console.log(val.address);
      //   console.log(val.assignedInspector);
      //   // etc.
      // });
  }


images(){

    this.KidsData= [
  {
    "index": 0,
    "name": "Manuela Martinez",
    "parents": "Richard Martinez",
    "profilePic": "./assets/images/kidsData/kid1.jpg",
    "age": 4,
    "allpic": [
        {
          'id':1,
          'pic':"./assets/images/kidsData/kid1.1.jpg"
        },
        {
          'id':2,
          'pic':"./assets/images/kidsData/kid1.2.jpg"
        },
        {
          'id':3,
          'pic':"./assets/images/kidsData/kid1.1.jpg"
        },
        {
          'id':4,
          'pic':"./assets/images/kidsData/kid1.2.jpg"
        },
        {
          'id':5,
          'pic':"./assets/images/kidsData/kid1.1.jpg"
        }
      ],
    "allvid":[
        {
          'id':1,
          'vid':"./assets/images/kidsData/kid1.2.jpg"
        },
        {
          'id':2,
          'vid':"./assets/images/kidsData/kid1.1.jpg"
        }
      ]
  },

  {
    "index": 1,
    "name": "Martinez James",
    "parents": "Moore James",
    "profilePic": "./assets/images/kidsData/kid2.jpg",
    "age": 6,
    "allpic": [
        {
          'id':1,
          'pic':"./assets/images/kidsData/kid2.1.jpg"
        },
        {
          'id':2,
          'pic':"./assets/images/kidsData/kid2.2.jpg"
        }
      ],
    "allvid":[
        {
          'id':1,
          'vid':"./assets/images/kidsData/kid2.2.jpg"
        },
        {
          'id':2,
          'vid':"./assets/images/kidsData/kid2.1.jpg"
        },
        {
          'id':3,
          'vid':"./assets/images/kidsData/kid2.2.jpg"
        },
        {
          'id':4,
          'vid':"./assets/images/kidsData/kid2.1.jpg"
        }
      ]
  },


  {
    "index": 2,
    "name": "Lindsey Aguirre",
    "parents": "Ramos Aguirre",
    "profilePic": "./assets/images/kidsData/kid3.jpg",
    "age": 4,
    "allpic": [
        {
          'id':1,
          'pic':"./assets/images/kidsData/kid3.1.jpg"
        },
        {
          'id':2,
          'pic':"./assets/images/kidsData/kid3.2.jpg"
        }
      ],
    "allvid":[
        {
          'id':1,
          'vid':"./assets/images/kidsData/kid3.2.jpg"
        },
        {
          'id':2,
          'vid':"./assets/images/kidsData/kid3.1.jpg"
        }
      ]
  },

  {
    "index": 3,
    "name": "Gross Cleveland",
    "parents": "Oliver Cleveland",
    "profilePic": "./assets/images/kidsData/kid4.jpg",
    "age": 3,
    "allpic": [
        {
          'id':1,
          'pic':"./assets/images/kidsData/kid4.1.jpg"
        },
        {
          'id':2,
          'pic':"./assets/images/kidsData/kid4.2.jpg"
        }
      ],
    "allvid":[
        {
          'id':1,
          'vid':"./assets/images/kidsData/kid4.2.jpg"
        },
        {
          'id':2,
          'vid':"./assets/images/kidsData/kid4.1.jpg"
        }
      ]
  },

  {
    "index": 4,
    "name": "Kidd Fox",
    "parents":"Christensen Fox",
    "profilePic": "./assets/images/kidsData/kid6.jpg",
    "age": 5,
    "allpic": [
        {
          'id':1,
          'pic':"./assets/images/kidsData/kid6.1.jpg"
        },
        {
          'id':2,
          'pic':"./assets/images/kidsData/kid6.2.jpg"
        }
      ],
    "allvid":[
        {
          'id':1,
          'vid':"./assets/images/kidsData/kid6.2.jpg"
        },
        {
          'id':2,
          'vid':"./assets/images/kidsData/kid6.1.jpg"
        }
      ]
  }

];
}
  goToPage(page:any){
    this.navCtrl.push(page);
  }
}
