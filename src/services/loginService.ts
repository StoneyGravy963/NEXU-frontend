export const loginService = async ({
  email,
  password,
  login,
}: {
  email: string;
  password: string;
  login: (email: string, password: string) => Promise<unknown>;
}): Promise<unknown> => {
  if (!email || !password)
    throw new Error("Ingresa tus credenciales.");

  return await login(email, password);
};
