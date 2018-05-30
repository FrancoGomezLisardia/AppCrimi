import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { VideoPlayer } from '@ionic-native/video-player';
import { FileOpener } from '@ionic-native/file-opener';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistrarPage } from '../pages/registrar/registrar';
import { InicioPage } from '../pages/inicio/inicio';
import { InicioSesionPage } from '../pages/inicio-sesion/inicio-sesion';
import * as firebase from 'firebase';
import { AngularFireModule }         from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NuevoContenidoPage } from '../pages/nuevo-contenido/nuevo-contenido';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { InAppBrowser } from '@ionic-native/in-app-browser';
export const firebaseConfig = {
  apiKey: "AIzaSyA1_-Sc6cTCrQQ3ba7cQAweGYjO_OiIdrs",
  authDomain: "appcrimi.firebaseapp.com",
  databaseURL: "https://appcrimi.firebaseio.com",
  projectId: "appcrimi",
  storageBucket: "appcrimi.appspot.com",
  messagingSenderId: "855151332533"
};
    

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistrarPage,
    InicioSesionPage,
    InicioPage,
    NuevoContenidoPage 
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistrarPage,
    InicioSesionPage,
    InicioPage,
    NuevoContenidoPage 
  ],
  providers: [
    StatusBar,
    InAppBrowser,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VideoPlayer,
    FilePath ,
    FileOpener,
    FileChooser,
    File,
    FileTransfer,
    //FileUploadOptions,
    FileTransferObject,
  
    
  ]
})
export class AppModule {}
