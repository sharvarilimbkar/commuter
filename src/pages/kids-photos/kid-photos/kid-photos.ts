import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-kid-photos',
  templateUrl: 'kid-photos.html',
})
export class KidPhotosPage {
  allPhotos=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad(){
    this.allPhotos = this.navParams.data;
  }

}
