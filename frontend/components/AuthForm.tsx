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
import LogoSvg from "@/public/logo.svg";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) =>
  z.object({
    name: type === "sign-up" ? z.string().min(1, "Name is required") : z.string().optional(),
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

  const isSignIn = type === "sign-in";


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
        router.push("/sign-in");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(`Error: ${error?.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex justify-center gap-2">
          <Image src={LogoSvg} alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">IntelliPrep</h2>
        </div>
        <h3 className="text-primary-100">Practice Job Interview with AI</h3>

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

            <Button className="btn w-full" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <a
            href={isSignIn ? "/sign-up" : "/sign-in"}
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
