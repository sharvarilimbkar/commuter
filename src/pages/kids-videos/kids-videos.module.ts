import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KidsVideosPage } from './kids-videos';
import { keysvideos,ReverseVideos1 } from '../../providers/select-image/select-image';
@NgModule({
  declarations: [
    KidsVideosPage,
    keysvideos,
    ReverseVideos1
  ],
  imports: [
    IonicPageModule.forChild(KidsVideosPage),
    
  ],
  exports: [
    KidsVideosPage
  ]
})
export class KidsVideosPageModule {}
