import { Component, OnInit, Input } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @Input() terminada: boolean;
  constructor(public deseosService: DeseosService,
              private alertController: AlertController) { }
  ngOnInit() {}

  eliminarLista = (id: number) => {
    const promise = new Promise((resolve, reject) => {
      const lista = document.getElementById(`lista-${id}`);
      lista.classList.add('animated', 'fadeInUp');
      setTimeout(() => resolve(), 500);
    });
    promise.then(() => {
      this.deseosService.listas = this.deseosService.listas.filter(l => l.id !== id);
      this.deseosService.guardarStorage();
    });

  }

  async editarLista(lista: Lista, slidingItem: IonItemSliding) {
    const alert =  this.alertController.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
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
          text: 'Editar',
          handler: (data) => {
            if (data.titulo.length === 0) {
                return;
            } else {
             lista.titulo = data.titulo;
             this.deseosService.guardarStorage();
            }
          }
        }
      ]
    });
    (await alert).present();
    slidingItem.close();
  }


}
