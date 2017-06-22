import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KidVideosPage } from './kid-videos';

@NgModule({
  declarations: [
    KidVideosPage,
  ],
  imports: [
    IonicPageModule.forChild(KidVideosPage),
  ],
  exports: [
    KidVideosPage
  ]
})
export class KidVideosPageModule {}
