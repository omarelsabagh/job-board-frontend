"use client";

import { Controller, useFormContext } from "react-hook-form";
import { FormFields } from "./schema";

export default function Fields() {
  const { control } = useFormContext<FormFields>();

  return (
    <div className="space-y-4">
      <Controller
        name="fullname"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...field}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {fieldState.error && (
              <p className="text-sm text-red-600">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <input
              type="email"
              placeholder="Email"
              {...field}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {fieldState.error && (
              <p className="text-sm text-red-600">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <input
              type="password"
              placeholder="Password"
              {...field}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {fieldState.error && (
              <p className="text-sm text-red-600">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
}
