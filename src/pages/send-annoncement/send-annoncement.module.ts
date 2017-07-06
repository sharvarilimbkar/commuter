import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendAnnoncementPage } from './send-annoncement';

@NgModule({
  declarations: [
    SendAnnoncementPage,
  ],
  imports: [
    IonicPageModule.forChild(SendAnnoncementPage),
  ],
  exports: [
    SendAnnoncementPage
  ]
})
export class SendAnnoncementPageModule {}
