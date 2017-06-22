import { Component , OnInit} from '@angular/core';
import { NavController } from "ionic-angular";

import { KidVideosPage } from "./kid-videos/kid-videos";
import KidsData from '../../data/KidsData';
@Component({
  selector: 'page-kids-videos',
  templateUrl: 'kids-videos.html',
})

export class KidsVideosPage implements OnInit{
  kidsVideo;
  
  constructor(
    public navCtrl: NavController
  ){}
  

  ngOnInit(){
    this.kidsVideo = KidsData;
  }

  allVideos(kids){
    this.navCtrl.push(KidVideosPage, kids);
  }
}
