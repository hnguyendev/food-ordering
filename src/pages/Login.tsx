import { useState } from "react";
import Input from "../components/Input";
import useLogin from "../hooks/auth/useLogin";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const Login = () => {
  const { login, isPending } = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("lmao5678@gmail.com");
  const [password, setPassword] = useState("lmao5678");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <main className="h-full flex flex-col items-center justify-center mt-12">
      <img src="/bg.jpg" alt="Logo" className="h-32 rounded-lg" />
      <form
        onSubmit={handleLogin}
        className="bg-neutral-200 w-full max-w-xl mx-auto px-10 py-10 rounded-md drop-shadow-lg flex flex-col gap-4 mt-12"
      >
        <h1 className="text-2xl font-semibold pb-6">Login to your account</h1>
        <Input
          id="email"
          type="email"
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="password"
          type="password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-purple-600 rounded-md px-4 py-3 mt-4 uppercase text-lg text-neutral-100 transition hover:bg-purple-700">
          {isPending ? <Spinner /> : "Login"}
        </button>
        <p className="text-center text-sm">
          First time using ?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="hover:text-purple-700 hover:underline cursor-pointer"
          >
            Create an account
          </span>
        </p>
      </form>
      <Footer />
    </main>
  );
};

export default Login;
