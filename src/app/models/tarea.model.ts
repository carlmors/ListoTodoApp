export interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string;
  idCategoria?: string;
  completada: boolean;
  creadaEn: number;
}