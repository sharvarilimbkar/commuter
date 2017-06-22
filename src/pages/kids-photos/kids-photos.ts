import { Component , OnInit } from '@angular/core';
import { NavController } from "ionic-angular";

import { KidPhotosPage } from "./kid-photos/kid-photos";
import KidsData from '../../data/KidsData';

@Component({
  selector: 'page-kids-photos',
  templateUrl: 'kids-photos.html',
})

export class KidsPhotosPage implements OnInit{
  kidsPhotos;

  constructor(
    private navCtrl : NavController
  ){}

  ngOnInit(){
    this.kidsPhotos = KidsData;
  }

  allPhotos(kids){
    this.navCtrl.push(KidPhotosPage, kids);
  }

}
