import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-categoria',
  standalone: true,
  templateUrl: './agregar-categoria.page.html',
  styleUrls: ['./agregar-categoria.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class AgregarCategoriaPage {
  nombreCategoria: string = '';

  constructor(private modalCtrl: ModalController) {}

  guardar() {
    if (this.nombreCategoria.trim() !== '') {
      this.modalCtrl.dismiss({
        nombre: this.nombreCategoria
      });
    }
  }

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}