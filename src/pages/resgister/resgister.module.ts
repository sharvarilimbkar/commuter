import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResgisterPage } from './resgister';

@NgModule({
  declarations: [
    ResgisterPage,
  ],
  imports: [
    IonicPageModule.forChild(ResgisterPage),
  ],
  exports: [
    ResgisterPage
  ]
})
export class ResgisterPageModule {}
