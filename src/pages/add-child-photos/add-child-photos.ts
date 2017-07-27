import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera'
import { SelectImageProvider } from '../../providers/select-image/select-image';
import{ Toast } from '@ionic-native/toast'
@IonicPage()
@Component({
  selector: 'page-add-child-photos',
  templateUrl: 'add-child-photos.html',
})
export class AddChildPhotosPage {

  searchChildrenData = []
  searchChildren
  showList: boolean = false;
  showParents
  name
  profile
  childName
  // selectImage
  uid_parent
  multiImages =[]
  uploadedImage
  uid_children
  description
  Images
  domainUrl ;
  addChildPhotosForm


  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public camera: Camera,public selectImage:SelectImageProvider,public toast:Toast,public formBuilder:FormBuilder) {
    this.addChildPhotosForm = this.formBuilder.group({
        children :["",Validators.required],
        parents :["",Validators.required],
        description:["",Validators.required]

    })
  }


  ionViewDidLoad() {
    this.getChildrenList()
    this.domainUrl = this.auth.domainStorageUrl;
  }
  getChildrenList() {
    this.auth.getChildren().then((data) => {
      this.searchChildren = data;
      this.searchChildrenData = data
      console.log(this.searchChildrenData)
    })
  }

  uploadChildImages() {
    this.selectImage.selectMultipleImages().then(imageUris => {
      console.log("imageUrls =>> " + JSON.stringify(imageUris))
      this.multiImages = imageUris
         
      console.log("gahsdfgha ==>"+this.Images )
    }).catch(error => {
      console.log('Error - ' + error.message)
    })

  }
  takephoto() {
    this.selectImage.Selectprofile(this.camera.PictureSourceType.CAMERA).then(imageUri => {
      console.log(imageUri);
      var images = [];
      images.push({ id: 0, images: imageUri });
      this.multiImages = images

    })
  }
  multiuploadChildImages() {
    console.log("hiiii ");
    console.log("imageuris length====>>>> " + this.multiImages.length);
    console.log("this.multiImages ==>" + this.multiImages);
    this.selectImage.presentLoading();
    this.auth.uploadMultiImage(this.multiImages,this.uid_children,this.description)
      .then((snapshot: any) => {
        // this.uploadedImage = snapshot.downloadURL;
        // console.log(this.uploadedImage)

        this.selectImage.dismissLoading();
                this.toast.show("sucessfully uploaded..","long",'bottom');

        this.navCtrl.setRoot("HomePage");
      }).catch((error)=>{
          alert("error : "+error.message)
      })

  }
  initializeItems(): void {
    this.searchChildren = this.searchChildrenData;
  }
  selectChildren(uidChild, id,name) {
    this.showList = false;

    this.uid_parent = id;
    this.uid_children = uidChild
    this.childName = name
    console.log(uidChild + "   sdfdfg  " + id)
    this.auth.getData(this.auth.databaseParents, this.uid_parent).then((result) => {
      console.log("parents " + JSON.stringify(result))
      this.showParents = result.username
    })

  }
  getItems(searchbar) {

    this.initializeItems();
    var q = searchbar.srcElement.value;
    if (!q) {
      return;
    }

    this.searchChildren = this.searchChildren.filter((v) => {
      // console.log(v.value.name)
      if (v.value.name && q) {
        //  console.log(v.value.username.toLowerCase().indexOf(q.toLowerCase()) > -1)

        if (v.value.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          this.showList = true;
          return true;

        }

        return false;
      } else {
        this.showList = false;
      }
    });

    console.log(q, this.searchChildren.length);

  }

}
