import { Component } from '@angular/core';

import { NavParams } from "ionic-angular";
@Component({
  selector: 'page-kid-videos',
  templateUrl: 'kid-videos.html',
})

export class KidVideosPage {
   allVideos=[];

   constructor(private navParams: NavParams){}

  ionViewDidLoad(){
    this.allVideos = this.navParams.data;
  }

}
