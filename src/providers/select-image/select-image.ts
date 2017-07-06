import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CameraOptions,Camera} from "@ionic-native/camera"
import { ImagePicker,ImagePickerOptions} from '@ionic-native/image-picker';

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

  Selectprofile(sourceType) :Promise<any>{
// alert("hiii");
      const options: CameraOptions = {
           quality: 100,
           sourceType: sourceType,
          //  destinationType: this.camera.DestinationType.DATA_URL,
           destinationType: this.camera.DestinationType.FILE_URI,
           encodingType: this.camera.EncodingType.JPEG,
         }
            return new Promise((resolve) =>
              {
                this.camera.getPicture(options).then((imageUri) => {
                  // imageUri = 'data:image/jpeg;base64,'+ imageUri;
                  imageUri =  imageUri;
                  resolve(imageUri);

                  // alert(this.profile.profile_pic);
                }, (err) => {

                })
              });
         
       

}

selectMultipleImages():Promise<any>{
  let options ={
        maximumImagesCount: 8,
        // outputType: 1
      }
      let imageUris = [];
      return new Promise((resolve) =>
              {
                 this.imagePicker.getPictures(options).then((results) => {
                    for (var i = 0; i < results.length; i++) {
                         console.log('Image URI sharvari: ' + results[i]);
                        imageUris.push({id:i,images:results[i]});
                        console.log(imageUris);
                    }
                    console.log("final imageuri ===>"+imageUris)
                    resolve(imageUris);
                  }, (err) => { });
              });
   
    }
   

}

