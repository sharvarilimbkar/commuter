import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KidsVideosPage } from './kids-videos';

@NgModule({
  declarations: [
    KidsVideosPage,
  ],
  imports: [
    IonicPageModule.forChild(KidsVideosPage),
  ],
  exports: [
    KidsVideosPage
  ]
})
export class KidsVideosPageModule {}
