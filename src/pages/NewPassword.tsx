import { useForm } from "react-hook-form";
import { PasswordSchema } from "../../schemas";
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
import useUpdateNewPassword from "@/hooks/auth/useUpdateNewPassword";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import supabase from "@/services/supabase";

const NewPassword = () => {
  const { mutate, isPending } = useUpdateNewPassword();
  const navigate = useNavigate();
  const [value, setValue] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setValue(true);
      }
    });
  }, [value]);
  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PasswordSchema>) => {
    const validatedFields = PasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      toast.error("XDD");
      return;
    }

    mutate(values.password);
    navigate("/dashboard");
  };

  if (value === true)
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
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
              Confirm
            </Button>
          </form>
        </Form>
      </main>
    );

  return <Button onClick={() => navigate(-1)}>&larr; Back</Button>;
};

export default NewPassword;
