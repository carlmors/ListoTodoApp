import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-admin-categorias',
  templateUrl: './admin-categorias.page.html',
  styleUrls: ['./admin-categorias.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class AdminCategoriasPage {
  @Input() categorias: Categoria[] = [];
  nuevaCategoria: string = '';
  categoriaEditando: Categoria | null = null;
  nombreEditado: string = '';

  // PAGINACIÓN
  paginaActual: number = 1;
  categoriasPorPagina: number = 4;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private categoriaService: CategoriaService,
    private tareaService: TareaService
  ) {}

  get totalPaginas(): number {
    return Math.ceil(this.categorias.length / this.categoriasPorPagina);
  }

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async agregarCategoria() {
    const nombre = this.nuevaCategoria.trim();
    if (!nombre) return;

    const existe = this.categorias.some(c => c.nombre.toLowerCase() === nombre.toLowerCase());
    if (existe) {
      this.mostrarToast('Esta categoría ya existe.', 'warning');
      return;
    }

    this.modalCtrl.dismiss({ accion: 'agregar', categoria: nombre }, 'confirm');
    this.actualizarPaginacion();
  }

  async eliminarCategoria(id: string) {
    this.modalCtrl.dismiss({ accion: 'eliminar', idCategoria: id }, 'confirm');
    this.actualizarPaginacion();
  }

  comenzarEdicion(categoria: Categoria) {
    this.categoriaEditando = { ...categoria };
    this.nombreEditado = categoria.nombre;
  }

  cancelarEdicion() {
    this.categoriaEditando = null;
    this.nombreEditado = '';
  }

  async guardarEdicion(categoria: Categoria) {
    const nuevoNombre = this.nombreEditado.trim();
    if (!nuevoNombre) return;

    const existe = this.categorias.some(c =>
      c.id !== categoria.id && c.nombre.trim().toLowerCase() === nuevoNombre.toLowerCase()
    );

    if (existe) {
      this.mostrarToast('Ya existe una categoría con ese nombre.', 'warning');
      return;
    }

    categoria.nombre = nuevoNombre;
    this.categoriaService.actualizar(categoria);

    const tareas = this.tareaService.obtenerTodas();
    tareas.forEach(t => {
      if (t.idCategoria === categoria.id) {
        this.tareaService.actualizar({ ...t });
      }
    });

    this.categorias = [...this.categoriaService.obtenerTodas()];
    this.categoriaEditando = null;
    this.nombreEditado = '';
    this.actualizarPaginacion();
    this.mostrarToast('Categoría actualizada.', 'success');
  }

  get categoriasPaginadas(): Categoria[] {
    const inicio = (this.paginaActual - 1) * this.categoriasPorPagina;
    const fin = inicio + this.categoriasPorPagina;
    return this.categorias.slice(inicio, fin);
  }

  siguientePagina() {
    const totalPaginas = Math.ceil(this.categorias.length / this.categoriasPorPagina);
    if (this.paginaActual < totalPaginas) {
      this.paginaActual++;
    }
  }

  anteriorPagina() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  actualizarPaginacion() {
    const totalPaginas = Math.ceil(this.categorias.length / this.categoriasPorPagina);
    if (this.paginaActual > totalPaginas) {
      this.paginaActual = totalPaginas || 1;
    }
  }

  private async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: color
    });
    await toast.present();
  }
  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}