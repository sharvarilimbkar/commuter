import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth'
import { SelectImageProvider } from '../../../providers/select-image/select-image';
// import { Toast } from '@ionic-native/toast';
import { Toast } from "@ionic-native/toast"
import firebase from "firebase";
import{Camera,CameraOptions} from "@ionic-native/camera"
import { Transfer , TransferObject} from '@ionic-native/transfer'
/**
 * Generated class for the EditProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  ChildrenData =[]
  countryList
  showList
  uid_parent
  profile
  name
  showParents
  gender
  profile_flag :boolean=false
  addchild ={childname:'',age:'',birthday:'',pro_image:'',uid_parent:'',profileUri:'',gender:'',uid_child:'',profile_selected:''}
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth :AuthProvider,public selectImage:SelectImageProvider,private toast: Toast,public transfer:Transfer,public camera:Camera) {
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
      this.loadChildrendata()
  }

  loadChildrendata(){
    this.auth.getChildren().then((data)=>{
      console.log("sdjkfhskdjf ===>>>> "+data)
      this.ChildrenData = data
    },error=>{
        alert("something went wrong")
    })
  }
   initializeItems(): void {
    this.countryList =this.ChildrenData;
  }

  selectChildren(item){
    this.showParents = true
    this.showList = false;
    this.addchild.childname = item.value.name;
    this.addchild.pro_image =item.value.profile_pic
    this.addchild.birthday = item.value.dob
    this.addchild.age = item.value.age
    this.addchild.uid_child = item.id
    console.log( this.addchild.birthday )
   
  }
   Selectprofile(){
     this.profile_flag = true;
      this.selectImage.Selectprofile(this.camera.PictureSourceType.SAVEDPHOTOALBUM).then(imageUri=>{
        console.log(imageUri);
        this.addchild.pro_image= imageUri;
      })
  }
  uploadChild(){
      // console.log(" addchild ===>>> "+JSON.stringify(this.addchild)+"parent ===> "+this.uid_parent)
      this.addchild.uid_parent = this.uid_parent;
      this.addchild.profileUri =this.addchild.pro_image;
      this.addchild.gender = this.gender  
          if(this.profile_flag){
      
            console.log("parent ===> "+this.addchild.gender)        
            this.auth.updateChild(this.addchild).then((data)=>{
                if(data){
                      this.toast.show('Successfully uploaded', 'long', 'bottom').subscribe(
                          toast => {
                            console.log(toast);
                          }
                      );
                      this.profile_flag = false
                      this.navCtrl.setRoot("HomePage");
                }
                console.log(data);
              }).catch(error => {
                // this.errorMessage = 'Error - ' + error.message
                alert(error.message);
              })
      }else{
          
      }
  }

   getItems(searchbar) {
  
      this.initializeItems();
        var q = searchbar.srcElement.value;
      if (!q) {
        return;
      }

      this.countryList = this.countryList.filter((v) => {
        console.log(v.value.username)
        if(v.value.name && q) {
          //  console.log(v.value.username.toLowerCase().indexOf(q.toLowerCase()) > -1)

          if (v.value.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
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
