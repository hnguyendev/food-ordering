import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Footer from "@/components/Footer";
import useSignUp from "@/hooks/auth/useSignUp";
import { Button } from "@/components/ui/button";
import { SignupSchema } from "../../schemas";
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

const SignUp = () => {
  const { isPending, signUp } = useSignUp();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    const { fullName, phone, email, password, passwordConfirm } = values;
    if (!fullName || !email || !phone || !password || !passwordConfirm) return;
    signUp(
      { fullName, email, phone, password },
      { onSettled: () => form.resetField }
    );
  };

  return (
    <main className="h-full flex flex-col items-center justify-center mt-12">
      <img src="/bg.jpg" alt="Logo" className="h-32 rounded-lg mt-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-neutral-200 w-full max-w-xl mx-auto px-10 py-10 rounded-md drop-shadow-lg space-y-6 mt-12"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Nguyen XDD"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="0905666777"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      placeholder="example@gmail.com"
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
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
            {isPending ? <Spinner /> : "SIGNUP"}
          </Button>
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
      </Form>
      <Footer />
    </main>
  );
};

export default SignUp;
