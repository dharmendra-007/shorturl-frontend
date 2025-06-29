"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, LinkIcon, Loader } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { useAuth } from "@/hooks/useAuth"
import { signupSchema, SignupSchemaType } from "@/schema/userSchema"

export default function SignupPage() {
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {signup  , signupLoading} = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: SignupSchemaType) => {
    signup(data.name , data.email , data.password)
  }

  if(!mounted){
    return null
  }

  return (
    <div className="container flex min-h-screen w-full flex-col items-center justify-center px-4">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center justify-center gap-2 text-lg font-bold h-9">
        <LinkIcon className="!h-[1.2rem] !w-[1.2rem] !sm:h-6 !sm:w-6 !md:h-8 !md:w-8" />
        <span className="text-lg sm:text-xl lg:text-2xl">ShortUrl</span>
      </Link>

      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeToggle/>
      </div>

      <div className="flex w-full flex-col justify-center space-y-6 sm:w-4/5 md:w-3/4 lg:w-1/3 h-full">
        <Card className="sm:min-h-1/2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          type="text"
                          autoCapitalize="words"
                          autoComplete="name"
                          autoCorrect="off"
                          disabled={form.formState.isSubmitting}
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={form.formState.isSubmitting}
                          className="h-11"
                          {...field}
                        />
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
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            autoCapitalize="none"
                            autoComplete="new-password"
                            autoCorrect="off"
                            disabled={form.formState.isSubmitting}
                            className="h-11"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-tight">
                        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          I agree to the{" "}
                          <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                            Privacy Policy
                          </Link>
                        </span>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                /> */}
                <Button type="submit" className="w-full h-11 cursor-pointer" disabled={form.formState.isSubmitting || signupLoading}>
                  {(form.formState.isSubmitting || signupLoading) ? <Loader className="animate-spin"/> : "Create account"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}