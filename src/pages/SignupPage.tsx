import { useSignupForm } from "../hooks/useSignupForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/signup/SignupForm";
import { signupUser } from "../services/signupService";

export default function SignupPage() {
  const form = useSignupForm();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const wrappedHandleSignup = async () => {
        await signup(form.email, form.password);
      };

      await signupUser({
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        handleSignup: wrappedHandleSignup,
      });

      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-(--oxford-blue) to-(--oxford-two)">
      <SignupForm {...form} onSubmit={onSubmit} />
    </div>
  );
}
