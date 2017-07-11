import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KidPhotosPage } from './kid-photos';
import { keysPhotos , Reverse } from '../../../providers/select-image/select-image';

@NgModule({
  declarations: [
    KidPhotosPage,
    keysPhotos,
    Reverse
  ],
  imports: [
    IonicPageModule.forChild(KidPhotosPage),
    
    
  ],
  exports: [
    KidPhotosPage
  ]
})
export class KidPhotosPageModule {}
