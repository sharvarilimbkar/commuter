import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KidsPhotosPage } from './kids-photos';

@NgModule({
  declarations: [
    KidsPhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(KidsPhotosPage),
  ],
  exports: [
    KidsPhotosPage
  ]
})
export class KidsPhotosPageModule {}
