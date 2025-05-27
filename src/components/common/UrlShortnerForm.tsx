"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap, ExternalLink, Loader } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { CopyButton } from "./copy-button";
import API from "@/lib/axios";
import { BASE_URL } from "@/constants";

const formSchema = z.object({
  url: z.string().url({ message: "Enter a valid URL." }),
});

type FormValues = z.infer<typeof formSchema>;

export function UrlShortenerForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: "" },
  });

  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const onSubmit = (value: FormValues) => {
    API.post('/api/v1/url',{
      "url" : value.url
    })
      .then((res) => {
        if(res.data.success){
          setShortUrl(`${BASE_URL}/${res.data.id}`)
        }
      })
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start space-y-4 rounded-xl border bg-card p-4 md:p-6 shadow-sm"
      >
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-bold">Shorten a URL</h2>
          <p className="text-sm text-muted-foreground">
            Paste a long URL and we&apos;ll shorten it for you.
          </p>
        </div>

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/very/long/url" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>We&apos;ll generate a short link for this.</FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full gap-1" disabled={form.formState.isSubmitting}>
          {!form.formState.isSubmitting ? <span className="flex gap-2 items-center justify-center">
            Shorten URL <Zap className="h-4 w-4" />
          </span> : <Loader className="animate-spin" />}
        </Button>

        {shortUrl && (
          <div className="rounded-lg border bg-muted p-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium truncate">{shortUrl}</p>
              <div className="flex gap-1 flex-shrink-0">
                <CopyButton text={shortUrl} className="h-8 w-8" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => window.open(shortUrl, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Open</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
