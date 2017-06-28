import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CameraOptions,Camera} from "@ionic-native/camera"
import { ImagePicker } from '@ionic-native/image-picker';

/*
  Generated class for the SelectImageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SelectImageProvider {

  constructor(public camera:Camera,public imagePicker:ImagePicker) {
    console.log('Hello SelectImageProvider Provider');
  }

  Selectprofile() :Promise<any>{
// alert("hiii");
      const options: CameraOptions = {
           quality: 100,
           sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
           destinationType: this.camera.DestinationType.DATA_URL,
           encodingType: this.camera.EncodingType.JPEG,
         }
            return new Promise((resolve) =>
              {
                this.camera.getPicture(options).then((imageUri) => {
                  imageUri = 'data:image/jpeg;base64,'+ imageUri;
                  resolve(imageUri);

                  // alert(this.profile.profile_pic);
                }, (err) => {

                })
              });
         
       

}

selectMultipleImages():Promise<any>{
  let options ={
        maximumImagesCount: 10, 
        width: 800,
        outputType: 1
      }
      let imageUris = [];
      return new Promise((resolve) =>
              {
                 this.imagePicker.getPictures(options).then((results) => {
                    for (var i = 0; i < results.length; i++) {
                        console.log('Image URI: ' + results[i]);
                        imageUris.push(results[i]);

                    }
                    resolve(imageUris);
                  }, (err) => { });
              });
   
    }

}
