import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TareaService } from '../services/tarea.service';
import { CategoriaService } from '../services/categoria.service';
import { Tarea } from '../models/tarea.model';
import { Categoria } from '../models/categoria.model';
import { AgregarTareaPage } from '../modals/agregar-tarea/agregar-tarea.page';
import { AgregarCategoriaPage } from '../modals/agregar-categoria/agregar-categoria.page'; 
import { AdminCategoriasPage } from '../modals/admin-categorias/admin-categorias.page';
import { RemoteConfig, getValue } from '@angular/fire/remote-config';
import { fetchAndActivate } from 'firebase/remote-config';
import { Storage } from '@ionic/storage-angular';
import { OnboardingPage } from '../modals/OnboardingPage/onboarding.page';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    AgregarTareaPage,
    AgregarCategoriaPage,
    AdminCategoriasPage,
    OnboardingPage
  ]
})
export class HomePage implements OnInit {
  tareas: Tarea[] = [];
  categorias: Categoria[] = [];
  categoriaSeleccionada: string = 'todas';
  tareasFiltradas: Tarea[] = [];
  activarAgregarTarea: boolean = false;

  constructor(
    private tareaService: TareaService,
    private categoriaService: CategoriaService,
    private modalCtrl: ModalController,
    private remoteConfig: RemoteConfig,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.cargarRemoteConfig();
    await this.verificarOnboarding();
  }

  ionViewWillEnter() {
    this.cargarDatos();
  }

  async cargarRemoteConfig() {
    try {
      await fetchAndActivate(this.remoteConfig);
      const flag = await getValue(this.remoteConfig, 'activarAgregarTarea');
      this.activarAgregarTarea = flag.asBoolean();
      console.log('Valor activarAgregarTarea actualizado:', this.activarAgregarTarea);
    } catch (error) {
      console.error('Error leyendo Remote Config:', error);
      this.activarAgregarTarea = true;
    }
  }

  async verificarOnboarding() {
    const yaVisto = await this.storage.get('onboardingVisto');
    if (!yaVisto) {
      const modal = await this.modalCtrl.create({
        component: OnboardingPage,
        backdropDismiss: false
      });
      await modal.present();
    }
  }

  cargarDatos() {
    this.tareas = this.tareaService.obtenerTodas();
    this.categorias = this.categoriaService.obtenerTodas();
    this.aplicarFiltro();
  }

  aplicarFiltro() {
    if (this.categoriaSeleccionada === 'todas') {
      this.tareasFiltradas = this.tareaService.obtenerTodas();
    } else {
      this.tareasFiltradas = this.tareaService.obtenerTodas()
        .filter(tarea => tarea.idCategoria === this.categoriaSeleccionada);
    }
  }

  async abrirModalAdminCategorias() {
    const modal = await this.modalCtrl.create({
      component: AdminCategoriasPage,
      componentProps: {
        categorias: this.categorias
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      if (data.accion === 'agregar') {
        this.categoriaService.agregar({
          id: Date.now().toString(),
          nombre: data.categoria,
          color: '#3880ff'
        });
        this.cargarDatos();
      }

      if (data.accion === 'eliminar') {
        const tieneTareas = this.tareas.some(tarea => tarea.idCategoria === data.idCategoria);
        if (tieneTareas) {
          const toast = document.createElement('ion-toast');
          toast.message = 'No puedes eliminar una categoría que tiene tareas asociadas.';
          toast.duration = 2500;
          toast.color = 'warning';
          document.body.appendChild(toast);
          await toast.present();
        } else {
          this.categoriaService.eliminar(data.idCategoria);
          this.cargarDatos();
        }
      }
    }
  }

  async abrirModalAgregarTarea() {
    const modal = await this.modalCtrl.create({
      component: AgregarTareaPage,
      componentProps: {
        categorias: this.categorias
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'cancel' && data) {
      this.tareaService.agregar({
        titulo: data.titulo,
        descripcion: data.descripcion,
        idCategoria: data.idCategoria || undefined,
        completada: false,
        id: Date.now().toString(),
        creadaEn: Date.now()
      });
      this.cargarDatos();
    }
  }

  async abrirModalAgregarCategoria() {
    const modal = await this.modalCtrl.create({
      component: AgregarCategoriaPage,
      componentProps: {
        categorias: this.categorias
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'cancel' && data) {
      this.categoriaService.agregar({
        id: Date.now().toString(),
        nombre: data.nombre,
        color: '#3880ff'
      });
      this.cargarDatos();
    }
  }

  toggleCompletado(tarea: Tarea) {
    tarea.completada = !tarea.completada;
    this.tareaService.actualizar(tarea);
    this.tareasFiltradas = [...this.tareasFiltradas];
  }

  async eliminarCategoria(id: string) {
    const tieneTareas = this.tareas.some(tarea => tarea.idCategoria === id);

    if (tieneTareas) {
      const alerta = document.createElement('ion-toast');
      alerta.message = 'No se puede eliminar esta categoría porque tiene tareas asociadas.';
      alerta.duration = 2500;
      alerta.color = 'warning';
      document.body.appendChild(alerta);
      await alerta.present();
      return;
    }

    const confirmacion = confirm('¿Estás seguro de eliminar esta categoría?');

    if (confirmacion) {
      this.categoriaService.eliminar(id);
      this.cargarDatos();
    }
  }

  eliminarTarea(id: string) {
    this.tareaService.eliminar(id);
    this.cargarDatos();
  }
}
