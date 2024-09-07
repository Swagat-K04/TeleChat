import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useForm } from "react-hook-form"
import { SigninValidation } from "@/lib/validation"
import { z } from "zod"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutation"
import { useUserContext } from "@/context/AuthContext"
import { account } from "@/lib/appwrite/config"
import Loader from "@/components/shared/Loader"

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const {mutateAsync: signInAccount, isPending: isSigningIn} = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Function to check if there is an active session
  async function checkActiveSession() {
    try {
      const session = await account.getSession('current');
      return session;
    } catch (error) {
      return null;
    }
  }
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    // Check for an active session
    const activeSession = await checkActiveSession();
    if (activeSession) {
      toast({ title: "You are already logged in." });
      return navigate('/');
    }
    else {
      const session = await signInAccount({
        email: values.email,
        password: values.password
      });
  
      const isLoggedIn = await checkAuthUser();
  
      if(isLoggedIn) {
        form.reset();
  
        navigate('/');
      }
      else {
        return toast({title: 'Sign in failed. Please try again.'})
      }
  
      if(!session) {
        return toast({ title: "Sign in failed. Please try again." })
      }
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        
        <h2 className="h3-bold md:h2-bold pt-1 sm:pt-12">Log in to your account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back! Please enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
              {isUserLoading || isSigningIn ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ) : "Sign In"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
                Don't have an account?
                <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">
                  Sign up
                </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm