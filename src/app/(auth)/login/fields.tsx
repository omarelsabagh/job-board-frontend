import { Controller, useFormContext } from "react-hook-form";
import { FormFields } from "./schema";

const Fields = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormFields>();

  return (
    <>
      <label className="block text-sm font-medium mb-1">Email</label>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <input
            type="email"
            {...field}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
          />
        )}
      />
      {errors.email && (
        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
      )}

      <label className="block text-sm font-medium mb-1">Password</label>
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <input
            type="password"
            {...field}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
          />
        )}
      />
      {errors.password && (
        <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
      )}
    </>
  );
};

export default Fields;
