"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Loader2, LinkIcon } from "lucide-react"
import API from "@/lib/axios"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { ThemeToggle } from "@/components/common/theme-toggle"

const verifySchema = z.object({
  otp: z.string().min(4).max(8),
  email: z.string().email(),
})

type VerifyForm = z.infer<typeof verifySchema>

const updateEmailSchema = z.object({
  email: z.string().email(),
})

export default function VerifyEmailPage() {
  const { user, setSession } = useAuth()
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [changeLoading, setChangeLoading] = useState(false)
  const [showChangeEmail, setShowChangeEmail] = useState(false)

  const verifyForm = useForm<VerifyForm>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      otp: "",
      email: user?.email || "",
    },
  })

  const changeEmailForm = useForm<z.infer<typeof updateEmailSchema>>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email: user?.email || "",
    },
  })

  const onVerify = async (data: VerifyForm) => {
    setLoading(true)
    try {
      const res = await API.post("/api/v1/user/verify-email", data)
      if (res.data.success) {
        setSession({
          token: null,
          user: res.data.user,
          isAuthenticated: true,
          isEmailVerified: true,
        })
        toast.success(res.data.message)
        window.location.href = "/dashboard"
        return
      }
      toast.error(res.data.message)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Verification failed")
    } finally {
      setLoading(false)
    }
  }

  const onChangeEmail = async (data: z.infer<typeof updateEmailSchema>) => {
    setChangeLoading(true)
    try {
      const res = await API.post("/api/v1/user/update-verification-email", data)
      if (res.data.success) {
        verifyForm.setValue("email", data.email)
        toast.success(res.data.message)
        setShowChangeEmail(false)
        return
      }
      toast.error(res.data.message)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update email")
    } finally {
      setChangeLoading(false)
    }
  }

  const resendCode = async () => {
    setResendLoading(true)
    try {
      const res = await API.post("/api/v1/user/resend-verification", { email: verifyForm.getValues("email") })
      if (res.data.success) {
        toast.success(res.data.message)
        return
      }
      toast.error(res.data.message)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to resend code")
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center justify-center gap-2 text-lg font-bold h-9">
        <LinkIcon className="h-5 w-5" />
        <span>ShortUrl</span>
      </Link>

      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            We sent a verification code to {user?.email || "your email"}. Verify it to continue using the app.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...verifyForm}>
            <form onSubmit={verifyForm.handleSubmit(onVerify)} className="space-y-4">
              <FormField
                control={verifyForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!showChangeEmail} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={verifyForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification code</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-wrap gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                </Button>
                <Button type="button" variant="secondary" onClick={resendCode} disabled={resendLoading}>
                  {resendLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Resend code"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowChangeEmail((current) => !current)}>
                  Change email
                </Button>
              </div>
            </form>
          </Form>

          {showChangeEmail && (
            <Form {...changeEmailForm}>
              <form onSubmit={changeEmailForm.handleSubmit(onChangeEmail)} className="space-y-4 border-t pt-4">
                <FormField
                  control={changeEmailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New email</FormLabel>
                      <FormControl>
                        <Input placeholder="new@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={changeLoading}>
                  {changeLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update email"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          You can continue once your email is verified.
        </CardFooter>
      </Card>
    </div>
  )
}

