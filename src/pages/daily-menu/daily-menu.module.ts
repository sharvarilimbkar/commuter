import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyMenuPage } from './daily-menu';

@NgModule({
  declarations: [
    DailyMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyMenuPage),
  ],
  exports: [
    DailyMenuPage
  ]
})
export class DailyMenuPageModule {}
