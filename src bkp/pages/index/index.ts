import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { LoginPage } from "../login/login";
// 
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})

export class IndexPage {

  constructor( public navCtrl: NavController){}

  gotoLoginPage(){
    this.navCtrl.setRoot("LoginPage");
  }
}
