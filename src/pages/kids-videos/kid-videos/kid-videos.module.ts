import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KidVideosPage } from './kid-videos';
import { KeysVideoPipe , ReverseVideo } from '../../../providers/select-image/select-image';

@NgModule({
  declarations: [
    KidVideosPage,
    KeysVideoPipe,
    ReverseVideo
  ],
  imports: [
    IonicPageModule.forChild(KidVideosPage),
  ],
  exports: [
    KidVideosPage
  ]
})
export class KidVideosPageModule {}
