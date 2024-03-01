import Footer from "@/components/Footer";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import useSendResetEmail from "@/hooks/auth/useSendResetEmail";
import supabase from "@/services/supabase";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useSendResetEmail();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    mutate(email);
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt(
          "What would you like your new password to be?"
        );
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword as string,
        });

        if (data) toast.success("Password updated successfully!");
        // if (error) alert("There was an error updating your password.");
        if (error) toast.error(error.message);
      }
    });
  }, []);

  return (
    <main className="h-full flex flex-col items-center justify-center mt-12">
      <img src="/bg.jpg" alt="Logo" className="h-32 rounded-lg" />
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-200 w-full max-w-xl mx-auto px-10 py-10 rounded-md drop-shadow-lg flex flex-col gap-4 mt-12"
      >
        <h1 className="text-2xl font-semibold pb-6">Enter your email</h1>
        <Input
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" disabled={isPending}>
          Send email
        </Button>
      </form>
      <Footer />
    </main>
  );
};

export default ResetPassword;
