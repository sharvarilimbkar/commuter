import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
// import { EmailValidator } from '../../validators/emailvalidator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {Toast} from '@ionic-native/toast'


@IonicPage()
@Component({
  selector: 'page-resgister',
  templateUrl: 'resgister.html',
})
export class ResgisterPage {
    errormessage: string;
    showStyle: boolean;

 email
password
mobile
username
  public signupForm: FormGroup;

registerdata={email:'',password:''}
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthProvider, public formBuilder: FormBuilder, public loadingCtrl: LoadingController,public toast:Toast) {
    this.signupForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        mobile: ['', Validators.compose([ Validators.required])],
        username: ['', Validators.compose( [Validators.required])],
        cnfpassword: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });

  }
   
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  Onkeyup(event: any){
    console.log(event )
      console.log(event.target.value== this.password);
       if(event.target.value!= this.password){
          this.showStyle=true;
          this.errormessage ="password ."
       }else if(event.target.value== this.password){
          this.showStyle =false;
          
       }
       
  }
  
  doRegister(){

  console.log("email "+this.email+" password "+ this.password + this.mobile + this.username)
 
   this.authService.register(this.email, this.password,this.mobile,this.username).then( data => {
        console.log("data ==>>>> "+data)
        //  this.navCtrl.setRoot('HomePage');
        this.toast.show("Successfully signup. Please Login to view details",'long','center').subscribe(
          toast => {
            console.log(toast);
            this.navCtrl.setRoot('LoginPage');
          }
        );
        
        // this.navCtrl.setRoot('SelectDaycarePage');

      }, error => {
        // console.log(error);
        alert("errorr while creating")
       
      });

      // this.loading = this.loadingCtrl.create({
      //   dismissOnPageChange: true,
      // });
      // this.loading.present();
    }


}
