"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FormFields, registerSchema } from "./schema";
import Fields from "./fields";
import { register } from "./service";
import Link from "next/link";
import { login } from "../login/service";

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: async (_data, variables) => {
      try {
        await login({
          email: variables.email,
          password: variables.password,
        });
        router.push("/");
      } catch (err) {
        console.error("Auto-login failed", err);
        router.push("/login"); // fallback to login manually
      }
    },
  });

  const onSubmit = (data: FormFields) => {
    registerMutation.mutate(data);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex flex-col items-center justify-center px-4">
      <motion.h1
        className="text-4xl font-bold text-blue-700 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Create an Account
      </motion.h1>

      <motion.div
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Fields />

            {registerMutation.isError && (
              <p className="text-red-600 text-sm text-center">
                {(registerMutation.error as any)?.response?.data?.message ||
                  "Registration failed"}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || registerMutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              {isSubmitting || registerMutation.isPending
                ? "Creating..."
                : "Register"}
            </button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </FormProvider>
      </motion.div>
    </main>
  );
}
