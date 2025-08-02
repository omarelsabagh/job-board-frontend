"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FormFields, loginSchema } from "./schema";
import Fields from "./fields";
import { login } from "./service";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => router.push("/"),
  });

  const onSubmit = (data: FormFields) => {
    loginMutation.mutate(data);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex flex-col items-center justify-center px-4">
      <motion.h1
        className="text-4xl font-bold text-blue-700 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Job Board Portal
      </motion.h1>

      <motion.div
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              Welcome Back
            </h2>

            <Fields />

            {loginMutation.isError && (
              <p className="text-red-600 text-sm text-center">
                {(loginMutation.error as any)?.response?.data?.message ||
                  "Login failed"}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || loginMutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              {isSubmitting || loginMutation.isPending
                ? "Logging in..."
                : "Login"}
            </button>
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </FormProvider>
      </motion.div>
    </main>
  );
}
