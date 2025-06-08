"use client";
import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginFormData, loginSchema } from "@/schemas/auth/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [isPending, startTransition] = useTransition();

  const handleLogin = (formData: LoginFormData) => {
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        console.error("Login Error:", result.error);
      }
    });
  };

  return (
    <section className=" relative w-full flex items-start md:items-center justify-center h-full py-4">
      <div className="border-1 p-4 border-gray-500 rounded-lg min-w-md">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <div className="flex flex-col w-full">
            <Input
              {...register("email")}
              placeholder="Email"
              type="text"
              className={`font-semibold text-xs md:text-sm py-4 md:py-6 ${
                errors.email ? "border-[#EA4A78]" : ""
              }`}
            />
            {errors.email && (
              <span className="text-[#EA4A78] font-semibold text-xs md:tex-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input
              {...register("password")}
              placeholder="Password"
              type="password"
              className={`font-semibold text-xs md:text-sm py-4 md:py-6 ${
                errors.password ? "border-[#EA4A78]" : ""
              }`}
            />
            {errors.password && (
              <span className="text-[#EA4A78] font-semibold text-xs md:tex-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button
            className="w-full font-bold text-sm md:text-base py-4 max-w-sm cursor-pointer border-2 hover:bg-[#131313] hover:border-2 hover:border-white hover:text-white transition duration-300"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <span>
                <LoaderCircle className="size-5 animate-spin" />
              </span>
            ) : (
              <span>Login</span>
            )}
          </Button>
          {/* <button formAction={signup}>Sign up</button> */}
        </form>
      </div>
    </section>
  );
}
