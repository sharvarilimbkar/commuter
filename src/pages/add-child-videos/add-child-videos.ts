import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import { Camera } from '@ionic-native/camera'
import { SelectImageProvider } from '../../providers/select-image/select-image';
import { MediaCapture } from '@ionic-native/media-capture';
import {Toast } from '@ionic-native/toast'
@IonicPage()
@Component({
  selector: 'page-add-child-videos',
  templateUrl: 'add-child-videos.html',
})
export class AddChildVideosPage {
  searchChildrenData = []
  searchChildren
  showList: boolean = false;
  showParents
  name
  profile
  childName
  // selectImage
  uid_parent
  // multiImages 
  uploadedImage
  uid_children
  videoUrl
  description
  domainUrl
  filedomainUrl = this.auth.domainStorageUrl;
  @ViewChild('myvideo') myVideo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public camera: Camera,public selectImage:SelectImageProvider,public videoCapture:MediaCapture,public toast:Toast) {
  }

ionViewDidLoad() {
    this.getChildrenList()
    this.domainUrl= this.auth.domainStorageUrl;
  }
  getChildrenList() {
    this.auth.getChildren().then((data) => {
      this.searchChildren = data;
      this.searchChildrenData = data
      console.log(this.searchChildrenData)
    })
  }

  selectVideo(){
    this.selectImage.SelectVideo(this.camera.PictureSourceType.PHOTOLIBRARY).then(videoUri => {
      console.log(videoUri);
       let video = this.myVideo.nativeElement;
        this.videoUrl=videoUri
       video.src = videoUri;
    })
  }
  takeVideo(){
               
    this.videoCapture.captureVideo((captureSuccess, captureError) => {
    alert("dsfsf")
})
                
    //   this.selectImage.captureVideo().then(videoUri => {
    //   console.log(videoUri);
    //   let video = this.myVideo.nativeElement;
    //    video.src = videoUri;
    //   this.videoUrl=videoUri
      
    // })
  }
  captureSuccess = function(mediaFiles) {
          var path
          path = mediaFiles.fullPath;
          alert(path)
          console.log(path)
      
  };
  captureError = function(error) {
    alert('Error code: ' + error.code);
  };
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
  UploadVideoData(){
    this.selectImage.presentLoading();
    this.auth.uploadVideoDataChild(this.videoUrl,this.uid_children,this.description)
      .then((snapshot: any) => {
        // this.uploadedImage = snapshot.downloadURL;
        // console.log(this.uploadedImage)
        this.selectImage.dismissLoading();
        this.toast.show("sucessfully uploaded..","long",'bottom');
        this.navCtrl.setRoot("HomePage");
      })
  }
  initializeItems(): void {
    this.searchChildren = this.searchChildrenData;
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
