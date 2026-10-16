# OpenCode Handoff

## Project

- Workspace: `C:\Users\USER\Desktop\oj-homecare-document`
- Next.js App Router project. Stack: Next.js 16, React 19, TypeScript, Tailwind CSS 4.
- Main site routes are under `app\`; shared UI is under `components\`; the previous static site is retained under `legacy\`.
- Run the project with `npm run dev`. The local preview has been available at `http://localhost:3000`.

## User's priorities

- Make precise fixes only. Do not redesign or over-engineer.
- Preserve the site's existing Poppins/font theme, colors, content, and visual direction.
- Desktop editorial sections should keep the image and text side by side. Use the supplied Memory Care screenshot as the layout reference: substantial image at left, content at right, and readable feature cards.
- Tablet sections should also keep images beside their text. At narrow widths, feature cards may stack so they remain readable; do not force them into narrow columns.
- Mobile sections should fit the viewport without horizontal scrolling, clipped content, or sections overlapping.
- **Do not change the founder photo or its crop.** Avoid rules that affect it.
- The testimonials carousel must advance automatically without user interaction.
- Match the user's mobile navigation reference: clear close X and a compact consultation CTA at the bottom/left of the drawer.

## Recent changes already in the worktree

Do not discard or revert these without checking with the user:

- `app\globals.css`
  - Editorial images at tablet/mobile widths now render at natural aspect ratio with `object-fit: contain`, rather than cropping into a too-short frame.
  - Feature cards use two columns at wide desktop widths and retain their natural width at tablet widths.
  - The image rule excludes the founder image by its existing alt text.
- `app\why-oj\page.tsx`, `app\about\page.tsx`
  - Contain editorial photo sections relevant to the user's layout feedback.
- `components\Header.tsx`
  - The mobile drawer close control is an X, and its consultation CTA is compact and left-aligned.
- `app\testimonials\page.tsx`, `components\TestimonialsAutoscroll.tsx`
  - Added the missing `quote-box` class used by the carousel code.
  - Cards have a fixed 82% track width so the track can overflow and scroll.
  - Auto-scroll advances every 8 seconds, pauses on hover/focus, and resumes when interaction ends.
- `app\page.tsx`
  - Has the prior responsive homepage onboarding image adjustment; avoid unrelated edits.

## Important outstanding work

1. **Verify testimonials auto-scroll in the actual browser.**
   - Open `/testimonials`, wait for the client component to hydrate, and record `#tCarousel.scrollLeft`, `scrollWidth`, and `clientWidth`.
   - Wait longer than the 8-second interval and confirm `scrollLeft` advances to the next quote.
   - Verify the cards wrap their text and remain legible at desktop, tablet, and mobile widths.
   - The earlier browser test timed out during navigation/reload before this was confirmed. Do not report it as verified until it actually advances.
2. **Verify the image/layout fixes against the user's reference screenshots.**
   - Inspect `/why-oj#promise` and `/about#dignity` at desktop, tablet, and phone widths.
   - Check that photos are not cropped, the next sections do not overlap, and there is no horizontal overflow.
   - Inspect the founder section separately to ensure its image/crop is unchanged.
3. **Verify mobile navigation visually.**
   - At a phone width, open the drawer and check the X, links, and bottom CTA against the user's reference.
   - A previous automation probe used an imprecise “last link” selector and timed out clicking an animated button; it did not establish a visual defect. Use text/role selectors after the page is hydrated or inspect the screenshot.
4. **Repeat responsive smoke checks carefully.**
   - A fast 28-route test at 320/390px reported transient overflow while pages were still navigating/loading. Treat those results as inconclusive, not confirmed regressions.
   - Wait for each route and image load to settle before measuring. A specific loaded check on the promise/philosophy sections at 320, 390, 768, and 1024px found no document-width overflow or broken images.

## Validation notes

- Targeted ESLint, `tsc --noEmit`, and `git diff --check` completed successfully after the latest header/image changes.
- Use local binaries if `npm`/`npx` behave unexpectedly in this Windows environment:
  - `.\node_modules\.bin\eslint.cmd components\Header.tsx components\TestimonialsAutoscroll.tsx app\testimonials\page.tsx app\why-oj\page.tsx app\about\page.tsx`
  - `.\node_modules\.bin\tsc.cmd --noEmit`
  - `git diff --check`
- No commit was made.

## Worktree caution

The repository already contains a broad, uncommitted migration from the legacy static site to Next.js, including untracked `app\`, `components\`, `public\`, and `legacy\` content plus deleted legacy root files. The user asked to transfer work, not clean up or reset the repository. Preserve all existing changes and do not use destructive Git commands.

## Suggested first instruction for OpenCode

> Continue from `OPENCODE_HANDOFF.md`. First inspect the current diff and reproduce the testimonials page in the browser. Make the carousel auto-scroll reliably, then verify it advances after its interval and remains readable on mobile/tablet/desktop. Next validate the Promise and Dignity image layouts and mobile navigation against the screenshots. Keep the design consistent, avoid unrelated changes, and do not modify the founder photo. Run the targeted lint, TypeScript, and diff checks before finishing.
