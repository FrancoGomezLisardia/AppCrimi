import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,LoadingController,ModalController,
  AlertController,Platform } from 'ionic-angular';
import { UsersModels } from '../../models/users-model';

import firebase from 'firebase';
import { AngularFireDatabase  } from 'angularfire2/database';
import { RegistrarPage } from '../registrar/registrar';
import { InicioPage } from '../inicio/inicio';


/**
 * Generated class for the InicioSesionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio-sesion',
  templateUrl: 'inicio-sesion.html',
})
export class InicioSesionPage {
  userModel: UsersModels;
  listaDeUsuarios:any[]= [];
  public usuariosRef:firebase.database.Reference;
  constructor(public loadingCtrl: LoadingController,
              public modalCtrl:ModalController,
              public navCtrl: NavController,
              private menuCtrl:MenuController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
             
              private platform:Platform,
              ) {
                let loading = this.loadingCtrl.create({
                  content: 'Cargando Aplicacion. Por favor, espere...'
              });
              loading.present();
  this.userModel = new UsersModels();
  
 

 loading.dismiss();
  }

 

  Iniciar_Sesion() {
    this.usuariosRef = firebase.database().ref('/Usuarios');//Crea una referencia al Nodo Usuarios
    this.usuariosRef.on('value', listaDeUsuarios => {
      let usuarios = [];
      listaDeUsuarios.forEach( usuario => {
      usuarios.push(usuario.val());
      return false;
       });
       this.listaDeUsuarios = usuarios ;
    console.log("Usuarios Registrados:",this.listaDeUsuarios);
   });//Crea un arreglo con los elementos del nodo Usuarios
    for (let index = 0; index < this.listaDeUsuarios.length; index++) {
    
         const element =  this.listaDeUsuarios[index];
         if (element.contrasena==this.userModel.password && element.correo==this.userModel.email ) {
            
            // console.log("ID Usuario Actual:",this.cip.usuario_actual)
            // this.cip.tipo_usuario=element.tipo_usuario
            // this.cip.id_usuario=element.id
            this.navCtrl.setRoot(InicioPage,{'usuarioLogeado':element});
            return;
         } 
       }
   this.alertCtrl.create({
    title:"Error",
    subTitle:'Verifique que los datos ingresados sean los correcto y si esta conectado a internet.',
    buttons:["Aceptar"]
   }).present();
   console.log('--------------------------------');
   return;
    
  }
  Registrar(){
    
    let modal =this.modalCtrl.create(RegistrarPage);
    modal.present();
  }
}
