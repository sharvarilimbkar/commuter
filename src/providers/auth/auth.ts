import { Injectable } from '@angular/core';
import { Http, HttpModule, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Transfer,TransferObject,FileUploadOptions } from '@ionic-native/transfer';
import {Toast} from '@ionic-native/toast'
import { MediaCapture } from '@ionic-native/media-capture';


@Injectable()
export class AuthProvider {
  public databaseParents ='/parentsData'
  public databaseChildren ='/childrenData'
  public databaseDaycare ='/userData'
countryList=[]
childList =[]
  base64textString
  public domainStorageUrl = 'http://daycare.deapps.io:3006/'
   public domainURL = 'http://daycare.deapps.io:3006/api/';
  //  public domainStorageUrl = 'http://192.168.10.189:3000/'
  //  public domainURL = 'http://192.168.10.189:3000/api/';
  constructor(public afDatabase: AngularFireDatabase,public http:Http,public transfer:Transfer,public toast:Toast) {
    console.log('Hello AuthProvider Provider');
    
   }

  doLogin(email: string, password: string):firebase.Promise<any> {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    register(email: string, password: string ,mobile,username):firebase.Promise<any>
    {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
        
          .then((newUser) => {
              firebase.database().ref(this.databaseParents).child(newUser.uid).set({email: email,password:password,mobile:mobile,username:username,isparent:1,profile_pic:'',address:''});
          })
      }

      doLogout(): firebase.Promise<void> {
        return firebase.auth().signOut();
      }

      resetPassword(email: string): firebase.Promise<void> {
        return firebase.auth().sendPasswordResetEmail(email);
      }

      getDaycare(data): Promise<any>{
        return new Promise( (resolve, reject) => {
        firebase.database().ref(this.databaseDaycare)
          .child(data.email)
          .on('value', data => {
            resolve(data.val());
          });
        });
      }
      getProfile(){
        let formData = new URLSearchParams();
        formData.append("uid",firebase.auth().currentUser.uid);
      
        return this.http.post(this.domainURL + 'getProfile', {"uid":firebase.auth().currentUser.uid})
          .map(res => res.json())
          .catch(this.handleError);
      }
      // getChildrens(){
      //   let formData = new URLSearchParams();
      //    return this.http.post(this.domainURL + 'getAllChildrens', {})
      //     .map(res => res.json())
      //     .catch(this.handleError);
      // }

      getUserProfile(): Promise<any> {
        // console.log("helloo sharvari ===> "+SERVER_NAME)
        return new Promise( (resolve, reject) => {
          firebase.database().ref(this.databaseParents)
          //  firebase.database().ref(db)
          .child(firebase.auth().currentUser.uid)
          .on('value', data => {
              resolve(data.val())
          });
        });
         
      }
    
    getKidPhotos(uid): Promise<any> {
        // console.log("helloo sharvari ===> "+SERVER_NAME)
        return new Promise( (resolve, reject) => {
          firebase.database().ref(this.databaseChildren)
          //  firebase.database().ref(db)
          .child(uid)
          .on('value', data => {
            
            resolve(data.val())
          });
        });
         
    }
    
    getdaycareProfile(): Promise<any> {
      // console.log("helloo sharvari ===> "+SERVER_NAME)
        return new Promise( (resolve, reject) => {
          firebase.database().ref(this.databaseDaycare)
          //  firebase.database().ref(db)
          .child(firebase.auth().currentUser.uid)
          .on('value', data => {
            resolve(data.val());
          });
        });
      }
      
      getkidsProfile(uid): Promise<any> {
      // console.log("helloo sharvari ===> "+SERVER_NAME)
        return new Promise( (resolve, reject) => {
          firebase.database().ref(this.databaseChildren)
          //  firebase.database().ref(db)
          .child(uid)
          .on('value', data => {
            resolve(data.val());
          });
        });
      }

    updateDaycare(data): Promise<any>{
       return new Promise((resolve) =>
      {
         var updateRef = firebase.database().ref('parentsData').child(firebase.auth().currentUser.uid);
	        updateRef.update(data);
         resolve(true);
      });
    }
     
     getChildren():Promise<any>{
      return new Promise((resolve)=>{
        firebase.database().ref(this.databaseChildren).on('value', countryList => {
          let countries = [];
          
          countryList.forEach( country => {
                var duid = country.val().uid_daycare
                console.log("duid == firebase.auth().currentUser.uid "+ duid == firebase.auth().currentUser.uid)
                if(duid == firebase.auth().currentUser.uid){
                  countries.push({id:country.key,value:country.val()});
                }
                  return false;
            
          });
          console.log("fron get children "+ countries)
          this.countryList = countries;
          })
          resolve(this.countryList);
      })
     }
  
     getData(dbname,uid):Promise<any>{
        return  new Promise((resolve)=>{
            firebase.database().ref(dbname)
          //  firebase.database().ref(db)
             .child(uid)
              .on('value', data => {
                resolve(data.val());
              });

        })
     }

    updateDatabase(data) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         var updateRef = firebase.database().ref('parentsData').child(firebase.auth().currentUser.uid);
	        updateRef.update(data);
         resolve(true);
      });
   }

   updateDaycareDatabase(data) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         var updateRef = firebase.database().ref('userData').child(firebase.auth().currentUser.uid);
	        updateRef.update(data);
         resolve(true);
      });
   }
 
    uploadMultiImage(imageurils,uid_children,description): Promise<any>{
      
      return new Promise((resolve, reject) =>
      {
        console.log("sdkfhjskjdfh ===> "+imageurils.length)
        console.log("sdkfhjskjdfh ===> "+imageurils)
          for(var i=0;i<imageurils.length;i++){
            console.log(imageurils[i].images)

                var params = {
                          uid:uid_children
                         }
                      const fileTransfer: TransferObject = this.transfer.create();

                            let options1: FileUploadOptions = {
                            fileKey: 'profile_pic',
                            fileName: imageurils[i].images.split('/').pop(),
                            headers: {}

                        }
                        options1.params = params;
                        fileTransfer.upload(imageurils[i].images, encodeURI(this.domainURL+'uploadChildPhotos'), options1)
                            .then((data1) => {
                              let res = JSON.parse(data1.response); 
                              console.log('JSON parsed result.response = ' + JSON.stringify(res));
                                // this.toastCtrl.dismissLoadin();
                                if(data1.response){
                                     console.log(res.profile_pic);
                                     var d = new Date();
                                      var month = d.getMonth();
                                     firebase.database().ref('childrenData/'+uid_children+'/'+'photos').push({ url: res.profile_pic,added_date_time:res.added_date_time,description:description,key_month:month});
                                   
                                 }
                                }, (err) => {
                            // error
                                alert("error" + JSON.stringify(err));
                                resolve(false);
                              });
              }
          resolve({status:true,flag:1});
      });
    }


    uploadVideoDataChild(videourl,uid,description): Promise<any>{
      console.log(videourl)
      return new Promise((resolve, reject) =>
      {
        var params = {
                          uid:uid
                         }
                      const fileTransfer: TransferObject = this.transfer.create();

                            let options1: FileUploadOptions = {
                            fileKey: 'videoFile',
                            fileName: videourl.split('/').pop(),
                            headers: {}

                        }
                        options1.params = params;
                        fileTransfer.upload(videourl, encodeURI(this.domainURL+'uploadVideoOfChild'), options1)
                            .then((data1) => {
                              let res = JSON.parse(data1.response); 
                              console.log('JSON parsed result.response = ' + JSON.stringify(res));
                                  if(data1.response){
                                     console.log(res.profile_pic);
                                     var d = new Date();
                                      var month = d.getMonth();
                                     firebase.database().ref(this.databaseChildren+'/'+uid+'/'+'videos').push({ url: res.profile_pic,added_date_time:res.added_date_time,discription:description,key_month:month});
                                   
                                 }
                                }, (err) => {
                            // error
                                alert("error" + JSON.stringify(err));
                                resolve(false);
                              });
              
          resolve({status:true,flag:1});
      });
    }

   
    _handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;
              this.base64textString= btoa(binaryString);
              console.log(btoa(binaryString));
      }
  
    addChild(data):Promise<any>{
        console.log("gender : "+data.gender)
        let uid_child       : string  =  new Date().getTime().toString();
        return new Promise((resolve) =>
              {
                
                         var params = {
                           uid:uid_child,
                           name: data.childname,
                           dob:data.birthday,
                           age:data.age,
                           gender:data.gender,
                           uid_parent:data.uid_parent,

                           uid_daycare:firebase.auth().currentUser.uid                            // uid_parent:data.uid_parent,
                            // uid_daycare:firebase.auth().currentUser.uid
                          }
                      const fileTransfer: TransferObject = this.transfer.create();

                            let options1: FileUploadOptions = {
                            fileKey: 'profile_pic',
                            fileName: data.pro_image.split('/').pop(),
                            headers: {}

                        }
                        options1.params = params;
                        fileTransfer.upload(data.pro_image, encodeURI(this.domainURL+'uploadChild'), options1)
                            .then((data1) => {
                              let res = JSON.parse(data1.response); 
                              console.log('JSON parsed result.response = ' + JSON.stringify(res));
                                // this.toastCtrl.dismissLoadin();
                                if(data1.response){
                                    // this.picChange=false;
                                    // this.toastCtrl.publishToast("Profile Updated Successfully..");
                                    //  alert("updated Successfully")
                                     console.log(res.profile_pic);
                                     firebase.database().ref(this.databaseChildren).child(uid_child).set({name: data.childname,dob:data.birthday,profile_pic:res.profile_pic,age:data.age, gender:data.gender,uid_parent:data.uid_parent,uid_daycare:firebase.auth().currentUser.uid});
                                    resolve(true);

                                 }

                                }, (err) => {
                            // error
                            alert("error" + JSON.stringify(err));
                            resolve(false);
                            }); 
              
              });
        //  return firebase.database().ref(this.databaseChildren).child(data.uid_parent).set({name: data.childname,dob:data.birthday,profile_pic:data.pro_image,age:data.age});
    }
    updateChild(data):Promise<any>{
      return new Promise(resolve=>{
        console.log(JSON.stringify(data))
          var params = {
                           uid:data.uid_child,
                           name: data.childname,
                           dob:data.birthday,
                           age:data.age,
                           gender:data.gender,
                           uid_parent:data.uid_parent,
                           flag:'set',
                           uid_daycare:firebase.auth().currentUser.uid                            // uid_parent:data.uid_parent,
                            // uid_daycare:firebase.auth().currentUser.uid
                          }
                      const fileTransfer: TransferObject = this.transfer.create();

                            let options1: FileUploadOptions = {
                            fileKey: 'profile_pic',
                            fileName: data.pro_image.split('/').pop(),
                            headers: {}

                        }
                        options1.params = params;
                        if(data.profile_selected =='set'){
                          fileTransfer.upload(data.pro_image, encodeURI(this.domainURL+'uploadChild'), options1)
                              .then((data1) => {
                                let res = JSON.parse(data1.response); 
                                console.log('JSON parsed result.response = ' + JSON.stringify(res));
                                  // this.toastCtrl.dismissLoadin();
                                  if(data1.response){
                                      console.log(res.profile_pic);
                                      firebase.database().ref(this.databaseChildren).child(data.uid_child).update({name: data.childname,gender:data.gender,dob:data.birthday,profile_pic:res.profile_pic,age:data.age,uid_daycare:firebase.auth().currentUser.uid});
                                      resolve(true);

                                  }

                                  }, (err) => {
                                    // error
                                    alert("error" + JSON.stringify(err));
                                    resolve(false);
                              }); 
                        }
                      // }else{
                      //    var params12 = {
                      //      uid:data.uid_child,
                      //      name: data.childname,
                      //      dob:data.birthday,
                      //      age:data.age,
                      //      gender:data.gender,
                      //      uid_parent:data.uid_parent,
                      //      flag:'unset',
                      //      uid_daycare:firebase.auth().currentUser.uid ,
                      //      profile_pic:data.pro_image   
                      //                              // uid_parent:data.uid_parent,
                      //       // uid_daycare:firebase.auth().currentUser.uid
                      //     }
                      //   this.http.post(this.domainURL + 'uploadChild', params12)
                      //     .map(res => { 
                      //                 firebase.database().ref(this.databaseChildren).child(data.uid_child).update({name: data.childname,dob:data.birthday,profile_pic:data.pro_image,age:data.age,uid_daycare:firebase.auth().currentUser.uid});
                      //                 resolve(true);
                      //               }
                      //               )
                      //     .catch(this.handleError);
                      //     }
      })
    }
    updateChildWithoutProfile(data){
      let formData = new URLSearchParams();
          var params = {
                  uid:data.uid_child,
                  // name: data.childname,
                  // dob:data.birthday,
                  // age:data.age,
                  // gender:data.gender,
                  // uid_parent:data.uid_parent,
                  flag:'unset',
                  // uid_daycare:firebase.auth().currentUser.uid ,
                  profile_pic:data.profileUri                          // uid_parent:data.uid_parent,
                  // uid_daycare:firebase.auth().currentUser.uid
                }
        // formData.append("uid",firebase.auth().currentUser.uid);
             return      this.http.post(this.domainURL + 'updateChild', params)
                .map(res =>res.json()
                   
            )
            .catch(this.handleError);
      
    }
    publishAnnouncement(data12):Promise<any>{
        return new Promise((resolve) =>{
              firebase.database().ref(this.databaseChildren)
                 .on('value', data => {
                    let childData = [];
                    data.forEach( child => {
                          var duid = child.val().uid_daycare
                          childData.push({"id":child.key,"daycareUid":child.val().uid_daycare});
                         
                            return false;
                      
                    });
                    this.childList = childData
                   
                  });
                  var today:any = new Date();
                  let dd :any= today.getDate();
                  let mm :any= today.getMonth()+1; //January is 0!

                  var yyyy = today.getFullYear();
                  if(dd<10){
                      dd='0'+dd;
                  } 
                  if(mm<10){
                      mm='0'+mm;
                  } 
                  var today :any = dd+'/'+mm+'/'+yyyy;
                  var d1 = new Date(today);
                  var d2 = new Date();
                  console.log("date "+(d1 == d2))
                  console.log("this.childList.length " +this.childList.length)
                  firebase.database().ref(this.databaseDaycare+'/'+firebase.auth().currentUser.uid+'/'+'announcements').push({title:data12.title,description:data12.description,date:today})
                   for(let i=0;i<this.childList.length ;i++){
                    if(this.childList[i].daycareUid == firebase.auth().currentUser.uid){
                      // console.log("turee => " + (this.childList[i] == firebase.auth().currentUser.uid))
                      firebase.database().ref(this.databaseChildren+'/'+this.childList[i].id+'/'+'announcements').push({title:data12.title,description:data12.description,date:today})
                    }
                  }
// for date checking

  //                 var alignFillDate = new Date("2017-07-11");
  // var pickUpDate = new Date();


  // // if (pickUpDate < alignFillDate) {
  // //   alignFillDate = alignFillDate.setDate(alignFillDate.getDate() + 30);
  // // }
  
  // $scope.pickUpDate = (pickUpDate.toDateString() == alignFillDate.toDateString());
  // $scope.alignFillDate = alignFillDate;
                 resolve(true);  
        })
    }


      handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
