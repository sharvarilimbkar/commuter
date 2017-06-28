import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
// import { EmailValidator } from '../../../validators/emailvalidator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{Camera,CameraOptions} from "@ionic-native/camera"
// import{Transfer,FileUploadOptions,TransferObject,FileTransferError} from "@ionic-native/transfer"
import { StorageProvider } from '../../../providers/storage/storage';
import {Toast } from "@ionic-native/toast"
import { SelectImageProvider } from '../../../providers/select-image/select-image';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
// userProfile
isparent
userProfile ={username:'',address:'',mobile:'',subcription:'',profile_pic:''}
flag ={profile:'profile_pic',username:'username',address:'address',mobile:'mobile'}
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider,public camera:Camera,public storage:StorageProvider, public toast:Toast,public selectImage:SelectImageProvider) {
  }
ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewDidEnter() {
     this.storage.getStorage("isparent").then(data=>{
       console.log("sdfhgsvdhdv ===> "+data)
       this.isparent = data
                      if(data){
                        // alert("hiii")
                        this.auth.getUserProfile().then( profileSnap => {
                            this.userProfile = profileSnap;
                          
                            // this.birthDate = this.userProfile.birthDate;
                          });
                    }else if(!data){
                          this.auth.getdaycareProfile().then( profileSnap => {
                            this.userProfile = profileSnap;
                           
                            // this.birthDate = this.userProfile.birthDate;
                          });
                    }
                  })
  // this.auth.getUserProfile().then( profileSnap => {
  //   this.userProfile = profileSnap;
  //   console.log("hello "+this.userProfile.username)
  //   // this.birthDate = this.userProfile.birthDate;
  // });
}

Selectprofile(){
            this.selectImage.Selectprofile().then(imageUri=>{
            console.log(imageUri);
            this.auth.uploadImage(this.userProfile.profile_pic)
            .then((snapshot : any) =>
            {
                let uploadedImage : any = snapshot.downloadURL;
                console.log(uploadedImage)
                if(this.isparent){
                     this.auth.updateDatabase({profile_pic:uploadedImage}).then((data)=>{
                        console.log(data);
                        if(data){
                          this.toast.show('Successfully uploaded', 'long', 'bottom').subscribe(
                                toast => {
                                  console.log(toast);
                                }
                            );
                        }
                   })
                }else if(!this.isparent){
                    this.auth.updateDaycareDatabase({profile_pic:uploadedImage}).then((data)=>{
                        console.log(data);
                        if(data){
                          this.toast.show('Successfully uploaded', 'long', 'bottom').subscribe(
                                toast => {
                                  console.log(toast);
                                }
                            );
                        }
                    })
                }
               
           
         })
            })

           // alert(this.profile.profile_pic);
       
       

}
updateProfile(flag){
   if(flag == this.flag.username){
    this.updateData({address:this.userProfile.username})
  }else if(flag == this.flag.address){
    this.updateData({address:this.userProfile.address})
  }else if(flag == this.flag.mobile){
    this.updateData({address:this.userProfile.mobile})
  }
}
updateData(data){
  if(this.isparent){
    this.auth.updateDatabase(data).then((data)=>{
                    console.log(data);
                    if(data){
                       this.toast.show('Successfully uploaded', 'long', 'bottom').subscribe(
                            toast => {
                              console.log(toast);
                            }
                        );
                    }
                 })
  }else if(!this.isparent){
      this.auth.updateDaycareDatabase(data).then((data)=>{
                    console.log(data);
                    if(data){
                       this.toast.show('Successfully uploaded', 'long', 'bottom').subscribe(
                            toast => {
                              console.log(toast);
                            }
                        );
                    }
                 })
  }
            
}

}
