"use client";

import { useEffect } from "react";

export default function TestimonialsAutoscroll() {
  useEffect(() => {
    const track = document.getElementById("tCarousel");
    if (!track) return;

    const cardWidth = () => {
      const card = track.querySelector<HTMLElement>(".quote-box");
      return card ? card.offsetWidth + 16 : 0;
    };

    const step = () => {
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return;

      if (track.scrollLeft >= max) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: cardWidth(), behavior: "smooth" });
      }
    };

    let timer: number | undefined;
    const pause = () => {
      if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };
    const resume = () => {
      if (timer === undefined && !track.matches(":hover") && !track.contains(document.activeElement)) {
        timer = window.setInterval(step, 8000);
      }
    };

    resume();
    track.addEventListener("pointerenter", pause);
    track.addEventListener("pointerleave", resume);
    track.addEventListener("focusin", pause);
    track.addEventListener("focusout", resume);

    return () => {
      pause();
      track.removeEventListener("pointerenter", pause);
      track.removeEventListener("pointerleave", resume);
      track.removeEventListener("focusin", pause);
      track.removeEventListener("focusout", resume);
    };
  }, []);

  return null;
}
