export async function signupUser({
  email,
  password,
  confirmPassword,
  handleSignup,
}: {
  email: string;
  password: string;
  confirmPassword: string;
  handleSignup: (creds: { email: string; password: string }) => Promise<void>;
}) {
  if (password !== confirmPassword)
    throw new Error("Las contraseñas no coinciden.");

  // Aquí se hará la integración de Firestore para más campos
  await handleSignup({ email, password });
}
