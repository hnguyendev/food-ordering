import useLogin from "../hooks/auth/useLogin";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";

import { LoginSchema } from "../../schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const { login, isPending } = useLogin();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    const { email, password } = values;
    if (!email || !password) return;
    login({ email, password }, { onSettled: () => form.resetField });
  };

  console.log(import.meta.env.MODE);

  return (
    <main className="h-full flex flex-col items-center justify-center mt-12">
      <img src="/bg.jpg" alt="Logo" className="h-32 rounded-lg" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-neutral-200 w-full max-w-xl mx-auto px-10 py-10 rounded-md drop-shadow-lg space-y-6 mt-12"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="********"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? <Spinner /> : "LOGIN"}
          </Button>
          <p className="text-center text-sm">
            First time using ?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="hover:text-purple-700 hover:underline cursor-pointer"
            >
              Create an account
            </span>
          </p>
          <p
            onClick={() => navigate("/reset-password")}
            className="text-center text-sm hover:text-purple-700 hover:underline cursor-pointer"
          >
            Forgot password ?
          </p>
        </form>
      </Form>
      <Footer />
    </main>
  );
};

export default Login;
