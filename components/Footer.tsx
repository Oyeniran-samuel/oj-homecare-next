import Image from "next/image";
import Link from "next/link";

const serviceLinks = [
  ["Personal Care", "/personal-care"],
  ["Companion Care", "/companion-care"],
  ["Dementia Care", "/memory-care"],
  ["Respite Care", "/respite-care"],
  ["Medication Support", "/medication-support"],
];

const companyLinks = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Services", "/services"],
  ["Why OJ", "/why-oj"],
  ["Contact", "/contact"],
  ["Testimonials", "/testimonials"],
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#092D3C] text-sm leading-[1.6] text-[#C6D5D9]"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-[2fr_1fr_1fr_1.5fr] items-start gap-[clamp(20px,4vw,60px)] px-[5%] pt-20 pb-10 max-[1100px]:grid-cols-2 max-[1100px]:gap-8 max-[1100px]:px-[5%] max-[1100px]:pt-14 max-[1100px]:pb-8 max-[767px]:grid-cols-2 max-[767px]:gap-x-6 max-[767px]:gap-y-8 max-[767px]:px-5 max-[767px]:pt-9 max-[767px]:pb-6 max-[767px]:text-left">
        <div className="max-[767px]:col-span-2">
          <p className="mb-4 flex items-center">
            <Image
              src="/images/oj-home-care-logo.jpg"
              alt="OJ Home Care logo"
              width={44}
              height={44}
              className="mr-3 h-11 w-11 rounded-full bg-white object-cover"
            />
            <span className="text-sm leading-tight font-bold text-white">
              OJ Home Care
              <small className="block text-sm font-normal text-[#7FB5AE]">
                Caring Hearts, Helping Hands
              </small>
            </span>
          </p>
          <p className="max-w-[320px] leading-[1.7]">
            Compassionate, professional home care services tailored to your
            loved one&apos;s unique needs.
          </p>
        </div>

        <div>
          <p className="mb-[25px] text-sm font-semibold tracking-[2px] text-[#7FB5AE] uppercase max-[767px]:mb-3">
            Services
          </p>
          <div className="flex flex-col gap-[15px] max-[767px]:gap-2.5">
            {serviceLinks.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-[#C6D5D9] no-underline transition-colors hover:text-[#0F6E6E]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-[25px] text-sm font-semibold tracking-[2px] text-[#7FB5AE] uppercase max-[767px]:mb-3">
            Company
          </p>
          <div className="flex flex-col gap-[15px] max-[767px]:gap-2.5">
            {companyLinks.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-[#C6D5D9] no-underline transition-colors hover:text-[#0F6E6E]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="max-[767px]:col-span-2">
          <p className="mb-[25px] text-sm font-semibold tracking-[2px] text-[#7FB5AE] uppercase max-[767px]:mb-3">
            Contact
          </p>
          <div className="mb-[15px]">
            <a
              href="tel:+14047160100"
              className="text-[#C6D5D9] no-underline transition-colors hover:text-[#0F6E6E]"
            >
              +1 404-716-0100
            </a>
          </div>
          <div className="mb-[15px]">
            <a
              href="mailto:info@ojhomecare.com"
              className="break-all text-[#C6D5D9] no-underline transition-colors hover:text-[#0F6E6E]"
            >
              info@ojhomecare.com
            </a>
          </div>
          <div className="mb-[15px]">
            <span className="text-sm leading-[1.6]">
              Serving families across Cobb, Cherokee, Bartow, Douglas, Forsyth,
              Fulton, Gwinnett, Paulding, Decatur, and DeKalb.
            </span>
          </div>
          <p className="mt-5 max-[767px]:mt-2">
            <Link
              href="/contact"
              className="inline-block max-w-full rounded-lg bg-[#0D7377] px-4 py-2.5 font-semibold whitespace-normal text-white no-underline transition-colors hover:bg-[#0B5656]"
            >
              Schedule a Free Consultation
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-[60px] flex items-center justify-center gap-10 border-t border-white/10 py-[25px] text-sm max-[767px]:mt-4 max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-1.5 max-[767px]:px-5 max-[767px]:text-left">
        <span>&copy; OJ Home Care. All rights reserved.</span>
        <span>
          Built by{" "}
          <a
            href="https://ogigrid.com/"
            className="font-semibold text-[#C6D5D9] no-underline hover:text-[#0F6E6E]"
          >
            Ogigrid Smart Solutions
          </a>
        </span>
      </div>
    </footer>
  );
}
