import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
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
  constructor(public afDatabase: AngularFireDatabase) {
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

      getUserProfile(): Promise<any> {
        // console.log("helloo sharvari ===> "+SERVER_NAME)
        return new Promise( (resolve, reject) => {
          firebase.database().ref('/parentsData')
          //  firebase.database().ref(db)
          .child(firebase.auth().currentUser.uid)
          .on('value', data => {
            resolve(data.val());
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
    uploadImage(imageString) : Promise<any>
    {
      let image       : string  =  new Date().getTime() + '.jpg',
          storageRef  : any,
          parseUpload : any;

      return new Promise((resolve, reject) =>
      {
          storageRef       = firebase.storage().ref('images/' + image);
          parseUpload      = storageRef.putString(imageString, 'data_url');

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
            resolve(parseUpload.snapshot);
          });
      });
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
            // storageRef       = firebase.storage().ref('images/' + image);
            storageRef       = firebase.storage().ref('childrenImages/' + image);
            parseUpload      = storageRef.putString(imageurils[i], 'data_url');

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

    addChild(data):Promise<any>{
        // addchild ={childname:'',age:'',birthday:'',pro_image:'',uid_parent:''profileUri}
        let uid_child       : string  =  new Date().getTime().toString();
        return new Promise((resolve) =>
              {
                firebase.database().ref('childrenData').child(uid_child).set({name: data.childname,dob:data.birthday,profile_pic:data.profileUri,age:data.age,uid_parent:data.uid_parent,uid_daycare:firebase.auth().currentUser.uid});
                resolve(true);
              });
        //  return firebase.database().ref('/childrenData').child(data.uid_parent).set({name: data.childname,dob:data.birthday,profile_pic:data.pro_image,age:data.age});
    }
     handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
  }

}
