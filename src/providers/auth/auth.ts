import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  doLogin(email: string, password: string):firebase.Promise<any> {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    register(email: string, password: string ,mobile,username):firebase.Promise<any>
    {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
        
          .then((newUser) => {
              firebase.database().ref('/userData').child(newUser.uid).set({email: email,password:password,mobile:mobile,username:username});
          })
      }

      doLogout(): firebase.Promise<void> {
        return firebase.auth().signOut();
      }

      resetPassword(email: string): firebase.Promise<void> {
        return firebase.auth().sendPasswordResetEmail(email);
      }


      getUserProfile(): Promise<any> {
      return new Promise( (resolve, reject) => {
        firebase.database().ref('/userData')
        .child(firebase.auth().currentUser.uid)
        .on('value', data => {
          resolve(data.val());
        });
      });
    }
    saveProfileimage(profile_pic,guestPicture){
      let storageRef = firebase.storage().ref();
      const filename = Math.floor(Date.now() / 1000);
      const imageRef = storageRef.child(`images/${filename}.jpg`);
      return imageRef.putString(profile_pic, firebase.storage.StringFormat.DATA_URL)
    }
     handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
  }

}
