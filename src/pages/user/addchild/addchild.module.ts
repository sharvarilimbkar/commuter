import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddchildPage } from './addchild';

@NgModule({
  declarations: [
    AddchildPage,
  ],
  imports: [
    IonicPageModule.forChild(AddchildPage),
  ],
  exports: [
    AddchildPage
  ]
})
export class AddchildPageModule {}
