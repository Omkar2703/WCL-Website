# Water & Climate Lab — Design System Notes

## Concept
Two phenomena the lab studies — flood (water) and drought (heat) — become the
site's duotone accent system on a deep "night-sky-over-water" base. Sidebar
navigation (per brief) keeps content full-width and lets the hero read like a
field-station instrument panel rather than a generic SaaS landing page.

## Color tokens
| Token          | Hex       | Use                                          |
|----------------|-----------|-----------------------------------------------|
| --bg-dark      | #0A1420   | App background, dark mode                     |
| --surface-dark | #0F1E33   | Glass panel base (used with opacity + blur)   |
| --bg-light     | #F3F7F9   | App background, light mode                    |
| --surface-light| #FFFFFF   | Glass panel base, light mode                  |
| --ink          | #0B1220   | Primary text, light mode                      |
| --paper        | #EAF3F6   | Primary text, dark mode                       |
| --teal (water) | #2DD4BF  | Primary accent — links, CTAs, flood/water data |
| --amber (heat) | #F2A93B  | Secondary accent — drought/heat data, used sparingly |
| --slate-400    | #7E93A7   | Muted text                                    |
| --line-dark    | rgba(255,255,255,.10) | Hairline borders, dark              |
| --line-light   | rgba(10,20,32,.10)    | Hairline borders, light             |

## Type
- Display / headings: **Space Grotesk** (geometric, technical, a little cold —
  fits instrumentation/data framing)
- Body / UI: **IBM Plex Sans** (built for scientific & technical content)
- Scale: 3.25rem / 2.25rem / 1.5rem / 1.125rem / 1rem / 0.875rem
- Line length capped ~72ch for prose blocks (Para1-4 in research areas, bios)

## Layout
- Left slide-in sidebar (hamburger trigger, spring animation), not a topbar —
  per brief. Admin login sits below a hairline divider at the bottom of the
  nav list, small and quiet, not hidden.
- Hero: left-aligned headline over a photographic dark-gradient band (not
  centered — avoids generic hero cliché), two text buttons.
- Four research pillars: horizontal grid of glass cards, flip-in-place on
  hover to reveal a one-line summary (content already has short + long copy).
- Faculty + Updates: two glass columns, uneven split (faculty card narrower,
  updates ticker wider, since the ticker has more to show over time).
- Partners: horizontal marquee strip, pauses on hover.
- No numbered badges anywhere — none of the content is a sequence.
- Border radius scales with hierarchy: hero/pillars = 28px (soft, inviting),
  list rows (publications, news, people table-like views) = 10px (tighter,
  data-dense), buttons = full pill for primary actions only.

## Motion
- One orchestrated hero entrance (staggered fade/rise, headline → subtitle →
  buttons) — not per-section scroll reveals everywhere.
- Sidebar open/close spring animation is the other deliberate motion moment.
- Hover states are instant utility (card lift, ticker pause) not decorative.

## Data → asset gap
No real photography/logos were supplied (People/Datasets/ResearchAreas
`require(...)` calls point at files that don't exist in this repo). Every
image slot in the client falls back to a generated placeholder (gradient +
initials, or a topic glyph) via `client/src/utils/placeholders.js`, and the
prop is designed so swapping in real files later means dropping them into
`client/src/assets/...` and updating one `Image` field per record — no
component changes required.
