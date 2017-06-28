import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectDaycarePage } from './select-daycare';
import { SearchProvider } from '../../../providers/search/search';


@NgModule({
  declarations: [
    SelectDaycarePage,
    SearchProvider

  ],
  imports: [
    IonicPageModule.forChild(SelectDaycarePage),
  ],
  exports: [
    SelectDaycarePage
  ]
})
export class SelectDaycarePageModule {}
