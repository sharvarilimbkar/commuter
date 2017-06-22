import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MychildPage } from './mychild';

@NgModule({
  declarations: [
    MychildPage,
  ],
  imports: [
    IonicPageModule.forChild(MychildPage),
  ],
  exports: [
    MychildPage
  ]
})
export class MychildPageModule {}
