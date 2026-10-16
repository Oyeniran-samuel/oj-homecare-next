"use client";

import type { FormEvent } from "react";

function openEmailDraft(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const service = String(formData.get("service") ?? "");
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "");
  const message = String(formData.get("message") ?? "");
  const subject = encodeURIComponent("Free Home Care Consultation Request");
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService of interest: ${service}\nPreferred date: ${date}\nPreferred time: ${time}\n\nMessage:\n${message}`,
  );

  window.location.href = `mailto:info@ojhomecare.com?subject=${subject}&body=${body}`;
}

export default function ConsultationForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const dateInput = form.elements.namedItem("date");

    if (!(dateInput instanceof HTMLInputElement)) {
      throw new Error("Consultation form date input is missing.");
    }

    const [year, month, day] = dateInput.value.split("-").map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekday = selectedDate.getDay();

    if (selectedDate < today) {
      dateInput.setCustomValidity("Choose today or a future date.");
    } else if (weekday === 0 || weekday === 6) {
      dateInput.setCustomValidity(
        "Consultations are available Monday through Friday.",
      );
    } else {
      dateInput.setCustomValidity("");
    }

    if (!form.reportValidity()) {
      return;
    }

    openEmailDraft(new FormData(form));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[640px] [&_label]:text-[15px] [&_label]:font-semibold [&_input]:mt-1.5 [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-[#e0e0e0] [&_input]:p-3 [&_input]:text-[15px] [&_select]:mt-1.5 [&_select]:w-full [&_select]:rounded-lg [&_select]:border [&_select]:border-[#e0e0e0] [&_select]:bg-white [&_select]:p-3 [&_select]:text-[15px] [&_textarea]:mt-1.5 [&_textarea]:w-full [&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:border-[#e0e0e0] [&_textarea]:p-3 [&_textarea]:text-[15px] [&_button]:w-full [&_button]:cursor-pointer [&_button]:rounded-lg [&_button]:bg-[#0D7377] [&_button]:px-6 [&_button]:py-3 [&_button]:font-semibold [&_button]:text-white [&_button:hover]:bg-[#0B5656]"
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
            required
            className="font-[inherit] text-[#092D3C] focus:border-[#0D7377] focus:outline-none"
          />
        </label>
      </p>
      <p className="mt-0 mb-4">
        <label>
          Preferred Date (Monday–Friday)
          <br />
          <input
            type="date"
            name="date"
            required
            onChange={(event) => event.currentTarget.setCustomValidity("")}
            className="font-[inherit] text-[#092D3C] focus:border-[#0D7377] focus:outline-none"
          />
        </label>
      </p>
      <p className="mt-0 mb-4">
        <label>
          Preferred Time (9:00 a.m.–4:00 p.m.)
          <br />
          <input
            type="time"
            name="time"
            min="09:00"
            max="16:00"
            step={3600}
            required
            className="font-[inherit] text-[#092D3C] focus:border-[#0D7377] focus:outline-none"
          />
        </label>
      </p>
      <p className="mt-0 mb-4">
        <label>
          Service of Interest
          <br />
          <select
            name="service"
            defaultValue=""
            required
            className="font-[inherit] text-[#092D3C] focus:border-[#0D7377] focus:outline-none"
          >
            <option value="" disabled>
              Select a service
            </option>
            <option>Personal Care</option>
            <option>Companion Care</option>
            <option>Memory Care</option>
            <option>Cognitive Wellness</option>
            <option>Recovery Care</option>
            <option>Chronic Care</option>
            <option>Respite Care</option>
            <option>Medication Support</option>
            <option>Not sure yet</option>
          </select>
        </label>
      </p>
      <p className="mt-0 mb-4">
        <label>
          How can we help?
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
        <button type="submit">Request a Free Consultation</button>
      </p>
      <p className="text-sm text-[#5A6D74]">
        Submitting opens an email draft addressed to OJ Home Care. Review and
        send it from your email app.
      </p>
    </form>
  );
}
