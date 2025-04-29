import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-agregar-tarea',
  standalone: true,
  templateUrl: './agregar-tarea.page.html',
  styleUrls: ['./agregar-tarea.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule]
})
export class AgregarTareaPage {
  titulo: string = '';
  descripcion: string = '';
  categoriaSeleccionada: string = '';

  @Input() categorias: Categoria[] = []; // 👈 Aquí recibimos las categorías disponibles

  constructor(private modalCtrl: ModalController) {}

  async guardar() {
    if (!this.titulo.trim()) {
      const toast = await this.mostrarToast('Por favor ingresa un título.', 'danger');
      return;
    }
  
    if (!this.categoriaSeleccionada) {
      const toast = await this.mostrarToast('Por favor selecciona una categoría.', 'warning');
      return;
    }
  
    this.modalCtrl.dismiss({
      titulo: this.titulo,
      descripcion: this.descripcion,
      idCategoria: this.categoriaSeleccionada
    }, 'confirm');
  }
  async mostrarToast(mensaje: string, color: string = 'primary') {
    const toast = document.createElement('ion-toast');
    toast.message = mensaje;
    toast.duration = 2000;
    toast.color = color;
    document.body.appendChild(toast);
    await toast.present();
  }
  
  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}