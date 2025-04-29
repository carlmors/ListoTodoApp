import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea.model';
import { v4 as uuidv4 } from 'uuid';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private tareas: Tarea[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.tareas = (await this.storage.get('tareas')) || [];
  }

  obtenerTodas(): Tarea[] {
    return this.tareas;
  }

  async agregar(tarea: Tarea) {
    this.tareas.push(tarea);
    await this.storage.set('tareas', this.tareas);
  }

  async eliminar(id: string) {
    this.tareas = this.tareas.filter(t => t.id !== id);
    await this.storage.set('tareas', this.tareas);
  }

  async actualizar(tareaActualizada: Tarea) {
    const index = this.tareas.findIndex(t => t.id === tareaActualizada.id);
    if (index !== -1) {
      this.tareas[index] = { ...tareaActualizada };
      await this.storage.set('tareas', this.tareas);
    }
  }
}
