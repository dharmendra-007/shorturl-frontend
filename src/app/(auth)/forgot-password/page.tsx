"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, LinkIcon } from "lucide-react"
import API from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { ThemeToggle } from "@/components/common/theme-toggle"

const schema = z.object({
  email: z.string().email(),
})

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true)
    try {
      const res = await API.post("/api/v1/user/forgot-password", data)
      if (res.data.success) {
        toast.success(res.data.message)
        return
      }
      toast.error(res.data.message)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to request reset")
    } finally {
      setLoading(false)
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Forgot password</CardTitle>
          <CardDescription>We’ll send a reset link to your email address.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send reset link"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-sm">
          <Link href="/login" className="text-primary underline-offset-4 hover:underline">Back to login</Link>
        </CardFooter>
      </Card>
    </div>
  )
}

