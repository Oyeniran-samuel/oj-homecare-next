"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function getTrack() {
  return document.getElementById("tCarousel");
}

function getCards(track: HTMLElement) {
  return Array.from(track.querySelectorAll<HTMLElement>(".quote-box"));
}

function getCardOffset(track: HTMLElement, card: HTMLElement) {
  return card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
}

export default function TestimonialsAutoscroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const controlsRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const scrollTo = useCallback((index: number) => {
    const track = getTrack();
    if (!track) return;

    const cards = getCards(track);
    if (!cards.length) return;

    const card = cards[(index + cards.length) % cards.length];
    track.scrollTo({
      left: getCardOffset(track, card),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }, []);

  const pause = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    const controls = controlsRef.current;
    const track = getTrack();
    if (
      timerRef.current !== null ||
      !controls ||
      !track ||
      controls.matches(":hover") ||
      track.matches(":hover") ||
      controls.contains(document.activeElement) ||
      track.contains(document.activeElement) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    timerRef.current = window.setInterval(() => {
      const track = getTrack();
      if (!track) return;

      const cards = getCards(track);
      if (cards.length < 2) return;

      const currentIndex = cards.reduce(
        (nearest, card, index) => {
          const distance = Math.abs(getCardOffset(track, card) - track.scrollLeft);
          return distance < nearest.distance
            ? { index, distance }
            : nearest;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      ).index;

      scrollTo(currentIndex + 1);
    }, 7000);
  }, [scrollTo]);

  useEffect(() => {
    const track = getTrack();
    const controls = controlsRef.current;
    if (!track || !controls) return;

    const updateActiveIndex = () => {
      const cards = getCards(track);
      const nearest = cards.reduce(
        (current, card, index) => {
          const distance = Math.abs(getCardOffset(track, card) - track.scrollLeft);
          return distance < current.distance
            ? { index, distance }
            : current;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      );
      setActiveIndex(nearest.index);
    };

    const onFocusOut = () => window.setTimeout(resume, 0);
    const onMotionChange = () => {
      pause();
      resume();
    };
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    track.addEventListener("scroll", updateActiveIndex, { passive: true });
    track.addEventListener("pointerenter", pause);
    track.addEventListener("pointerleave", resume);
    controls.addEventListener("pointerenter", pause);
    controls.addEventListener("pointerleave", resume);
    controls.addEventListener("focusin", pause);
    controls.addEventListener("focusout", onFocusOut);
    motionPreference.addEventListener("change", onMotionChange);
    resume();

    return () => {
      pause();
      track.removeEventListener("scroll", updateActiveIndex);
      track.removeEventListener("pointerenter", pause);
      track.removeEventListener("pointerleave", resume);
      controls.removeEventListener("pointerenter", pause);
      controls.removeEventListener("pointerleave", resume);
      controls.removeEventListener("focusin", pause);
      controls.removeEventListener("focusout", onFocusOut);
      motionPreference.removeEventListener("change", onMotionChange);
    };
  }, [pause, resume]);

  const cardCount = 3;

  return (
    <div
      ref={controlsRef}
      role="group"
      aria-label="Testimonial navigation"
      className="mt-4 flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => scrollTo(activeIndex - 1)}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#d8e5e3] bg-white text-[#0D7377] transition hover:border-[#0D7377] hover:bg-[#eff7f5]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => scrollTo(activeIndex + 1)}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#d8e5e3] bg-white text-[#0D7377] transition hover:border-[#0D7377] hover:bg-[#eff7f5]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-2">
        {Array.from({ length: cardCount }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to testimonial ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => scrollTo(index)}
            className={`h-2.5 cursor-pointer rounded-full border-0 p-0 transition-all ${
              activeIndex === index
                ? "w-7 bg-[#0D7377]"
                : "w-2.5 bg-[#c7d7d4] hover:bg-[#82aaa4]"
            }`}
          />
        ))}
      </div>
      <span className="sr-only" aria-live="polite">
        Testimonial {activeIndex + 1} of {cardCount}
      </span>
    </div>
  );
}
