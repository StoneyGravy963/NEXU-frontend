export interface User {
  id: number;
  nombre_usuario: string;
  nombre_completo: string;
  correo_electronico: string;
  descripcion?: string;
  habilidades: string[];
  carrera?: string;
  genero?: string;
  fecha_nacimiento?: string;
  avatarUrl?: string;
}