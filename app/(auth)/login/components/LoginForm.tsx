"use client";
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormText from "@/app/components/Forms/FormText";
import FormTextPassword from "@/app/components/Forms/FormTextPassword";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import { LoginSuccessResponse } from "../types";
import { setCookie } from "cookies-next";
import { useToast } from "@/app/components/Toast/useToast";
import { noAuthRequest } from "@/services/request";
import Link from "next/link";

const loginSchema = z
  .object({
    email: z.string().email("Format email salah"),
    password: z.string(),
  })
  .required();

type Schema = z.infer<typeof loginSchema>;
const LoginForm = () => {
  const router = useRouter();
  const toast = useToast();

  const { handleSubmit, control, formState, watch, setError } = useForm<Schema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Schema) => {
      return noAuthRequest<LoginSuccessResponse>("/login", "POST", data);
    },
    onSuccess: (data) => {
      const { isError, res } = data;
      if (isError || !res) {
        const { message: errorMessage } = data as unknown as { message: string };
        if (errorMessage === "Email dan password tidak sesuai.") {
          toast({
            type: "error",
            message: errorMessage,
          });
        } else {
          setError("email", {
            type: "validate",
            message: errorMessage,
          });
        }
        return;
      }

      const { id, email, name, role } = res;
      setCookie("user", JSON.stringify({ id, email, name, role }));
      queryClient.clear();
      router.push("/dashboard/profile");
    },
  });

  const formErrors = formState.errors;
  const [emailValue, passwordValue] = watch(["email", "password"]);
  const isSubmitDisabled =
    formErrors.email !== undefined ||
    formErrors.password !== undefined ||
    !emailValue ||
    !passwordValue;

  const onSubmit = (data: Schema) => {
    mutate(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <FormText
            control={control}
            label="Email"
            name="email"
            placeholder="Masukkan email yang terdaftar"
          />
          <FormTextPassword control={control} label="Password" name="password" />
          <Link href={"/forgot-password"}>
            <p className="text-primary text-sm font-semibold hover:underline">Lupa password?</p>
          </Link>
          <Button
            size="md"
            color="primary"
            disabled={isSubmitDisabled}
            type="submit"
            isLoading={isPending}
          >
            Masuk
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
