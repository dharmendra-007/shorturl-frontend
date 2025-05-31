import React from 'react'
import { Accordion, AccordionContent, AccordionTrigger } from '../ui/accordion'
import { AccordionItem } from '@radix-ui/react-accordion'

function Faqs() {
  return (
    <section className="w-full py-10 ">
      <div className="px-4 md:px-6">
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
                All shortened links never expire by default. You can optionally set them enable or disable.
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
                Our analytics track clicks, referral sources, devices, browsers, and time
                data. You can view detailed reports and export your data.
              </AccordionContent>
            </AccordionItem>
            {/* <AccordionItem value="item-4">
              <AccordionTrigger>Can I generate QR codes for my links?</AccordionTrigger>
              <AccordionContent>
                Every shortened link comes with a QR code option that you can download and use in your marketing
                materials.
              </AccordionContent>
            </AccordionItem> */}
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
  )
}

export default Faqs