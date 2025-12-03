import { useState } from "react";

export function useSignupForm() {
  const [fullName, setFullName] = useState("");
  const [instEmail, setInstEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  return {
    fullName, setFullName,
    instEmail, setInstEmail,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    gender, setGender,
    birthDate, setBirthDate,
  };
}
