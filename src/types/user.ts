export interface User {
  id: number;
  nombre_usuario: string;
  nombre_completo: string;
  correo_electronico: string;
  biografia?: string;
  habilidades: string[];
  reputacion: number;
  tags: string[];
  avatarUrl?: string;
}