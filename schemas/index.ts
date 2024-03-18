import * as z from "zod";

export const PasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "Minimum 8 characters required",
    }),
    passwordConfirm: z.string().min(8, {
      message: "Minimum 8 characters required",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password does not match",
    path: ["passwordConfirm"],
  });

export const LoginSchema = z.object({
  email: z.string().email({
    message: "This field is required",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters required",
  }),
});

const phoneRegex = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);

export const SignupSchema = z
  .object({
    fullName: z.string().min(3, { message: "Minium 3 characters required" }),
    phone: z.string().regex(phoneRegex, "Please provide a valid number!"),
    email: z.string().email({
      message: "This field is required",
    }),
    password: z.string().min(8, {
      message: "Minimum 8 characters required",
    }),
    passwordConfirm: z.string().min(8, {
      message: "Minimum 8 characters required",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password does not match",
    path: ["passwordConfirm"],
  });

export const ResetSchema = z.object({
  email: z.string().email({
    message: "This field is required",
  }),
});

export const UpdateFullnameSchema = z.object({
  fullName: z.string().min(3, {
    message: "Name should be at least 3 characters",
  }),
});

export const UpdatePhoneSchema = z.object({
  phone: z.string().regex(phoneRegex, "Please provide a valid number!"),
});

export const UpdateAddressSchema = z.object({
  address: z.string().min(5, {
    message: "Please provide a valid address",
  }),
});
