"use client";

import type { FormEvent } from "react";

export default function ContactMessageForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const message = String(formData.get("message") ?? "");
    const subject = encodeURIComponent("Website Contact Message");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    );

    window.location.href = `mailto:info@ojhomecare.com?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[640px] [&_label]:text-[15px] [&_label]:font-semibold [&_input]:mt-1.5 [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-[#e0e0e0] [&_input]:p-3 [&_input]:text-[15px] [&_textarea]:mt-1.5 [&_textarea]:w-full [&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:border-[#e0e0e0] [&_textarea]:p-3 [&_textarea]:text-[15px] [&_button]:w-full [&_button]:cursor-pointer [&_button]:rounded-lg [&_button]:bg-[#0D7377] [&_button]:px-6 [&_button]:py-3 [&_button]:font-semibold [&_button]:text-white [&_button:hover]:bg-[#0B5656]"
    >
      <p className="mt-0 mb-4">
        <label>
          Name
          <br />
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            className="font-[inherit] text-[#092D3C] focus:border-[#0D7377] focus:outline-none"
          />
        </label>
      </p>
      <p className="mt-0 mb-4">
        <label>
          Email
          <br />
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            className="font-[inherit] text-[#092D3C] focus:border-[#0D7377] focus:outline-none"
          />
        </label>
      </p>
      <p className="mt-0 mb-4">
        <label>
          Phone
          <br />
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            className="font-[inherit] text-[#092D3C] focus:border-[#0D7377] focus:outline-none"
          />
        </label>
      </p>
      <p className="mt-0 mb-4">
        <label>
          Message
          <br />
          <textarea
            name="message"
            rows={5}
            required
            className="font-[inherit] text-[#092D3C] focus:border-[#0D7377] focus:outline-none"
          />
        </label>
      </p>
      <p className="mt-0 mb-4">
        <button type="submit">Send Message</button>
      </p>
      <p className="text-sm text-[#5A6D74]">
        Submitting opens an email draft addressed to OJ Home Care. Review and
        send it from your email app.
      </p>
    </form>
  );
}
