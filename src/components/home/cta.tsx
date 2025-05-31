import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

function Cta() {
  return (
      <section className="w-full py-8 md:py-12 lg:py-24 bg-muted rounded-lg mb-4">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">Ready to get started?</h2>
              <p className="max-w-[600px] text-muted-foreground text-base md:text-xl">
                Join thousands of marketers, content creators, and businesses who use ShortUrl every day.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1 rounded-3xl">
                <Link href={"/signup"} className='flex gap-2 justify-center items-center'>
                  Sign Up Free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Cta