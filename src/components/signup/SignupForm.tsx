// components/signup/SignupForm.jsx
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  fullName: string;
  setFullName: Dispatch<SetStateAction<string>>;
  instEmail: string;
  setInstEmail: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  gender: string;
  setGender: Dispatch<SetStateAction<string>>;
  birthDate: string;
  setBirthDate: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
};

export default function SignupForm({
  fullName,
  setFullName,
  instEmail,
  setInstEmail,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  gender,
  setGender,
  birthDate,
  setBirthDate,
  onSubmit,
}: Props) {
  return (
    <div className="bg-opacity-20 backdrop-blur-xs p-8 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-2/5">
      <h1 className="text-3xl text-white text-center mb-6">Crear Cuenta</h1>

      <input type="text" placeholder="Nombre completo"
        value={fullName} onChange={e => setFullName(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-(--oxford-blue) bg-opacity-50 text-white placeholder-gray-300" />

      <input type="email" placeholder="Correo institucional"
        value={instEmail} onChange={e => setInstEmail(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-(--oxford-blue) bg-opacity-50 text-white placeholder-gray-300" />
      <input type="email" placeholder="Correo de acceso"
        value={email} onChange={e => setEmail(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-(--oxford-blue) bg-opacity-50 text-white placeholder-gray-300" />

      <input type="password" placeholder="Contraseña"
        value={password} onChange={e => setPassword(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-(--oxford-blue) bg-opacity-50 text-white placeholder-gray-300" />
      <input type="password" placeholder="Confirmar contraseña"
        value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-(--oxford-blue) bg-opacity-50 text-white placeholder-gray-300" />

      <select value={gender} onChange={e => setGender(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-(--oxford-blue) bg-opacity-50 text-white placeholder-gray-300">
        <option value="">Selecciona tu género</option>
        <option value="Male">Masculino</option>
        <option value="Female">Femenino</option>
        <option value="Other">Otro</option>
      </select>

      <input type="date"
        value={birthDate} onChange={e => setBirthDate(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-(--oxford-blue) bg-opacity-50 text-white placeholder-gray-300" />

      <button onClick={onSubmit} className="w-full mt-4 bg-(--zomp) text-white py-2 rounded hover:bg-(--emerald) transition-colors">
        Crear Cuenta
      </button>
    </div>
  );
}
