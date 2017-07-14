import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import KidsData from '../../../data/KidsData';
@IonicPage()
@Component({
  selector: 'page-mychild',
  templateUrl: 'mychild.html',
})
export class MychildPage {
  picvid;

  kidsPhotos;
  kidsVideos;
  domainUrl
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.picvid = "photos";
  }

  ngOnInit(){
    // this.domainUrl =
    this.kidsPhotos = [];
  }
 

}
