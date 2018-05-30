import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileOpener } from '@ionic-native/file-opener';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import * as firebase from 'firebase';
import {  AngularFireDatabase } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-nuevo-contenido',
  templateUrl: 'nuevo-contenido.html',
})
export class NuevoContenidoPage {
  titulo: string = "";
  enlace:string = "";
  descripcion: string="";
  ruta: any;
  video:any;
  //imagenPreview:string = "";
  imagen64:string;
  estado=1;
  constructor(public navCtrl: NavController, 
              private transfer: FileTransfer,
              public navParams: NavParams,
              private fileChooser: FileChooser, 
              private fileOpener: FileOpener, 
              private filePath: FilePath,
              private viewCtrl:ViewController,
              private toastCtrl:ToastController,
              public fireDatabase: AngularFireDatabase,
              private file: File) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoContenidoPage');
  }
  seleccionar_video(){
   
    
    this.fileChooser.open().then(file => {
      this.filePath.resolveNativePath(file).then(resolvedFilePath => {
        this.fileOpener.open(resolvedFilePath, 'application/mp4').then(file => {
          alert("It worked!")
        }).catch(err => {
          alert(JSON.stringify(err));
        })
      })
    
    //   }).catch(err => {
    //     alert(JSON.stringify(err));
    //   });
    // }).catch(err => {
    //   alert(JSON.stringify(err));
    });
  
  // }
  // seleccionar_documento(){
    
  }
  cerrarModal() {
    this.viewCtrl.dismiss();
   }
  guardar(){
    let video={
      enlace:this.enlace,
      titulo:this.titulo,
      descripcion:this.descripcion,
      estado:this.estado
    }
    this.fireDatabase.list('video/').push(video)
    let toast = this.toastCtrl.create({
      message: 'Enlace agregado',
      duration: 3000
    });
    toast.present();
    this.viewCtrl.dismiss()
    
  }

obtenerArchivo(){
//   this.file.resolveDirectoryUrl
// this.file.getFile(, fileName, flags)

}
  uploadFile() {
    // let loader = this.loadingCtrl.create({
    //   content: "Uploading..."
    // });
    // loader.present();
    // const fileTransfer: FileTransferObject = this.transfer.create();
  
    // let options: FileUploadOptions = {
    //   fileKey: 'ionicfile',
    //   fileName: 'ionicfile',
    //   chunkedMode: false,
    //   mimeType: "image/jpeg",
    //   headers: {}
    // }
  
    // fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
    //   .then((data) => {
    //   console.log(data+" Uploaded Successfully");
    //   this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
    //   loader.dismiss();
    //   this.presentToast("Image uploaded successfully");
    // }, (err) => {
    //   console.log(err);
    //   loader.dismiss();
    //   this.presentToast(err);
    // });
  }
}
