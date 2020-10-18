import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private deseosService: DeseosService,
              private router: Router,
              private alertController: AlertController) {
  }

  async agregarLista() {
    const alert =  this.alertController.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.titulo.length === 0) {
                return;
            } else {
              const listaId = this.deseosService.crearLista(data.titulo);
              this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
            }
          }
        }
      ]
    });

    (await alert).present();
    // this.router.navigateByUrl('tabs/tab1/agregar');
  }
}
