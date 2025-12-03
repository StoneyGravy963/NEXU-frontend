import { useSignupForm } from "../hooks/useSignupForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/signup/SignupForm";

export default function SignupPage() {
  const form = useSignupForm();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      await signup({
        name: form.fullName,
        email: form.instEmail,
        password: form.password,
        gender: form.gender,
        date_of_birth: form.birthDate,
      });
      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-oxford-blue to-oxford-two">
      <SignupForm {...form} onSubmit={onSubmit} />
    </div>
  );
}
