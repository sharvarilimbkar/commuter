import { Component } from '@angular/core';


import { NavParams } from "ionic-angular";
@Component({
  selector: 'page-kid-photos',
  templateUrl: 'kid-photos.html',
})

export class KidPhotosPage {
   allPhotos=[];

   constructor( private navParams: NavParams){}
   
  ionViewDidLoad(){
    this.allPhotos = this.navParams.data;
  }
}