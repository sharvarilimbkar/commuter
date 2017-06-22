import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-kid-videos',
  templateUrl: 'kid-videos.html',
})
export class KidVideosPage {
  allVideos=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad(){
    this.allVideos = this.navParams.data;
  }

}
