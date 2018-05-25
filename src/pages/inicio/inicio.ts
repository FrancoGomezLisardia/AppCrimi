import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { VideoPlayer } from '@ionic-native/video-player';
import {  AngularFireDatabase  } from 'angularfire2/database';
import firebase from "firebase"
import {NuevoContenidoPage} from "../nuevo-contenido/nuevo-contenido"
/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
  public countryList:Array<any>;
  public loadedCountryList:Array<any>;
  public countryRef:any;

  constructor(public navCtrl: NavController, 
              public viewCtrl:ViewController,
              public navParams: NavParams,
              public modalCtrl:ModalController,
              private videoPlayer: VideoPlayer,
              public fireDatbase:AngularFireDatabase
              ) {
                this.countryRef  = firebase.database().ref('contenido')
                              .orderByChild('estado')
                               .equalTo(1);//Referencia a los productos de estado 1
    this.countryRef.on('value', countryList => {
      let countries = [];
      countryList.forEach( country => {
        countries.push(country.val());
        return false;
      });
    
      this.countryList = countries;
      this.loadedCountryList = countries;
      
    });
   //-------------------------------------------------------
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }
  cerrarModal() {
    this.viewCtrl.dismiss();
   }
   agregarContenido(){
    let modal =this.modalCtrl.create(NuevoContenidoPage);
    modal.present();
   }
   reproducir(){
// Playing a video.
this.videoPlayer.play('./assets/imgs/movie.mp4').then(() => {
 console.log('video completed');
}).catch(err => {
 console.log(err);
});
   }
}
