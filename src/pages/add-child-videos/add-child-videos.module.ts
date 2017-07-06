import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddChildVideosPage } from './add-child-videos';

@NgModule({
  declarations: [
    AddChildVideosPage,
  ],
  imports: [
    IonicPageModule.forChild(AddChildVideosPage),
  ],
  exports: [
    AddChildVideosPage
  ]
})
export class AddChildVideosPageModule {}
