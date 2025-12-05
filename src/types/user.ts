export interface User {
  id?: string;
  name: string;         
  email: string;         
  password?: string;     
  is_active?: boolean;   
  career?: string;       
  gender?: string;      
  date_of_birth?: string;
  bio?: string;          
  skills?: string[];     
  avatarUrl?: string;
  tags?: string[];       // Array de nombres de tags (ej: ["Programación", "Diseño"])
  tag_ids?: string[];    // Array de IDs de tags para envíar al backend
}

export interface Tag {
  id: string;
  name: string;
  description?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface UpdateProfileData {
  name?: string;
  career?: string;
  bio?: string;
  tag_ids?: string[];
}