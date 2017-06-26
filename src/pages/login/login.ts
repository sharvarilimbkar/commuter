import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading } from 'ionic-angular';
import { HomePage } from "../home/home";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm:FormGroup;
public loading:Loading;

  public fireAuth: any;
public userData: any;
logindata ={email:'',password:''}
  constructor(public navCtrl: NavController, public navParams: NavParams,  public loadingCtrl: LoadingController,public formBuilder: FormBuilder,public auth:AuthProvider) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), 
        Validators.required])]
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser(): void {
    if (!this.loginForm.valid){
        console.log(this.loginForm.value);
      } else {
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        this.auth.doLogin(this.loginForm.value.email, 
            this.loginForm.value.password)
        .then( authData => {
              this.loading.dismiss()
                this.navCtrl.setRoot("HomePage");
            
            }, error => {
              this.loading.dismiss().then( () => {
                alert("login failed")
              
            });
            
          })
        }
  }
  forgotPass(){
    this.navCtrl.push("ForgotPage")
  }
  signup(){
    this.navCtrl.push("ResgisterPage")
  }
}
