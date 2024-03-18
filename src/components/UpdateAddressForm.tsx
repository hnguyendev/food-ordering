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
import { UpdateAddressSchema } from "../../schemas";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

import { FC } from "react";
import useUpdateProfile from "@/hooks/profiles/useUpdateProfile";
import useUser from "@/hooks/auth/useUser";

interface UpdateAddressFormProps {
  handleClose: () => void;
}

const UpdateAddressForm: FC<UpdateAddressFormProps> = ({ handleClose }) => {
  const { mutate, isPending } = useUpdateProfile();
  const { data } = useUser();
  const id = data?.id as string;

  const form = useForm<z.infer<typeof UpdateAddressSchema>>({
    resolver: zodResolver(UpdateAddressSchema),
    defaultValues: {
      address: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateAddressSchema>) => {
    const phone = "";
    const { address } = values;
    mutate({ id, phone, address });
    form.resetField("address");
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New address</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    placeholder="111 xdd"
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

export default UpdateAddressForm;
