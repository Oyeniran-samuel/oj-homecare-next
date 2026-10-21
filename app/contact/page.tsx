import Image from "next/image";
import ConsultationForm from "@/components/ConsultationForm";
import ContactMessageForm from "@/components/ContactMessageForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "OJ Home Care — Contact" };

export default function ContactPage() {
  return (
    <>
      {" "}
      {" "}
      {" "}
      {" "}
      {" "}
      <section id={"schedule-consultation"}>
        <div className={"mx-auto w-full max-w-[1400px] border-t border-[#E6ECEF] px-12 py-14 max-[767px]:px-5 max-[767px]:py-9"}>
          <div className={"mx-auto max-w-[640px]"}>
            <p className={"mt-0 mb-2 text-[13px] font-semibold tracking-[2px] text-[#0D7377] uppercase"}>
              {"Free Consultation"}
            </p>
            <h1 className={"mb-4 text-[34px] font-bold max-[767px]:text-2xl"}>
              {"Schedule a Free Consultation"}
            </h1>
            <p className={"mb-6 text-[#5A6D74]"}>
              {"Choose a preferred weekday and time. Available appointments are Monday through Friday, 9:00 a.m. to 4:00 p.m."}
            </p>
            <ConsultationForm />
          </div>
        </div>
      </section>
      {" "}
      <section id={"faq"}>
        {" "}
        <div className={"mx-auto w-full max-w-[1400px] border-t border-[#E6ECEF] px-12 py-14 max-[767px]:px-5 max-[767px]:py-9"}>
          {" "}
          <div className={"md:flex md:flex-row-reverse"}>
            {" "}
            <div className={"min-w-0 md:pr-12 md:basis-[58%] md:pl-12 md:pr-0"}>
              {" "}
              <p className={"mt-0 mb-2 text-[13px] font-semibold tracking-[2px] text-[#0D7377] uppercase"}>
                {"FAQ & Insurance"}
              </p>
              {" "}
              <h2 className={"text-[34px] font-bold max-[767px]:text-2xl after:mt-2.5 after:block after:h-1 after:w-14 after:bg-[#0D7377] after:content-['']"}>
                {"Common Questions Answered"}
              </h2>
              {" "}
              <div className={"inline-block w-[300px] overflow-hidden pt-3 align-top mr-5 max-[767px]:mb-5 max-[767px]:block max-[767px]:w-full max-[767px]:mr-0 [&_h3]:ml-14 [&_p]:ml-14 block w-full mr-0 [&_h3]:ml-0 [&_p]:ml-0"}>
                <h3 className={"mb-1 text-lg font-semibold max-[767px]:text-[15px]"}>
                  {"Q: How quickly can care begin?"}
                </h3>
                <p className={"mt-0 mb-4 text-[#5A6D74]"}>
                  {"A: In most cases we can arrange care within 24–48 hours of your initial assessment."}
                </p>
              </div>
              {" "}
              <div className={"inline-block w-[300px] overflow-hidden pt-3 align-top mr-5 max-[767px]:mb-5 max-[767px]:block max-[767px]:w-full max-[767px]:mr-0 [&_h3]:ml-14 [&_p]:ml-14 block w-full mr-0 [&_h3]:ml-0 [&_p]:ml-0"}>
                <h3 className={"mb-1 text-lg font-semibold max-[767px]:text-[15px]"}>
                  {"Q: Do you accept insurance?"}
                </h3>
                <p className={"mt-0 mb-4 text-[#5A6D74]"}>
                  {"A: Yes. We work with Medicare Advantage, Medicaid waiver programs, long-term care insurance, and private pay arrangements."}
                </p>
              </div>
              {" "}
              <div className={"inline-block w-[300px] overflow-hidden pt-3 align-top mr-5 max-[767px]:mb-5 max-[767px]:block max-[767px]:w-full max-[767px]:mr-0 [&_h3]:ml-14 [&_p]:ml-14 block w-full mr-0 [&_h3]:ml-0 [&_p]:ml-0"}>
                <h3 className={"mb-1 text-lg font-semibold max-[767px]:text-[15px]"}>
                  {"Q: Can I choose my caregiver?"}
                </h3>
                <p className={"mt-0 mb-4 text-[#5A6D74]"}>
                  {"A: Absolutely. We introduce you to your matched caregiver and ensure you are comfortable before care begins."}
                </p>
              </div>
              {" "}
              <div className={"inline-block w-[300px] overflow-hidden pt-3 align-top mr-5 max-[767px]:mb-5 max-[767px]:block max-[767px]:w-full max-[767px]:mr-0 [&_h3]:ml-14 [&_p]:ml-14 block w-full mr-0 [&_h3]:ml-0 [&_p]:ml-0"}>
                <h3 className={"mb-1 text-lg font-semibold max-[767px]:text-[15px]"}>
                  {"Q: What if my caregiver is sick?"}
                </h3>
                <p className={"mt-0 mb-4 text-[#5A6D74]"}>
                  {"A: We maintain backup coverage and will have a qualified replacement caregiver in place before their scheduled shift."}
                </p>
              </div>
              {" "}
              <div className={"inline-block w-[300px] overflow-hidden pt-3 align-top mr-5 max-[767px]:mb-5 max-[767px]:block max-[767px]:w-full max-[767px]:mr-0 [&_h3]:ml-14 [&_p]:ml-14 block w-full mr-0 [&_h3]:ml-0 [&_p]:ml-0"}>
                <h3 className={"mb-1 text-lg font-semibold max-[767px]:text-[15px]"}>
                  {"Q: Are caregivers employees or contractors?"}
                </h3>
                <p className={"mt-0 mb-4 text-[#5A6D74]"}>
                  {"A: All caregivers are W-2 employees of OJ Home Care — fully insured, bonded, and supervised by our agency."}
                </p>
              </div>
              {" "}
              <div className={"inline-block w-[300px] overflow-hidden pt-3 align-top mr-5 max-[767px]:mb-5 max-[767px]:block max-[767px]:w-full max-[767px]:mr-0 [&_h3]:ml-14 [&_p]:ml-14 block w-full mr-0 [&_h3]:ml-0 [&_p]:ml-0"}>
                <h3 className={"mb-1 text-lg font-semibold max-[767px]:text-[15px]"}>
                  {"Q: Can care hours be adjusted?"}
                </h3>
                <p className={"mt-0 mb-4 text-[#5A6D74]"}>
                  {"A: Yes. Care plans are flexible and can be modified as needs change — with as little as 24 hours notice."}
                </p>
              </div>
              {" "}
            </div>
            {" "}
            <div className={"media-frame relative min-h-[300px] overflow-hidden max-[767px]:mt-6 md:basis-[42%]"}>
              <Image src={"/images/contact-caregiver-consultation.jpg"} alt={"Caregiver showing phone to seniors"} className={"absolute inset-0 h-full w-full object-cover object-top max-[767px]:static max-[767px]:h-auto max-[767px]:max-h-[360px] max-w-full"} sizes="(min-width: 768px) 42vw, 100vw" width={1080} height={1620} />
            </div>
            {" "}
          </div>
          {" "}
          <div className={"mt-7 rounded-[10px] border-l-4 border-[#0D7377] bg-[#F3F8F8] px-[22px] py-[18px] text-[1.1rem] leading-[1.6] font-semibold text-[#287A45] italic"}>
            <p className={"mt-0 mb-2 text-[13px] font-semibold tracking-[2px] text-[#0F6E6E] uppercase not-italic"}>{"DID YOU KNOW?"}</p>
            <p className={"mt-0 mb-0"}>{"“90% of Americans over 65 say they want to remain in their own home as they age. OJ Home Care makes that wish a reality, safely and with heart.”"}
            </p>
            </div>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <div className={"mx-auto w-full max-w-[1400px] border-t border-[#E6ECEF] px-12 py-14 max-[767px]:px-5 max-[767px]:py-9"}>
        {" "}
        <div className={"grid grid-cols-[0.9fr_1.1fr] gap-[clamp(24px,5vw,64px)] max-[767px]:grid-cols-1"}>
          {" "}
          <div className={"min-w-0"}>
            {" "}
            <p className={"mt-0 mb-2 text-[13px] font-semibold tracking-[2px] text-[#0D7377] uppercase"}>
              {"Contact Information"}
            </p>
            {" "}
            <h2 className={"text-[34px] font-bold max-[767px]:text-2xl after:mt-2.5 after:block after:h-1 after:w-14 after:bg-[#0D7377] after:content-['']"}>
              {"Reach Us Directly"}
            </h2>
            {" "}
            <a href={"tel:+14047160100"} className={"mb-4 block overflow-hidden rounded-xl border border-[#E6ECEF] bg-white p-5 text-[#092D3C] no-underline shadow-[0_8px_24px_rgba(9,45,60,0.10)]"}>
              <span className={"float-left mr-3 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#DFF0F0] text-[#0D7377] [&_svg]:h-7 [&_svg]:w-7"}>
                <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"}>
                  <path d={"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"} />
                </svg>
              </span>
              <h3 className={"mb-1 text-lg font-semibold max-[767px]:text-[15px]"}>
                {"Phone"}
              </h3>
              <p className={"mt-0 mb-4"}>
                {"(404) 716-0100"}
              </p>
            </a>
            {" "}
            <a href={"mailto:info@ojhomecare.com"} className={"mb-4 block overflow-hidden rounded-xl border border-[#E6ECEF] bg-white p-5 text-[#092D3C] no-underline shadow-[0_8px_24px_rgba(9,45,60,0.10)]"}>
              <span className={"float-left mr-3 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#DFF0F0] text-[#0D7377] [&_svg]:h-7 [&_svg]:w-7"}>
                <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"}>
                  <path d={"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"} />
                  <polyline points={"22,6 12,13 2,6"} />
                </svg>
              </span>
              <h3 className={"mb-1 text-lg font-semibold max-[767px]:text-[15px]"}>
                {"Email"}
              </h3>
              <p className={"mt-0 mb-4"}>
                {"info@ojhomecare.com"}
              </p>
            </a>
            {" "}
            <div className={"mb-4 block overflow-hidden rounded-xl border border-[#E6ECEF] bg-white p-5 text-[#092D3C] no-underline shadow-[0_8px_24px_rgba(9,45,60,0.10)]"}>
              <span className={"float-left mr-3 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#DFF0F0] text-[#0D7377] [&_svg]:h-7 [&_svg]:w-7"}>
                <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"}>
                  <path d={"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"} />
                  <circle cx={"12"} cy={"10"} r={"3"} />
                </svg>
              </span>
              <h3 className={"mb-1 text-lg font-semibold max-[767px]:text-[15px]"}>
                {"Service Area"}
              </h3>
              <p className={"mt-0 mb-4 text-sm leading-[1.6]"}>
                {"Serving families across Cobb, Cherokee, Bartow, Douglas, Forsyth, Fulton, Gwinnett, Paulding, Decatur, and DeKalb."}
              </p>
            </div>
            {" "}
          </div>
          {" "}
          <div className={"min-w-0"}>
            {" "}
            <p className={"mt-0 mb-2 text-[13px] font-semibold tracking-[2px] text-[#0D7377] uppercase"}>
              {"Get In Touch"}
            </p>
            {" "}
            <h2 className={"text-[34px] font-bold max-[767px]:text-2xl after:mt-2.5 after:block after:h-1 after:w-14 after:bg-[#0D7377] after:content-['']"}>
              {"Send Us a Message"}
            </h2>
            {" "}
            <ContactMessageForm />
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
      {" "}
      {" "}
      {" "}
    </>
  );
}
