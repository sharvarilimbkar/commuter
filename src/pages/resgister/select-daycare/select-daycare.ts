import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';

/**
 * Generated class for the SelectDaycarePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-daycare',
  templateUrl: 'select-daycare.html',
})
export class SelectDaycarePage {
showList: boolean = false;
  searchQuery: string = '';
  items;
  daycareDetails
  public countryList:Array<any>;
  public loadedCountryList:Array<any>;
  public countryRef:firebase.database.Reference;
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider,public afDatabase: AngularFireDatabase) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
      this.countryRef = firebase.database().ref('/userData');
     this.countryRef.on('value', countryList => {
      let countries = [];
      
      countryList.forEach( country => {
        // alert(country.key);
        countries.push({id:country.key,value:country.val()});
        return false;
      });

      this.countryList = countries;
      this.loadedCountryList = countries;
      console.log("countryList "+JSON.stringify(this.countryList));
    });
    
  }
   initializeItems(): void {
    this.countryList = this.loadedCountryList;
  }
 
selectDaycare(id){
  // alert("hiii" +id);
     this.auth.updateDaycare({d_uid:id}).then((data)=>{
      console.log(data);
    })
}
getItems(searchbar) {
  // Reset items back to all of the items
  this.initializeItems();
  var q = searchbar.srcElement.value;


  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }

  this.countryList = this.countryList.filter((v) => {
    if(v.value.username && q) {
     
      if (v.value.username.toLowerCase().indexOf(q.toLowerCase()) > -1) {
         
        return true;

      }
       this.showList = true;
      return true;
    }else{
       this.showList = true;
    }
  });

  console.log(q, this.countryList.length);

}
proceed(){
    this.navCtrl.setRoot("HomePage");
}

  
}
