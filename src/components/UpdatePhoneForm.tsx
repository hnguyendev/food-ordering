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
import { UpdatePhoneSchema } from "../../schemas";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

import { FC } from "react";
import useUpdateProfile from "@/hooks/profiles/useUpdateProfile";
import useUser from "@/hooks/auth/useUser";

interface UpdatePhoneFormProps {
  handleClose: () => void;
}

const UpdatePhoneForm: FC<UpdatePhoneFormProps> = ({ handleClose }) => {
  const { mutate, isPending } = useUpdateProfile();
  const { data } = useUser();
  const id = data?.id as string;

  const form = useForm<z.infer<typeof UpdatePhoneSchema>>({
    resolver: zodResolver(UpdatePhoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UpdatePhoneSchema>) => {
    const address = "";
    const { phone } = values;
    mutate({ id, phone, address });
    form.resetField("phone");
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    placeholder="09999999"
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

export default UpdatePhoneForm;
