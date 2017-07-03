import { Injectable } from '@angular/core';
import { Http, HttpModule, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Transfer,TransferObject,FileUploadOptions } from '@ionic-native/transfer';
import {Toast} from '@ionic-native/toast'
// import SERVER_NAME from ‘../config’;
// 
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
  database

  base64textString
   public domainURL = 'http://192.168.10.193:3000/api/';
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
              firebase.database().ref('/parentsData').child(newUser.uid).set({email: email,password:password,mobile:mobile,username:username,isparent:1,profile_pic:''});
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
        firebase.database().ref('/userData')
          .child(data.email)
          .on('value', data => {
            resolve(data.val());
          });
        });
      }
      getProfile(){
        let formData = new URLSearchParams();
        formData.append("uid",firebase.auth().currentUser.uid);
        // formData.append("password", data.password);
        // formData.append("gcm_token", data.gcm_token);
        //  formData.append("device_type", data.device_type);
        return this.http.post(this.domainURL + 'getProfile', {"uid":firebase.auth().currentUser.uid})
          .map(res => res.json())
          .catch(this.handleError);
      }

      getUserProfile(): Promise<any> {
        // console.log("helloo sharvari ===> "+SERVER_NAME)
        return new Promise( (resolve, reject) => {
          firebase.database().ref('/parentsData')
          //  firebase.database().ref(db)
          .child(firebase.auth().currentUser.uid)
          .on('value', data => {
            
            resolve(data.val())
          });
        });
         
    }
    getdaycareProfile(): Promise<any> {
      // console.log("helloo sharvari ===> "+SERVER_NAME)
        return new Promise( (resolve, reject) => {
          firebase.database().ref('/userData')
          //  firebase.database().ref(db)
          .child(firebase.auth().currentUser.uid)
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
  //  updateChildData(data):Promise<any>{
  //    return new Promise((resolve) =>
  //     {
  //        var updateRef = firebase.database().ref('childrenData').child(firebase.auth().currentUser.uid);
	//         updateRef.update(data);
  //        resolve(true);
  //     });
  //  }
    // uploadImage(imageString) : Promise<any>
    // {
    //   let image       : string  =  new Date().getTime() + '.jpg',
    //       storageRef  : any,
    //       parseUpload : any;

    //   return new Promise((resolve, reject) =>
    //   {
    //       storageRef       = firebase.storage().ref('images/' + image);
    //       parseUpload      = storageRef.putString(imageString, 'data_url');

    //       parseUpload.on('state_changed', (_snapshot) =>
    //       {
    //         // We could log the progress here IF necessary
    //         console.log('snapshot progess ' + _snapshot);
    //       },
    //       (_err) =>
    //       {
    //         reject(_err);
    //       },
    //       (success) =>
    //       {
    //         resolve(parseUpload.snapshot);
    //       });
    //   });
    // }
    uploadImage(data)
    {
        //let body = JSON.parse(JSON.stringify(data));
        // console.log("ssssllll ====>" + data);
        // //let headers = new Headers();
        // //let options = new RequestOptions({ headers: headers });
        // let formData = new URLSearchParams();
        // formData.append("uid", data.email);
        // formData.append("password", data.password);
        // formData.append("gcm_token", data.gcm_token);
        //  formData.append("device_type", data.device_type);
        // return this.http.post(this.domainURL + 'signin', formData)
        //   .map(res => res.json())
        //   .catch(this.handleError);

                  
 
    }
    uploadMultiImage(imageurils): Promise<any>{
      let image       : string  =  new Date().getTime() + '.jpg',
          storageRef  : any,
          parseUpload : any;
          let downloadUri=[]
      return new Promise((resolve, reject) =>
      {
        console.log("sdkfhjskjdfh ===> "+imageurils.length)
        console.log("sdkfhjskjdfh ===> "+imageurils)
          for(var i=0;i<imageurils.length;i++){
            console.log(imageurils[i].images)
           var reader = new FileReader();

              reader.onload =this._handleReaderLoaded.bind(this);

              reader.readAsBinaryString(imageurils[i].images);
            // storageRef       = firebase.storage().ref('images/' + image);
            storageRef       = firebase.storage().ref('childrenImages/' + image);
            parseUpload      = storageRef.putString(imageurils[i].images, 'data_url');

            parseUpload.on('state_changed', (_snapshot) =>
            {
              // We could log the progress here IF necessary
              console.log('snapshot progess ' + _snapshot);
            },
            (_err) =>
            {
              reject(_err);
            },
            (success) =>
            { 
              console.log("success")
              downloadUri.push(parseUpload.snapshot)
              
            });
          }
          resolve({stats:"true",values:downloadUri});
      });
    }

    _handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;
              this.base64textString= btoa(binaryString);
              console.log(btoa(binaryString));
      }
    
  //    uploadPics() {
  //       console.log("Ok, going to upload "+images.length+" images.");
  //       var defs = [];
        
  //       var fd = new FormData();
        
  //       images.forEach(function(i) {
  //           console.log('processing '+i);
  //           var def = $.Deferred();

  //           window.resolveLocalFileSystemURL(i, function(fileEntry) {
  //               console.log('got a file entry');
  //               fileEntry.file(function(file) {
  //                   console.log('now i have a file ob');
  //                   console.dir(file);
  //                   fd.append('file', file);
  //                   def.resolve();
  //               }, function(e) {
  //                   console.log('error getting file', e);
  //               });         
  //           }, function(e) {
  //               console.log('Error resolving fs url', e);
  //           });

  //           defs.push(def.promise());
                
  //       });

  //       $.when.apply($, defs).then(function() {
  //           console.log("all things done");
  //           var request = new XMLHttpRequest();
  //           request.open('POST', 'http://192.168.5.13:3000/upload');
  //           request.send(fd);
  //       });

  // }
    addChild(data):Promise<any>{
        
        let uid_child       : string  =  new Date().getTime().toString();
        return new Promise((resolve) =>
              {
                // firebase.database().ref('childrenData').child(uid_child).set({name: data.childname,dob:data.birthday,profile_pic:'',age:data.age,uid_parent:data.uid_parent,uid_daycare:firebase.auth().currentUser.uid});
                  //  var params = {
                  //           "parent_uid": this.addchild.uid_parent,
                  //           "daycare_uid":firebase.auth().currentUser.uid
                  //       }
                         var params = {
                           uid:uid_child,
                            // uid_parent:data.uid_parent,
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
                                     firebase.database().ref('childrenData').child(uid_child).set({name: data.childname,dob:data.birthday,profile_pic:res.profile_pic,age:data.age,uid_parent:data.uid_parent,uid_daycare:firebase.auth().currentUser.uid});
                                    resolve(true);

                                 }

                                }, (err) => {
                            // error
                            alert("error" + JSON.stringify(err));
                            resolve(false);
                            }); 
              
              });
        //  return firebase.database().ref('/childrenData').child(data.uid_parent).set({name: data.childname,dob:data.birthday,profile_pic:data.pro_image,age:data.age});
    }
      handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
