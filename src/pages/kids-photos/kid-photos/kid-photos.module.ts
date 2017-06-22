import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KidPhotosPage } from './kid-photos';

@NgModule({
  declarations: [
    KidPhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(KidPhotosPage),
  ],
  exports: [
    KidPhotosPage
  ]
})
export class KidPhotosPageModule {}
