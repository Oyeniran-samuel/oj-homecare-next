import Image from "next/image";
import type { Metadata } from "next";
import TestimonialsAutoscroll from "@/components/TestimonialsAutoscroll";

export const metadata: Metadata = { title: "OJ Home Care — Testimonials" };

export default function TestimonialsPage() {
  return (
    <>
      {" "}
      {" "}
      {" "}
      {" "}
      {" "}
      <section id={"testimonials"}>
        {" "}
        <div className={"mx-auto w-full max-w-[1400px] border-t border-[#E6ECEF] px-12 py-14 max-[767px]:px-5 max-[767px]:py-9"}>
          {" "}
          <div className={"grid grid-cols-1 md:grid-cols-[58%_42%] grid grid-cols-1 md:grid-cols-[58%_42%]"}>
            {" "}
            <div className={"min-w-0 md:pr-12 md:basis-[58%]"}>
              {" "}
              <p className={"mt-0 mb-2 text-[13px] font-semibold tracking-[2px] text-[#0D7377] uppercase"}>
                {"Testimonials"}
              </p>
              {" "}
              <h2 className={"text-[34px] font-bold max-[767px]:text-2xl after:mt-2.5 after:block after:h-1 after:w-14 after:bg-[#0D7377] after:content-['']"}>
                {"Stories from Families We Serve"}
              </h2>
              {" "}
              <p className={"mt-0 mb-4 text-[#5A6D74]"}>
                {"Nothing speaks louder than the voices of the families we care for. Here is what our clients and their loved ones say about their experience with OJ Home Care."}
              </p>
              {" "}
              <div id={"tCarousel"} tabIndex={0} className={"flex snap-x snap-mandatory gap-4 overflow-x-auto whitespace-normal [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&_.quote-box]:w-[82%] [&_.quote-box]:min-w-0 [&_.quote-box]:snap-start [&_.quote-box]:shrink-0"}>
                {" "}
                <div className={"quote-box mt-7 rounded-[10px] border-l-4 border-[#0D7377] bg-[#F3F8F8] px-[22px] py-[18px] text-lg font-semibold text-[#287A45] italic"}>
                  {"\"OJ Home Care gave my father back his independence. His caregiver treats him like family — we couldn't imagine life without her.\" — Margaret T. - Daughter of Client"}
                </div>
                {" "}
                <div className={"quote-box mt-7 rounded-[10px] border-l-4 border-[#0D7377] bg-[#F3F8F8] px-[22px] py-[18px] text-lg font-semibold text-[#287A45] italic"}>
                  {"\"After my husband's stroke, we were overwhelmed. The team stepped in immediately and made everything feel manageable again.\" — James & Carol W. - Clients, 3 Years"}
                </div>
                {" "}
                <div className={"quote-box mt-7 rounded-[10px] border-l-4 border-[#0D7377] bg-[#F3F8F8] px-[22px] py-[18px] text-lg font-semibold text-[#287A45] italic"}>
                  {"\"The caregiver matching process was perfect. They understood exactly what my Mom needed — emotionally and physically.\" — David R. - Son of Client"}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div className={"media-frame relative min-h-[300px] overflow-hidden max-[767px]:mt-6 md:basis-[42%]"}>
              <Image src={"/images/testimonials-family.jpg"} alt={"Happy family on porch"} className={"absolute inset-0 h-full w-full object-cover object-top max-[767px]:static max-[767px]:h-auto max-[767px]:max-h-[360px] max-w-full"} width={1080} height={720} />
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      {" "}
      {" "}
      {" "}
      <TestimonialsAutoscroll />
    </>
  );
}
