import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
// import { ReversePipe } from "../../providers/select-image/select-image";
import { ReverseHome,ReverseHomeVideos } from '../../providers/select-image/select-image';

@NgModule({
  declarations: [
    HomePage,
    ReverseHome,
    ReverseHomeVideos
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
