import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { v4 as uuidv4 } from 'uuid'; 
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categorias: Categoria[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const storedCategorias = await this.storage.get('categorias');
    this.categorias = storedCategorias || [];
  }

  actualizar(categoriaActualizada: Categoria) {
    const index = this.categorias.findIndex(c => c.id === categoriaActualizada.id);
    if (index > -1) {
      this.categorias[index] = { ...categoriaActualizada };
      this.storage.get('categorias');
    }
  }

  obtenerTodas(): Categoria[] {
    return [...this.categorias]; 
  }

  agregar(categoria: Categoria) {
    const existe = this.categorias.find(c => c.nombre.trim().toLowerCase() === categoria.nombre.trim().toLowerCase());
    
    if (!existe) {
      this.categorias.push(categoria);
      this.guardarStorage();
    } else {
      console.warn('La categoría ya existe y no será agregada.');
    }
  }

  eliminar(id: string) {
    this.categorias = this.categorias.filter(categoria => categoria.id !== id);
    this.guardarStorage();
  }

  private guardarStorage() {
    this.storage.set('categorias', this.categorias);
  }
}