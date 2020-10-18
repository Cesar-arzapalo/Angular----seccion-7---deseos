import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [ListasComponent],
  exports: [ListasComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    PipesModule
  ]
})
export class ComponentsModule { }
