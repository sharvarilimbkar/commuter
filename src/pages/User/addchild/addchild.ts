import { Component ,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { SelectImageProvider } from '../../../providers/select-image/select-image';
// import { Toast } from '@ionic-native/toast';
import { Toast } from "@ionic-native/toast"
import firebase from "firebase";
import{Camera,CameraOptions} from "@ionic-native/camera"

import {Transfer ,TransferObject,FileUploadOptions} from '@ionic-native/transfer'
@IonicPage()
@Component({
  selector: 'page-addchild',
  templateUrl: 'addchild.html',
})



export class AddchildPage {
showList: boolean = false;
showParents:boolean = false
  searchQuery: string = '';
  items;
  uid_parent
  errorMessage
  addchild ={childname:'',age:'',birthday:'',pro_image:'',uid_parent:'',profileUri:'',gender:''}
  name:string = "shssh"
  uid :string
  profile
  gender
  public countryList:Array<any>;
  public loadedCountryList:Array<any>;
  public countryRef:firebase.database.Reference;
  uploadedImage
  multiImages = []
  constructor(public navCtrl: NavController, public navParams: NavParams,private el:ElementRef,public e2:ElementRef,public auth:AuthProvider,
  public selectImage:SelectImageProvider,private toast: Toast,public transfer:Transfer,public camera:Camera) {
           
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
      this.countryRef = firebase.database().ref(this.auth.databaseParents);
      this.countryRef.on('value', countryList => {
      let countries = [];
      
      countryList.forEach( country => {
          
          // console.log()
          this.uid = country.val().uid_daycare;
          // if(this.uid === firebase.auth().currentUser.uid){
              countries.push({id:country.key,value:country.val()});
              return false;
          //  }
          
      });
      this.countryList = countries;
      this.loadedCountryList = countries;
      console.log("countryList "+JSON.stringify(this.countryList));
    });
    
  }
 
  initializeItems(): void {
    this.countryList = this.loadedCountryList;
  }

  selectParent(email,id,profile_pic){
    this.showParents = true
    this.showList = false;
    this.name = email;
    this.uid_parent = id;
    this.profile =profile_pic
    console.log(email)
   
  }
  // uploadChildImages(){
  //   this.selectImage.selectMultipleImages().then(imageUris =>{
  //       console.log("imageUrls =>> " +imageUris)
  //       this.multiImages=imageUris
  //   }) .catch(error => {
  //     this.errorMessage = 'Error - ' + error.message
  //   })

  // }
  // multiuploadChildImages(){
  //     console.log("hiiii ");
  //     console.log("imageuris length====>>>> " +this.multiImages.length);
  //     console.log("this.multiImages ==>"+this.multiImages);
  //       this.auth.uploadMultiImage(this.multiImages)
  //               .then((snapshot : any) =>
  //               {
  //                   this.uploadedImage  = snapshot.downloadURL;
  //                   console.log(this.uploadedImage)
  //               })

  //     }

  uploadChild(){
      // console.log(" addchild ===>>> "+JSON.stringify(this.addchild)+"parent ===> "+this.uid_parent)
      this.addchild.uid_parent = this.uid_parent;
      this.addchild.profileUri =this.addchild.pro_image;
      this.addchild.gender = this.gender  
                     console.log("parent ===> "+this.addchild.gender)        
          this.auth.addChild(this.addchild).then((data)=>{
              if(data){
                    this.toast.show('Successfully uploaded', 'long', 'bottom').subscribe(
                        toast => {
                          console.log(toast);
                        }
                    );
                    this.navCtrl.setRoot("HomePage");
              }
              console.log(data);
            }).catch(error => {
              this.errorMessage = 'Error - ' + error.message
              alert(this.errorMessage);
            })
  }
  Selectprofile(){
      this.selectImage.Selectprofile(this.camera.PictureSourceType.SAVEDPHOTOALBUM).then(imageUri=>{
        console.log(imageUri);
        this.addchild.pro_image= imageUri;
      })
  }
  // takephoto(){
  //   this.selectImage.Selectprofile(this.camera.PictureSourceType.CAMERA).then(imageUri=>{
  //       console.log(imageUri);
  //       var images=[];
  //        images.push({id:0,images:imageUri});
  //       this.multiImages=images
       
  //     })
  // }
 getItems(searchbar) {
  
      this.initializeItems();
        var q = searchbar.srcElement.value;
      if (!q) {
        return;
      }

      this.countryList = this.countryList.filter((v) => {
        console.log(v.value.username)
        if(v.value.username && q) {
          //  console.log(v.value.username.toLowerCase().indexOf(q.toLowerCase()) > -1)

          if (v.value.username.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            this.showList = true;
            return true;
          }
          
          return false;
        }else{
          this.showList = false;
        }
      });

      console.log(q, this.countryList.length);

}

}