import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KidsPhotosPage } from './kids-photos';
import { KeysPipe } from '../../providers/select-image/select-image';

@NgModule({
  declarations: [
    KidsPhotosPage,
    KeysPipe,
  ],
  imports: [
    IonicPageModule.forChild(KidsPhotosPage),
  ],
  exports: [
    KidsPhotosPage
  ]
})
export class KidsPhotosPageModule {}
