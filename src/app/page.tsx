import { UrlShortenerForm } from "@/components/common/UrlShortnerForm"
import Features from "@/components/home/features"
import HowItWorks from "@/components/home/howItWorks"
import HeroCard from "@/components/home/heroCard"
import Faqs from "@/components/home/faqs"
// import Cta from "@/components/home/cta"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col lg:px-6">
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-24 xl:py-32">
          <div className="w-full">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px] min-h-[350px]">
              <HeroCard/>
              <UrlShortenerForm />
            </div>
          </div>
        </section>

        <div id="features">
        <Features />
        </div>

        <div id="how-it-works">
          <HowItWorks/>
        </div>

        <div id="faq">
          <Faqs/>
        </div>
        {/* <Cta/> */}
      </main>
    </div>
  )
}
