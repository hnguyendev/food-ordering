import Spinner from "../components/Spinner";
import useSignUp from "@/hooks/auth/useSignUp";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Footer from "@/components/Footer";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUp = () => {
  const { isPending, signUp } = useSignUp();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const onSubmit = ({
    fullName,
    email,
    password,
  }: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    if (!fullName || !email || !password) return;
    signUp({ fullName, email, password }, { onSettled: () => reset() });
  };

  const onError = () => {};

  return (
    <main className="h-full flex flex-col items-center justify-center mt-12">
      <img src="/logo-light.png" alt="Logo" className="h-32" />
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="bg-neutral-200 w-full max-w-xl mx-auto px-10 py-10 rounded-md drop-shadow-lg flex flex-col gap-4 mt-12"
      >
        <h1 className="text-2xl font-semibold pb-6">Create an account</h1>
        <div className="relative">
          <input
            className="block w-full px-6 bg-neutral-300 pb-1 pt-6 rounded-md focus:outline-none focus:ring-0 peer"
            id="fullName"
            type="text"
            {...register("fullName", {
              required: "This field is required",
            })}
            placeholder=" "
          />
          <label
            htmlFor={"fullName"}
            className="absolute top-3 left-6 z-[10] origin-[0] transition duration-150 scale-75 -translate-y-3 
        peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
          >
            Full name
            {errors && (
              <span className="ml-10 text-sm text-red-500">
                {errors?.fullName?.message}
              </span>
            )}
          </label>
        </div>

        <div className="relative">
          <input
            className="block w-full px-6 bg-neutral-300 pb-1 pt-6 rounded-md focus:outline-none focus:ring-0 peer"
            id="email"
            type="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email",
              },
            })}
            placeholder=" "
          />
          <label
            htmlFor={"email"}
            className="absolute top-3 left-6 z-[10] origin-[0] transition duration-150 scale-75 -translate-y-3 
        peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
          >
            Email
            {errors && (
              <span className="ml-10 text-sm text-red-500">
                {errors?.email?.message}
              </span>
            )}
          </label>
        </div>

        <div className="relative">
          <input
            className="block w-full px-6 bg-neutral-300 pb-1 pt-6 rounded-md focus:outline-none focus:ring-0 peer"
            id="password"
            type="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters",
              },
            })}
            placeholder=" "
          />
          <label
            htmlFor={"password"}
            className="absolute top-3 left-6 z-[10] origin-[0] transition duration-150 scale-75 -translate-y-3 
        peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
          >
            Password
            {errors && (
              <span className="ml-10 text-sm text-red-500">
                {errors?.password?.message}
              </span>
            )}
          </label>
        </div>

        <div className="relative">
          <input
            className="block w-full px-6 bg-neutral-300 pb-1 pt-6 rounded-md focus:outline-none focus:ring-0 peer"
            id="passwordConfirm"
            type="password"
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Password does not match",
            })}
            placeholder=" "
          />
          <label
            htmlFor={"passwordConfirm"}
            className="absolute top-3 left-6 z-[10] origin-[0] transition duration-150 scale-75 -translate-y-3 
        peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
          >
            Password Confirm
            {errors && (
              <span className="ml-10 text-sm text-red-500">
                {errors?.passwordConfirm?.message}
              </span>
            )}
          </label>
        </div>

        <button className="bg-purple-600 rounded-md px-4 py-3 mt-4 uppercase text-lg text-neutral-100 transition hover:bg-purple-700">
          {isPending ? <Spinner /> : "Signup"}
        </button>
        <p className="text-center text-sm">
          Already have an account ?{" "}
          <span
            onClick={() => navigate("/login")}
            className="hover:text-purple-700 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
      <Footer />
    </main>
  );
};

export default SignUp;
