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
  tags?: Tag[];          
  tag_ids?: string[];    
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