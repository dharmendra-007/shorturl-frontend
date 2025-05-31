import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

function HeroCard() {
  return (
    <div className="flex flex-col justify-center space-y-4">
      <div className="space-y-2">
        <Badge className="inline-flex">New Feature: URL Analytics</Badge>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none max-w-[70%]">
          Shorten URLs, Expand Possibilities
        </h1>
        <p className="max-w-[600px] text-muted-foreground text-base md:text-xl">
          Create short, memorable links in seconds. Track clicks, get complete analytics, and boost your marketing
          efforts.
        </p>
      </div>
      <div className="flex flex-col gap-2 min-[400px]:flex-row">
        <Button size="lg" className="gap-1 h-11">
          <Link href='/dashboard' className='flex items-center justify-center gap-1'>
          Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="h-11">
          <Link href='#how-it-works'>Learn More</Link>
        </Button>
      </div>
    </div>
  )
}

export default HeroCard