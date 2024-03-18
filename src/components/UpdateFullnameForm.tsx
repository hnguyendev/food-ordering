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
import { UpdateFullnameSchema } from "../../schemas";
import { useForm } from "react-hook-form";
import useUpdateFullName from "@/hooks/auth/useUpdateFullName";
import { Button } from "./ui/button";

import { FC } from "react";

interface UpdateFullnameFormProps {
  handleClose: () => void;
}

const UpdateFullnameForm: FC<UpdateFullnameFormProps> = ({ handleClose }) => {
  const { mutate, isPending } = useUpdateFullName();

  const form = useForm<z.infer<typeof UpdateFullnameSchema>>({
    resolver: zodResolver(UpdateFullnameSchema),
    defaultValues: {
      fullName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateFullnameSchema>) => {
    mutate(values.fullName);
    form.resetField("fullName");
    handleClose();
  };

  return (
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
                    placeholder="Nguyen xdd"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleClose} variant="link">
            CANCLE
          </Button>
          <Button disabled={isPending} variant="confirm" type="submit">
            UPDATE
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateFullnameForm;
