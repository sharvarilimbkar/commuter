import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddChildPhotosPage } from './add-child-photos';

@NgModule({
  declarations: [
    AddChildPhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(AddChildPhotosPage),
  ],
  exports: [
    AddChildPhotosPage
  ]
})
export class AddChildPhotosPageModule {}
