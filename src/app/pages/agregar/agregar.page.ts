import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem: '';
  constructor(private deseosService: DeseosService,
              private activateRoute: ActivatedRoute) {
      const LISTAID = this.activateRoute.snapshot.paramMap.get('listaId');
      this.lista = this.deseosService.obtenerLista(LISTAID);
   }

  ngOnInit() {
  }

  agregarItem() {
    if (this.nombreItem.length !== 0) {
      const nuevoItem = new ListaItem(this.nombreItem);
      this.lista.items.push(nuevoItem);
      this.nombreItem = '';
      this.deseosService.guardarStorage();
    }
  }
  eliminarItem(i: number) {
    const item = document.getElementById(`item-${i}`);
    console.log(item);
    const promise = new Promise((resolve, reject) => {
      item.classList.remove('animated', 'fadeInDown');
      item.classList.add('animated-slow', 'fadeInUp');
      setTimeout(() => resolve(), 500);
    });
    promise.then(value => {
      this.lista.items.splice(i, 1);
      this.deseosService.guardarStorage();
    });
  }

  cambioChange = (item: ListaItem) => {
    const PENDIENTES = this.lista.items
                                  .filter(itemData => !itemData.completado)
                                  .length;
    if (PENDIENTES === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminanda = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminanda = false;
    }
    this.deseosService.guardarStorage();
  }

}
