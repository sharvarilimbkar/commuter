import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { EmailValidator } from '../../../validators/emailvalidator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{Camera,CameraOptions} from "@ionic-native/camera"
import{Transfer,FileUploadOptions,TransferObject,FileTransferError} from "@ionic-native/transfer"
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
userProfile={profile_pic:'',username:''}
birthDate
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider,public camera:Camera,public transfer:Transfer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewDidEnter() {
  this.auth.getUserProfile().then( profileSnap => {
    this.userProfile = profileSnap;
    console.log("hello "+this.userProfile.username)
    // this.birthDate = this.userProfile.birthDate;
  });
}

Selectprofile(){
alert("hiii");
const options: CameraOptions = {
           quality: 100,
           sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
           destinationType: this.camera.DestinationType.DATA_URL,
           encodingType: this.camera.EncodingType.JPEG,
         }

         this.camera.getPicture(options).then((imageUri) => {
           this.userProfile.profile_pic = 'data:image/jpeg;base64,'+ imageUri;
//'https://camo.mybb.com/e01de90be6012adc1b1701dba899491a9348ae79/687474703a2f2f7777772e6a71756572797363726970742e6e65742f696d616765732f53696d706c6573742d526573706f6e736976652d6a51756572792d496d6167652d4c69676874626f782d506c7567696e2d73696d706c652d6c69676874626f782e6a7067'
            this.auth.saveProfileimage(this.userProfile.profile_pic.split('/').pop(),this.userProfile.profile_pic).then(resp =>{

            console.log(resp)
         })

           // alert(this.profile.profile_pic);
         }, (err) => {

         })
        //  this.userProfile.profile_pic="http://enadcity.org/enadcity/wp-content/uploads/2017/02/profile-pictures.png"
        
         

  // var params = {
  //                           user_id: this.navParams.get("userId"),
  //                           profile_change_flag:"set",
  //                           firstname: this.UserDetails.firstname,
  //                           lastname: this.UserDetails.lastname,
  //                           driving_experience: this.UserDetails.driving_experience,
  //                           age:this.UserDetails.age,
  //                           email:this.UserDetails.email,
  //                           dateofbirth:this.UserDetails.dateofbirth,
  //                           mobile:this.UserDetails.mobile,
  //                           prev_img_url:this.UserDetails.profile_pic
  //                       }

                      //   const fileTransfer: TransferObject = this.transfer.create();

                      //       let options1: FileUploadOptions = {
                      //       fileKey: 'profile_pic',
                      //       fileName: this.userProfile.profile_pic.split('/').pop(),
                      //       headers: {}

                      //   }
                      //   // options1.params = params;
                      // //  console.log("params == >" +JSON.stringify(params))
                      //   // this.toastCtrl.presentLoading("Please Wait Profile is Updating..");
                      //   fileTransfer.upload(this.userProfile.profile_pic, encodeURI('http://dailycommuter.deapps.io/api/v1/updateprofile'), options1)
                      //       .then((data) => {

                      //           // this.toastCtrl.dismissLoadin();
                      //           if(data.response){
                      //               // this.picChange=false;
                      //               // this.toastCtrl.publishToast("Profile Updated Successfully..");
                      //              console.log(JSON.stringify(data.response));
                      //               console.log(JSON.stringify(data));
                      //              console.log(JSON.parse(data.response));
                      //          }


                      //           }, (err) => {
                      //       // error
                      //       alert("error" + JSON.stringify(err));
                      //       });

}

}
