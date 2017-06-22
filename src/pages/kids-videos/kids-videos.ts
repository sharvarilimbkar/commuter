import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import KidsData from '../../data/KidsData';
@IonicPage()
@Component({
  selector: 'page-kids-videos',
  templateUrl: 'kids-videos.html',
})
export class KidsVideosPage {
  kidsVideo;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ngOnInit(){
    this.kidsVideo = [
  {
    "index": 0,
    "name": "Manuela Martinez",
    "parents": "Richard Martinez",
    "profilePic": "./assets/images/kidsData/kid1.jpg",
    "age": 4,
    "allpic": [
        {
          'id':1,
          'pic':"./assets/images/kidsData/kid1.1.jpg"
        },
        {
          'id':2,
          'pic':"./assets/images/kidsData/kid1.2.jpg"
        },
        {
          'id':3,
          'pic':"./assets/images/kidsData/kid1.1.jpg"
        },
        {
          'id':4,
          'pic':"./assets/images/kidsData/kid1.2.jpg"
        },
        {
          'id':5,
          'pic':"./assets/images/kidsData/kid1.1.jpg"
        }
      ],
    "allvid":[
        {
          'id':1,
          'vid':"./assets/images/kidsData/kid1.2.jpg"
        },
        {
          'id':2,
          'vid':"./assets/images/kidsData/kid1.1.jpg"
        }
      ]
  },

  {
    "index": 1,
    "name": "Martinez James",
    "parents": "Moore James",
    "profilePic": "./assets/images/kidsData/kid2.jpg",
    "age": 6,
    "allpic": [
        {
          'id':1,
          'pic':"./assets/images/kidsData/kid2.1.jpg"
        },
        {
          'id':2,
          'pic':"./assets/images/kidsData/kid2.2.jpg"
        }
      ],
    "allvid":[
        {
          'id':1,
          'vid':"./assets/images/kidsData/kid2.2.jpg"
        },
        {
          'id':2,
          'vid':"./assets/images/kidsData/kid2.1.jpg"
        },
        {
          'id':3,
          'vid':"./assets/images/kidsData/kid2.2.jpg"
        },
        {
          'id':4,
          'vid':"./assets/images/kidsData/kid2.1.jpg"
        }
      ]
  },


  {
    "index": 2,
    "name": "Lindsey Aguirre",
    "parents": "Ramos Aguirre",
    "profilePic": "./assets/images/kidsData/kid3.jpg",
    "age": 4,
    "allpic": [
        {
          'id':1,
          'pic':"./assets/images/kidsData/kid3.1.jpg"
        },
        {
          'id':2,
          'pic':"./assets/images/kidsData/kid3.2.jpg"
        }
      ],
    "allvid":[
        {
          'id':1,
          'vid':"./assets/images/kidsData/kid3.2.jpg"
        },
        {
          'id':2,
          'vid':"./assets/images/kidsData/kid3.1.jpg"
        }
      ]
  },

  {
    "index": 3,
    "name": "Gross Cleveland",
    "parents": "Oliver Cleveland",
    "profilePic": "./assets/images/kidsData/kid4.jpg",
    "age": 3,
    "allpic": [
        {
          'id':1,
          'pic':"./assets/images/kidsData/kid4.1.jpg"
        },
        {
          'id':2,
          'pic':"./assets/images/kidsData/kid4.2.jpg"
        }
      ],
    "allvid":[
        {
          'id':1,
          'vid':"./assets/images/kidsData/kid4.2.jpg"
        },
        {
          'id':2,
          'vid':"./assets/images/kidsData/kid4.1.jpg"
        }
      ]
  },

  {
    "index": 4,
    "name": "Kidd Fox",
    "parents":"Christensen Fox",
    "profilePic": "./assets/images/kidsData/kid6.jpg",
    "age": 5,
    "allpic": [
        {
          'id':1,
          'pic':"./assets/images/kidsData/kid6.1.jpg"
        },
        {
          'id':2,
          'pic':"./assets/images/kidsData/kid6.2.jpg"
        }
      ],
    "allvid":[
        {
          'id':1,
          'vid':"./assets/images/kidsData/kid6.2.jpg"
        },
        {
          'id':2,
          'vid':"./assets/images/kidsData/kid6.1.jpg"
        }
      ]
  }

];
  }

  allVideos(kids){
    this.navCtrl.push("KidVideosPage", kids);
  }

}
