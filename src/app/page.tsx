import Link from "next/link"
import { ArrowRight, CheckCircle, ExternalLink, LinkIcon, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CopyButton } from "@/components/common/copy-button"
import { UrlShortenerForm } from "@/components/common/UrlShortnerForm"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-24 xl:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px] min-h-[350px]">
              <div className="flex flex-col justify-center space-y-4 ">
                <div className="space-y-2">
                  <Badge className="inline-flex">New Feature: QR Codes</Badge>
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                    Shorten URLs, Expand Possibilities
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-base md:text-xl">
                    Create short, memorable links in seconds. Track clicks, customize domains, and boost your marketing
                    efforts.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>

              <UrlShortenerForm />
            </div>

          </div>
        </section>

        <section id="features" className="w-full py-8 md:py-12 lg:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">Powerful Features</h2>
                <p className="max-w-[900px] text-muted-foreground text-base md:text-xl">
                  Everything you need to manage, track, and optimize your links.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-4 md:gap-6 py-8 md:py-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Instant Shortening</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>Create short links in seconds with our lightning-fast processing.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">QR Code Generation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>Generate QR codes for your short links to use in print materials.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <LinkIcon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Link Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>Organize, edit, and manage all your links from a simple dashboard.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M3 3v18h18" />
                        <path d="m19 9-5 5-4-4-3 3" />
                      </svg>
                    </div>
                    <CardTitle className="text-lg">Analytics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Track clicks, referrers, locations, and devices with detailed analytics.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <CardTitle className="text-lg">Security</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>Password protection, expiration dates, and HTTPS for all links.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                        <path d="M10 2c1 .5 2 2 2 5" />
                      </svg>
                    </div>
                    <CardTitle className="text-lg">Social Media Integration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Easily share your shortened links directly to popular social media platforms.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-8 md:py-12 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground text-base md:text-xl">
                  Shorten, share, and track your links in three simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-8 md:py-12 grid-cols-1 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 text-center h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="text-lg md:text-xl font-bold">Paste Your URL</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  Enter your long URL into our shortener form.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="text-lg md:text-xl font-bold">Get Your Short Link</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  Our system generates a short, memorable URL instantly.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="text-lg md:text-xl font-bold">Share & Track</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  Share your link and monitor performance with detailed analytics.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-8 md:py-12 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-base md:text-xl">
                  Find answers to common questions about our URL shortening service.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-8 md:py-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How long do shortened links last?</AccordionTrigger>
                  <AccordionContent>
                    All shortened links never expire by default. You can optionally set custom expiration dates for your
                    links if needed.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I customize my short links?</AccordionTrigger>
                  <AccordionContent>
                    Yes! You can create custom aliases for your links to make them more memorable and branded.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What analytics do you provide?</AccordionTrigger>
                  <AccordionContent>
                    Our analytics track clicks, geographic locations, referral sources, devices, browsers, and time
                    data. You can view detailed reports and export your data.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I generate QR codes for my links?</AccordionTrigger>
                  <AccordionContent>
                    Every shortened link comes with a QR code option that you can download and use in your marketing
                    materials.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Are shortened links secure?</AccordionTrigger>
                  <AccordionContent>
                    All links use HTTPS by default. You can add additional security features like password protection
                    and expiration dates for your links.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Is there a limit to how many links I can create?</AccordionTrigger>
                  <AccordionContent>
                    You can create unlimited shortened links with your account. There are no restrictions on the number
                    of links you can generate.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 lg:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">Ready to get started?</h2>
                <p className="max-w-[600px] text-muted-foreground text-base md:text-xl">
                  Join thousands of marketers, content creators, and businesses who use ShortUrl every day.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1">
                  Sign Up Free <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
