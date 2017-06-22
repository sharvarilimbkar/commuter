import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/emailvalidator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

/**
 * Generated class for the SignUpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
email
password
mobile
username
  public signupForm: FormGroup;

registerdata={email:'',password:''}
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthProvider, public formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
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
  
  doRegister(){

  console.log("email "+this.email+" password "+ this.password + this.mobile + this.username)
 
   this.authService.register(this.email, this.password,this.mobile,this.username).then( data => {
        console.log("data ==>>>> "+data)
         this.navCtrl.setRoot('HomePage');
        
        

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
