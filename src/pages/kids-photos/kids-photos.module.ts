import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KidsPhotosPage } from './kids-photos';
import { KeysPipe,ReversePipe } from '../../providers/select-image/select-image';

@NgModule({
  declarations: [
    KidsPhotosPage,
        KeysPipe,
        ReversePipe,

  ],
  imports: [
    IonicPageModule.forChild(KidsPhotosPage),
  ],
  exports: [
    KidsPhotosPage
  ]
})
export class KidsPhotosPageModule {}
