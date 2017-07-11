import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CameraOptions,Camera} from "@ionic-native/camera"
import { ImagePicker,ImagePickerOptions} from '@ionic-native/image-picker';
import {MediaCapture} from '@ionic-native/media-capture'
/*
  Generated class for the SelectImageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SelectImageProvider {

  constructor(public camera:Camera,public imagePicker:ImagePicker,public videoCature:MediaCapture) {
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
           mediaType: this.camera.MediaType.PICTURE
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
 SelectVideo(sourceType) :Promise<any>{
// alert("hiii");
      const options: CameraOptions = {
           quality: 100,
           sourceType: sourceType,
          //  destinationType: this.camera.DestinationType.DATA_URL,
           destinationType: this.camera.DestinationType.FILE_URI,
          //  encodingType: this.camera.EncodingType.JPEG,
           mediaType: this.camera.MediaType.VIDEO
         
          // mediaType:Camera.MediaType.VIDEO
         }
            return new Promise((resolve) =>
              {
                this.camera.getPicture(options).then((VideoUri) => {
                  // imageUri = 'data:image/jpeg;base64,'+ imageUri;
                  // VideoUri =  VideoUri;
                  resolve(VideoUri);

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
     captureVideo():Promise<any>{
         return new Promise((resolve) =>
               { 
                 var captureSuccess = function(mediaFiles) {
                    var i, path, len;
                   
                        path = mediaFiles.fullPath;
                        alert(path)
                        console.log(path)
                        resolve(path)
                };

// capture error callback
                  var captureError = function(error) {
                      alert('Error code: ' + error.code);
                  };
                  this.videoCature.captureVideo((captureSuccess, captureError) => {
                  // alert(JSON.stringify(videodata)); 
                  // resolve(videodata)
                })
          })
    }
   

}

@Pipe({ name: 'keys',  pure: false })
export class  KeysPipe implements PipeTransform {
  transform(value: any, args?: any[]): any[] {
      
      if(value) {
        // create instance vars to store keys and final output
        let keyArr: any[] = Object.keys(value),
            dataArr = [];

        // loop through the object,
        // pushing values to the return array
        keyArr.forEach((key: any) => {
            dataArr.push(value[key]);
        });
        // return the resulting array
        return dataArr;
      }
    }
}
@Pipe({ name: 'keysPhotos',  pure: false })
export class  keysPhotos implements PipeTransform {
  transform(value: any, args?: any[]): any[] {
      
      if(value) {
        // create instance vars to store keys and final output
        let keyArr: any[] = Object.keys(value),
            dataArr = [];

        // loop through the object,
        // pushing values to the return array
        keyArr.forEach((key: any) => {
            dataArr.push(value[key]);
        });
        // return the resulting array
        return dataArr;
      }
    }
}
@Pipe({ name: 'keysv',  pure: false })
export class  KeysVideoPipe implements PipeTransform {
  transform(value: any, args?: any[]): any[] {
      
      if(value) {
        // create instance vars to store keys and final output
        let keyArr: any[] = Object.keys(value),
            dataArr = [];

        // loop through the object,
        // pushing values to the return array
        keyArr.forEach((key: any) => {
            dataArr.push(value[key]);
        });
        // return the resulting array
        return dataArr;
      }
    }
}
@Pipe({ name: 'keysvideos',  pure: false })
export class  keysvideos implements PipeTransform {
  transform(value: any, args?: any[]): any[] {
      
      if(value) {
        // create instance vars to store keys and final output
        let keyArr: any[] = Object.keys(value),
            dataArr = [];

        // loop through the object,
        // pushing values to the return array
        keyArr.forEach((key: any) => {
            dataArr.push(value[key]);
        });
        // return the resulting array
        return dataArr;
      }
    }
}
@Pipe({
  name: 'reverse',
  pure: false
})
export class ReversePipe {
  
transform (values) {
    return values.reverse();
  }
}

@Pipe({
  name: 'reverse1',
  pure: false
})
export class Reverse {
  
transform (values) {
    return values.reverse();
  }
}

@Pipe({
  name: 'reverseVideo',
  pure: false
})
export class ReverseVideo {
  
transform (values) {
    return values.reverse();
  }
}

@Pipe({
  name: 'reverseVideos',
  pure: false
})
export class ReverseVideos1 {
  
transform (values) {
    return values.reverse();
  }
}