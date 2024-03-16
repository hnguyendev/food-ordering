import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import useSendResetEmail from "@/hooks/auth/useSendResetEmail";
import { ResetSchema } from "../../schemas";
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
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const { mutate, isPending } = useSendResetEmail();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    const { email } = values;
    if (!email) return;
    mutate(email);
  };

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
                      placeholder="example@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            Send email
          </Button>
          <p className="text-center text-xs">
            Notice: Please make sure you already registered and using a valid
            email to receive reset link.
          </p>
        </form>
      </Form>
      <Footer />
    </main>
  );
};

export default ResetPassword;
