import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KidPhotosPage } from './kid-photos';
import { KeysPipe } from '../../../providers/select-image/select-image';

@NgModule({
  declarations: [
    KidPhotosPage,
    KeysPipe,
  ],
  imports: [
    IonicPageModule.forChild(KidPhotosPage),
  ],
  exports: [
    KidPhotosPage
  ]
})
export class KidPhotosPageModule {}
