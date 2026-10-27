import Image from "next/image";
import Link from "next/link";

const stats = [
  ["4+", "Years Serving"],
  ["50+", "Clients Helped"],
  ["98%", "Satisfaction Rate"],
  ["24/7", "Support Line"],
];

const onboardingSteps = [
  [
    "Free Consultation",
    "A no-obligation call with our care team to discuss your loved one's needs, preferences, and goals.",
  ],
  [
    "In-Home Assessment",
    "A thorough home visit to evaluate care requirements, safety considerations, and family dynamics.",
  ],
  [
    "Personalized Care Plan",
    "We create a detailed, individualized care plan reviewed and approved by the family.",
  ],
  [
    "Caregiver Matching",
    "We select and introduce the best-fit caregiver based on skills, personality, and availability.",
  ],
  [
    "Care Begins",
    "Your dedicated caregiver starts service, with a supervisor present on day one for a smooth introduction.",
  ],
];

export default function Home() {
  return (
    <>
      <section id="hero" className="homepage-hero flex min-h-[calc(100svh-84px)] flex-col bg-[#092D3C] max-[767px]:min-h-0 max-[420px]:min-h-0">
        <div className="homepage-hero-image relative w-full shrink-0 overflow-hidden">
          <Image
            className="block h-auto w-full"
            src="/images/home-hero.webp"
            alt="Caregiver and senior in living room"
            width={1785}
            height={881}
            sizes="100vw"
            priority
          />
        </div>
        <div className="homepage-hero-copy flex-1 bg-[linear-gradient(135deg,#0C3543_0%,#092D3C_58%,#072631_100%)] px-5 py-10 text-center text-white max-[767px]:flex-none max-[767px]:py-8">
          <p className="mx-auto mb-5 flex w-fit items-center text-left text-[21px] leading-tight">
            <Image
              src="/images/oj-home-care-logo.jpg"
              alt="OJ Home Care logo"
              width={52}
              height={52}
              sizes="52px"
              className="mr-3 inline-block h-[52px] w-[52px] rounded-full bg-white object-cover align-middle shadow-[0_0_0_3px_rgba(255,255,255,0.12)]"
            />
            <span className="inline-block text-left align-middle">
              OJ Home Care
              <small className="mt-1 block text-[13px] tracking-wide text-[#B8D5D0]">
                Caring Hearts, Helping Hands
              </small>
            </span>
          </p>
          <p className="mb-2 text-[12px] font-semibold tracking-[2.4px] text-[#91C9BE] uppercase">
            Premium At-Home Care
          </p>
          <h1 className="mx-auto mb-4 max-w-4xl text-[clamp(38px,5.2vw,68px)] leading-[1.08] font-semibold tracking-[-0.045em] max-[767px]:text-[clamp(32px,8vw,42px)]">
            Care That Feels Like Family
          </h1>
          <p className="mx-auto mb-7 max-w-[680px] text-[16px] leading-[1.8] text-white/85 max-[767px]:text-[15px]">
            Compassionate, professional home care services tailored to your
            loved one&apos;s unique needs — in the comfort and familiarity of
            home.
          </p>
          <p>
            <a
              className="inline-block max-w-full rounded-full bg-[#0D7377] px-6 py-3 text-[15px] font-semibold text-white no-underline shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-colors hover:bg-[#0B5656]"
              href="tel:+14047160100"
            >
              Schedule a Free Consultation
            </a>
          </p>
        </div>
      </section>

      <div className="homepage-trust-strip border-b border-[#E6ECEF] bg-[#F7FAFA] px-5 py-4">
        <div className="mx-auto grid max-w-[1100px] grid-cols-4 gap-3 text-center text-[13px] max-[767px]:grid-cols-2 max-[420px]:gap-2">
          <p className="my-0"><b className="mr-1 text-[#0D7377]">100%</b> Client Retention</p>
          <p className="my-0"><b className="mr-1 text-[#0D7377]">4.9 ★</b> Client Rating</p>
          <p className="my-0"><b className="mr-1 text-[#0D7377]">100%</b> Licensed &amp; Insured</p>
          <p className="my-0"><b className="mr-1 text-[#0D7377]">24/7</b> Care Available</p>
        </div>
      </div>

      <section
        id="index-stats"
        className="homepage-stats mx-auto w-full max-w-[1400px] border-t border-[#E6ECEF] bg-[#F5F7F9] px-12 py-14 max-[767px]:px-5 max-[767px]:py-9"
      >
        <div className="grid grid-cols-4 gap-3 text-center max-[767px]:grid-cols-2 max-[420px]:gap-2">
          {stats.map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-[#E4ECEC] bg-white px-2 py-5 shadow-[0_8px_24px_rgba(9,45,60,0.055)] max-[420px]:rounded-xl max-[420px]:px-1.5"
            >
              <b className="block text-[30px] leading-tight tracking-[-0.03em] text-[#0D7377] max-[420px]:text-[25px]">{value}</b>
              <span className="text-[13px] text-[#53676D]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        id="about-preview"
        className="homepage-about mx-auto w-full max-w-[1400px] border-t border-[#E6ECEF] px-12 py-14 text-center max-[767px]:px-5 max-[767px]:py-9"
      >
        <p className="mb-2 text-[13px] font-semibold tracking-[2px] text-[#0D7377] uppercase">
          Who We Are
        </p>
        <h2 className="mb-4 text-[34px] font-bold max-[767px]:text-2xl">
          About OJ Home Care
          <span className="mx-auto mt-2.5 block h-1 w-14 bg-[#0D7377]" />
        </h2>
        <p className="mx-auto mb-6 max-w-3xl text-[17px] leading-[1.8] text-[#52666D] max-[767px]:text-[15px]">
          OJ Home Care is a licensed, Medicare-certified home care agency
          dedicated to helping individuals live safely, comfortably, and
          independently in their own homes.
        </p>
        <Link
          className="inline-block rounded-lg bg-[#0D7377] px-6 py-3 font-semibold text-white no-underline transition-colors hover:bg-[#0B5656]"
          href="/about"
        >
          Learn More About Us
        </Link>
      </section>

      <section id="getting-started" className="homepage-onboarding">
        <div className="mx-auto w-full max-w-[1400px] border-t border-[#E6ECEF] px-12 py-14 max-[767px]:px-5 max-[767px]:py-9">
          <div className="grid grid-cols-[42%_58%] gap-0 max-[767px]:grid-cols-1">
            <div className="order-1">
              <Image
                src="/images/home-onboarding-pdf.jpg"
                alt="Consultation on couch"
                width={909}
                height={1124}
                sizes="(min-width: 768px) 42vw, 100vw"
                className="max-w-full rounded-2xl object-contain max-[767px]:mt-6"
              />
            </div>
            <div className="order-2 pl-12 max-[767px]:pl-0">
              <p className="mb-2 text-[13px] font-semibold tracking-[2px] text-[#0D7377] uppercase">
                Getting Started
              </p>
              <h2 className="mb-4 text-[34px] font-bold max-[767px]:text-2xl">
                Our Client Onboarding Process
                <span className="mt-2.5 block h-1 w-14 bg-[#0D7377]" />
              </h2>
              <p className="mb-4 text-[#5A6D74]">
                Starting care with OJ Home Care is simple, transparent, and
                stress-free. We guide every family through a clear,
                compassionate process — from the first call to the first day of
                care and beyond.
              </p>
              {onboardingSteps.map(([title, description]) => (
                <div key={title} className="border-l-2 border-[#D5E6E4] py-3 pl-4 transition-colors hover:border-[#0D7377]">
                  <h3 className="mb-1 text-[16px] font-semibold tracking-[-0.01em]">{title}</h3>
                  <p className="text-[14px] leading-[1.7] text-[#5A6D74]">{description}</p>
                </div>
              ))}
            </div>
          </div>
          <blockquote className="editorial-quote mt-7">
            <p>
              From the very first call they made us feel like family. The
              process was clear, gentle, and exactly what we needed.
            </p>
            <footer><cite>Client Family Member</cite></footer>
          </blockquote>
        </div>
      </section>

      <section className="homepage-closing-cta mb-[60px] border-b border-white/15 bg-[#092D3C] px-5 pt-14 pb-[60px] text-center text-white">
        <h2 className="mb-4 text-[34px] font-bold max-[767px]:text-2xl">
          Ready to Get Started?
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            className="inline-block rounded-full bg-[#0D7377] px-7 py-3 font-semibold text-white no-underline shadow-[0_8px_22px_rgba(0,0,0,0.16)] transition-colors hover:bg-[#0B5656]"
            href="/contact"
          >
            Contact Us
          </Link>
          <a
            className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-5 py-2.5 text-[15px] font-medium text-white no-underline transition-colors hover:border-white/60 hover:bg-white/5"
            href="tel:+14047160100"
          >
            (404) 716-0100
          </a>
        </div>
      </section>
    </>
  );
}
