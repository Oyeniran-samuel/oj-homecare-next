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
    "1 Free Consultation",
    "A no-obligation call with our care team to discuss your loved one's needs, preferences, and goals.",
  ],
  [
    "2 In-Home Assessment",
    "A thorough home visit to evaluate care requirements, safety considerations, and family dynamics.",
  ],
  [
    "3 Personalized Care Plan",
    "We create a detailed, individualized care plan reviewed and approved by the family.",
  ],
  [
    "4 Caregiver Matching",
    "We select and introduce the best-fit caregiver based on skills, personality, and availability.",
  ],
  [
    "5 Care Begins",
    "Your dedicated caregiver starts service, with a supervisor present on day one for a smooth introduction.",
  ],
];

export default function Home() {
  return (
    <>
      <section id="hero" className="flex min-h-[calc(100svh-84px)] flex-col bg-[#092D3C] max-[767px]:min-h-0 max-[420px]:min-h-0">
        <div className="relative w-full shrink-0 overflow-hidden">
          <Image
            className="block h-auto w-full"
            src="/images/home-hero.jpg"
            alt="Caregiver and senior in living room"
            width={2813}
            height={1389}
            sizes="100vw"
            unoptimized
            priority
            style={{
              filter:
                'url("/hero-sharpen.svg#sharpen") contrast(1.05) saturate(1.05)',
            }}
          />
        </div>
        <div className="flex-1 bg-[#092D3C] px-5 py-10 text-center text-white max-[767px]:flex-none">
          <p className="mb-4 text-[22px]">
            <Image
              src="/images/oj-home-care-logo.jpg"
              alt="OJ Home Care logo"
              width={52}
              height={52}
              className="mr-3 inline-block h-[52px] w-[52px] rounded-full bg-white object-cover align-middle"
            />
            <span className="inline-block text-left align-middle">
              OJ Home Care
              <small className="block text-[15px] text-[#7FB5AE]">
                Caring Hearts, Helping Hands
              </small>
            </span>
          </p>
          <p className="mb-2 text-[13px] font-semibold tracking-[2px] text-[#0D7377] uppercase">
            Premium At-Home Care
          </p>
          <h1 className="mx-auto mb-4 max-w-4xl text-[44px] leading-[1.15] font-bold max-[767px]:text-[31px] max-[420px]:text-[clamp(28px,8vw,34px)]">
            Care That Feels Like Family
          </h1>
          <p className="mx-auto mb-6 max-w-3xl">
            Compassionate, professional home care services tailored to your
            loved one&apos;s unique needs — in the comfort and familiarity of
            home.
          </p>
          <p>
            <a
              className="inline-block max-w-full rounded-lg bg-[#0D7377] px-4 py-2.5 font-semibold text-white no-underline transition-colors hover:bg-[#0B5656]"
              href="tel:+14047160100"
            >
              Schedule a Free Consultation
            </a>
          </p>
        </div>
      </section>

      <div className="bg-[#F5F7FA] px-3 py-3 text-center text-sm">
        <b className="text-[#0D7377]">100%</b> Client Retention
        &nbsp;&nbsp; <b className="text-[#0D7377]">4.9 ★</b> Client Rating
        &nbsp;&nbsp; <b className="text-[#0D7377]">100%</b> Licensed &amp;
        Insured &nbsp;&nbsp; <b className="text-[#0D7377]">24/7</b> Care
        Available
      </div>

      <section
        id="index-stats"
        className="mx-auto w-full max-w-[1400px] border-t border-[#E6ECEF] bg-[#F5F7F9] px-12 py-14 max-[767px]:px-5 max-[767px]:py-9"
      >
        <div className="grid grid-cols-4 gap-3 text-center max-[767px]:grid-cols-2 max-[420px]:gap-2">
          {stats.map(([value, label]) => (
            <div
              key={label}
              className="border border-[#E6ECEF] bg-white px-2 py-4 shadow-[0_2px_8px_rgba(9,45,60,0.06)] max-[420px]:px-1.5"
            >
              <b className="block text-[26px] text-[#0D7377]">{value}</b>
              <span className="text-[13px]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        id="about-preview"
        className="mx-auto w-full max-w-[1400px] border-t border-[#E6ECEF] px-12 py-14 text-center max-[767px]:px-5 max-[767px]:py-9"
      >
        <p className="mb-2 text-[13px] font-semibold tracking-[2px] text-[#0D7377] uppercase">
          Who We Are
        </p>
        <h2 className="mb-4 text-[34px] font-bold max-[767px]:text-2xl">
          About OJ Home Care
          <span className="mx-auto mt-2.5 block h-1 w-14 bg-[#0D7377]" />
        </h2>
        <p className="mx-auto mb-6 max-w-3xl text-lg">
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

      <section id="getting-started">
        <div className="mx-auto w-full max-w-[1400px] border-t border-[#E6ECEF] px-12 py-14 max-[767px]:px-5 max-[767px]:py-9">
          <div className="grid grid-cols-[42%_58%] gap-0 max-[767px]:grid-cols-1">
            <div className="order-1 max-[767px]:order-2">
              <Image
                src="/images/home-onboarding-pdf.jpg"
                alt="Consultation on couch"
                width={909}
                height={1124}
                className="max-w-full rounded-2xl object-contain max-[767px]:mt-6"
              />
            </div>
            <div className="order-2 pl-12 max-[767px]:order-1 max-[767px]:pl-0">
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
                <div key={title} className="py-3">
                  <h3 className="mb-1 text-lg font-semibold">{title}</h3>
                  <p className="text-[#5A6D74]">{description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-7 rounded-[10px] border-l-4 border-[#0D7377] bg-[#F3F8F8] px-[22px] py-[18px] text-lg font-semibold text-[#287A45] italic">
            From the very first call they made us feel like family. The process
            was clear, gentle, and exactly what we needed. — Client Family
            Member
          </div>
        </div>
      </section>

      <section className="mb-[60px] border-b border-white/15 bg-[#092D3C] px-5 pt-14 pb-[60px] text-center text-white">
        <h2 className="mb-4 text-[34px] font-bold max-[767px]:text-2xl">
          Ready to Get Started?
        </h2>
        <p>
          <Link
            className="inline-block rounded-lg bg-[#0D7377] px-6 py-3 font-semibold text-white no-underline transition-colors hover:bg-[#0B5656]"
            href="/contact"
          >
            Contact Us
          </Link>
          <a
            className="inline-block px-5 py-2.5 text-inherit no-underline"
            href="tel:+14047160100"
          >
            (404) 716-0100
          </a>
        </p>
      </section>
    </>
  );
}
