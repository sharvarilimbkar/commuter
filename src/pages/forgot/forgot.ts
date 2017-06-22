import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from "@angular/forms/src/forms";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/emailvalidator';

/**
 * Generated class for the ForgotPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {
showEmail:boolean = true;
  showOTP:boolean=false;
  showPassword:boolean=false;
    public resetPasswordForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,public authProvider: AuthProvider,public formBuilder: FormBuilder) {
    this.resetPasswordForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, 
            EmailValidator.isValid])],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }
  resetPassword(){
  if (!this.resetPasswordForm.valid){
    console.log(this.resetPasswordForm.value);
  } else {
    this.authProvider.resetPassword(this.resetPasswordForm.value.email)
    .then((user) => {
      alert("We just sent you a reset link to your email")
      this.navCtrl.setRoot("LoginPage");
      // let alert = this.alertCtrl.create({
      //   message: "We just sent you a reset link to your email",
      //   buttons: [
      //     {
      //       text: "Ok",
      //       role: 'cancel',
      //       handler: () => { this.navCtrl.pop(); }
      //     }
      //   ]
      // });
      // alert.present();

    }, (error) => {
      var errorMessage: string = error.message;
      alert(error.message)
      // let errorAlert = this.alertCtrl.create({
      //   message: errorMessage,
      //   buttons: [{ text: "Ok", role: 'cancel' }]
      // });
      // errorAlert.present();
    });
  }
}
  onSubmit(form: NgForm){
    console.log(form.value);
  }

  sendOTP(){
    this.showEmail = !this.showEmail;
    this.showOTP = !this.showOTP;
  }

  confirmOTP(){
    this.showOTP = !this.showOTP;
    this.showPassword = !this.showPassword;
  }

  savePassword(){
    console.log('password has reset!');
  }

}
