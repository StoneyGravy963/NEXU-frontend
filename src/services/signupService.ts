export async function signupUser({
  name,
  email,
  password,
  confirmPassword,
  gender,
  career,
}: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender?: string;
  career?: string;
}) {
  if (password !== confirmPassword) {
    throw new Error("Las contraseñas no coinciden.");
  }

  const body = {
    name,
    email,
    password,
    ...(gender && { gender }),
    ...(career && { career })
  };

  const response = await fetch('http://localhost:5000/users/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error en el registro');
  }

  if (data?.data?.access_token) {
    localStorage.setItem('token', data.data.access_token);
  }

  return data;
}
