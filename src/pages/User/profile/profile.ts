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
import {Transfer ,TransferObject,FileUploadOptions} from '@ionic-native/transfer'
import firebase from "firebase";
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider,public camera:Camera,public storage:StorageProvider, public transfer:Transfer,
  public toast:Toast,public selectImage:SelectImageProvider) {
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
                            
                            this.auth.getProfile().subscribe((data) =>{
                                console.log("Sharvari data ==> "+JSON.stringify(data.values[0].profileUrl));
                                this.userProfile = profileSnap;
                                  // this.userProfile.profile_pic=data.values[0].profileUrl
                            })
                            // this.birthDate = this.userProfile.birthDate;
                          });
                    }else if(!data){
                          this.auth.getdaycareProfile().then( profileSnap => {
                            this.userProfile = profileSnap;
                           this.auth.getProfile().subscribe(data =>{
                                console.log("Sharvari data ==>  "+data);
                                // this.userProfile.profile_pic=JSON.stringify(data.values[0].profileUrl)
                                console.log("Sharvari data ==> "+data.values[0].profileUrl)
                            })
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
            this.userProfile.profile_pic = imageUri;
             var params = {
                            "uid": firebase.auth().currentUser.uid,
                            
                        }
                        console.log("UID ==> "+params);

                        const fileTransfer: TransferObject = this.transfer.create();

                            let options1: FileUploadOptions = {
                            fileKey: 'profile_pic',
                            fileName: imageUri.split('/').pop(),
                            headers: {}

                        }
                        options1.params = params;
                       console.log("params == >" +JSON.stringify(params))
                       this.toast.show('Successfully uploaded', 'long', 'bottom').subscribe(
                            toast => {
                              console.log(toast);
                            }
                        );
                        fileTransfer.upload(imageUri, encodeURI(this.auth.domainURL+'upload'), options1)
                            .then((data) => {
                              let res = JSON.parse(data.response); 
                              console.log('JSON parsed result.response = ' + JSON.stringify(res));
                                // this.toastCtrl.dismissLoadin();
                                if(data.response){
                                    // this.picChange=false;
                                    // this.toastCtrl.publishToast("Profile Updated Successfully..");
                                    alert("updated Successfully")
                                     console.log(res.profile_pic);
                                      if(this.isparent){
                                          this.auth.updateDatabase({profile_pic:res.profile_pic}).then((data)=>{
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
                                            this.auth.updateDaycareDatabase({profile_pic:res.profile_pic}).then((data)=>{
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

                                }, (err) => {
                            // error
                            alert("error" + JSON.stringify(err));
                            });
        //     this.auth.uploadImage(this.userProfile.profile_pic)
        //     .then((snapshot : any) =>
        //     {
        //         let uploadedImage : any = snapshot.downloadURL;
        //         console.log(uploadedImage)
        //         if(this.isparent){
        //              this.auth.updateDatabase({profile_pic:uploadedImage}).then((data)=>{
        //                 console.log(data);
        //                 if(data){
        //                   this.toast.show('Successfully uploaded', 'long', 'bottom').subscribe(
        //                         toast => {
        //                           console.log(toast);
        //                         }
        //                     );
        //                 }
        //            })
        //         }else if(!this.isparent){
        //             this.auth.updateDaycareDatabase({profile_pic:uploadedImage}).then((data)=>{
        //                 console.log(data);
        //                 if(data){
        //                   this.toast.show('Successfully uploaded', 'long', 'bottom').subscribe(
        //                         toast => {
        //                           console.log(toast);
        //                         }
        //                     );
        //                 }
        //             })
        //         }
               
           
        //  })
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
