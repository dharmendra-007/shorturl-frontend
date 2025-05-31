import React from 'react'

function HowItWorks() {
  return (
    <section className="w-full py-8 md:py-12 lg:py-20">
      <div className="px-4 md:px-6">
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
  )
}

export default HowItWorks