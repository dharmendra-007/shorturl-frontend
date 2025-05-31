import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { CheckCircle, LinkIcon, Zap } from 'lucide-react'
import { Badge } from '../ui/badge'
import { GrAnnounce } from "react-icons/gr";

function Features() {
  return (
    <section className="w-full py-8 md:py-12 lg:py-24 bg-muted rounded-xl">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">Powerful Features</h2>
            <p className="max-w-[900px] text-muted-foreground text-base md:text-xl">
              Everything you need to manage, track, and optimize your links.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-4 md:gap-6 py-8 md:py-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className='h-full'>
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
          <Card className='relative h-full'>
          <Badge className="absolute rounded-lg top-1 right-1 bg-purple-700 hover:bg-purple-800 dark:text-white/90 gap-1 flex items-center justify-center"><GrAnnounce />coming soon</Badge>
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
          <Card className='h-full'>
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
          <Card className='h-full'>
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
          <Card className='h-full'>
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
              <CardDescription>Enable or disable your short links at any time and ensure secure sharing with HTTPS-enabled URLs.</CardDescription>
            </CardContent>
          </Card>
          <Card className='h-full'>
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
  )
}

export default Features