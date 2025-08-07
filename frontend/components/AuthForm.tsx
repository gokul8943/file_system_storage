'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "./Formfield";

import { login, register } from "@/services/auth";
import { useAuthStore } from "@/store/authStore"
import Image from "next/image";
import { Cloud } from "lucide-react";

type FormType = "signIn" | "signUp";

const authFormSchema = (type: FormType) =>
  z.object({
    name: type === "signUp" ? z.string().min(1, "Name is required") : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const isSignIn = type === "signIn";


  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (isSignIn) {
        const response = await login(data.email, data.password);
        const { accessToken, user } = response;
        useAuthStore.getState().setAccessToken(accessToken);
        useAuthStore.getState().setUser(user);
        toast.success("Logged in successfully.");
        router.push("/");
      } else {
        await register(data.name || "", data.email, data.password);
        toast.success("Account created successfully. Please sign in.");
        router.push("/signIn");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(`Error: ${error?.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="card-border lg:min-w-[566px] border border-primary-100 mt-1.5 rounded-3xl shadow-2xl">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex justify-center gap-2">
          <Cloud className="h-8 w-8 text-indigo-600"  />
          <h2 className="text-blue-800 text-2xl font-bold ">Secure Storage</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn w-full bg-blue-800" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <a
            href={isSignIn ? "/signUp" : "/signIn"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
