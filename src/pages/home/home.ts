import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

 constructor(public navCtrl: NavController, db: AngularFireDatabase) {
    // this.items = db.list('/items');
    // console.log(this.items);
    // let subscription =  this.items.subscribe(
    //       value => this.values.push(value),
    //       error => this.anyErrors = true,
    //       () => this.finished = true
    //   );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
   items: FirebaseListObservable<any[]>;

   private values: Array<any> = [];
   private anyErrors: boolean;
  private finished: boolean;
  value :Array<any> = [];


  // subscriptionPage = SubscriptionPage;
  // kidsphotosPage = KidsPhotosPage;
  // kidsvideosPage = KidsVideosPage;
  // announcementPage = AnnouncementPage;

  KidsData;

  ngOnInit(){
    this.KidsData = [];
  }

}
