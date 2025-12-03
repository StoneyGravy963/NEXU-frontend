export const loginService = async ({
  email,
  password
}: {
  email: string;
  password: string;
}): Promise<unknown> => {
  if (!email || !password) {
    throw new Error("Ingresa tus credenciales.");
  }

  const response = await fetch('http://localhost:5000/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al iniciar sesión');
  }

  if (data?.data?.access_token) {
    localStorage.setItem('token', data.data.access_token);
  }

  return data;
};
