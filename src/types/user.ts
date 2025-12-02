export interface User {
  id?: string;
  name: string;          // Requerido
  email: string;         // Requerido
  password?: string;     // Requerido solo para POST (signup/login)
  is_active?: boolean;   // Default: true
  career?: string;       // Opcional (Ej: "Ingeniería en Sistemas")
  gender?: string;       // Opcional
  date_of_birth?: string;// Opcional (Formato ISO: "YYYY-MM-DD")
  bio?: string;          // Opcional
  skills?: string[];     // Opcional (Array de strings, Ej: ["Python", "React"])
  avatarUrl?: string;    // Added for existing component usage
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}