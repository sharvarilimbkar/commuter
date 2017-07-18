import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeeklymenuPage } from './weeklymenu';

@NgModule({
  declarations: [
    WeeklymenuPage,
  ],
  imports: [
    IonicPageModule.forChild(WeeklymenuPage),
  ],
  exports: [
    WeeklymenuPage
  ]
})
export class WeeklymenuPageModule {}
