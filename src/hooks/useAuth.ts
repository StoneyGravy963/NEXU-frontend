export const useAuth = () => {

  const login = async (email: string, password: string): Promise<boolean> => {
    alert(`Login ${email}`);
    return true;
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    alert(`Signup ${email}`);
    return true;
  };

  return { login, signup };
};
