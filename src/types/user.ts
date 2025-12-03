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
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}