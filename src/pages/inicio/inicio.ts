import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController,LoadingController } from 'ionic-angular';
import { VideoPlayer } from '@ionic-native/video-player';
import {  AngularFireDatabase  } from 'angularfire2/database';
import firebase from "firebase"
import {NuevoContenidoPage} from "../nuevo-contenido/nuevo-contenido";
import { InAppBrowser } from '@ionic-native/in-app-browser';
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
lista:any;
  constructor(public navCtrl: NavController, 
              public viewCtrl:ViewController,
              public navParams: NavParams,
              private iab: InAppBrowser,
              private loadingCtrl:LoadingController,
              public modalCtrl:ModalController,
              private videoPlayer: VideoPlayer,
              public fireDatbase:AngularFireDatabase
              ) {
                let loading = this.loadingCtrl.create({
                  content: 'Cargando Productos. Por favor, espere...'
              });
              loading.present();
                this.lista=this.fireDatbase.list('/video')
                console.log( "LISTA",this.lista)
                this.countryRef  = firebase.database().ref('video')
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
   loading.dismiss();
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
   irASitio(enlace){
    this.iab.create(enlace,"_blank");
  
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
