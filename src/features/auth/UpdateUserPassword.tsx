import { Button } from "@/components/ui/button";
import useUpdatePassword from "@/hooks/auth/useUpdatePassword";
import { useForm } from "react-hook-form";

interface FormValues {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}

const UpdateUserPassword = () => {
  const {
    register,
    formState: { errors },
    getValues,
    reset,
    handleSubmit,
  } = useForm<FormValues>();

  const { mutate, isPending } = useUpdatePassword();

  const onSubmit = ({
    password,
    oldPassword,
  }: {
    password: string;
    oldPassword: string;
  }) => {
    if (!password || !oldPassword) return;
    mutate({ password, oldPassword }, { onSettled: () => reset() });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-6 px-6 py-4 pb-10 max-w-3xl w-full bg-background border border-gray-500 rounded-lg"
    >
      <h3 className="font-medium text-sm lg:text-lg">Update password</h3>
      <div className="relative">
        <input
          className="block w-full px-6 bg-neutral-300 pb-1 pt-6 rounded-md focus:outline-none focus:ring-0 peer"
          id="oldPassword"
          type="password"
          {...register("oldPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters",
            },
          })}
          placeholder=" "
          disabled={isPending}
        />
        <label
          htmlFor="oldPassword"
          className="text-xs lg:text-base absolute top-3 left-6 z-[10] origin-[0] transition duration-150 scale-75 -translate-y-3 
        peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
        >
          Current Password
          {errors && (
            <span className="ml-10 text-sm text-red-500">
              {errors?.oldPassword?.message}
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
          disabled={isPending}
        />
        <label
          htmlFor="password"
          className="text-xs lg:text-base absolute top-3 left-6 z-[10] origin-[0] transition duration-150 scale-75 -translate-y-3 
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
          disabled={isPending}
        />
        <label
          htmlFor="passwordConfirm"
          className="text-xs lg:text-base absolute top-3 left-6 z-[10] origin-[0] transition duration-150 scale-75 -translate-y-3 
        peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
        >
          Confirm Password
          {errors && (
            <span className="ml-10 text-sm text-red-500">
              {errors?.passwordConfirm?.message}
            </span>
          )}
        </label>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
};

export default UpdateUserPassword;
