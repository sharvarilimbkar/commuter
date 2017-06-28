import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public storage:Storage) {
    console.log('Hello StorageProvider Provider');
  }

  setStorage(name,value){
      this.storage.set(name, value);
  }
  getStorage(value){
    return new Promise( (resolve, reject) => {
              this.storage.get(value).then((val) => {
               
                console.log('Your value is', val);
                 resolve(val);
              });
         
        });
  }
  removeStorage(vale){
    this.storage.remove(vale);
  }
}
