# 30X Design System Summary

This document distils the design system used on **30X.org**.  All values were derived by analysing the site’s CSS and assets.  It is intended as a reference for building new sites that maintain the same visual language.  Wherever possible, specific values (colours, font sizes, spacing) are provided with citations back to the source CSS.  Rem values are based on a root font‑size of 16 px.

## Colour palette

The site defines a set of CSS custom properties in `:root` for light and dark themes.  The variables control backgrounds, foregrounds, accents and brand colours.  The following table converts the HSL values into approximate hexadecimal codes (light theme unless stated).  Use the accent colour for calls‑to‑action, highlights and interactive elements; the destructive colour for error states; and the secondary and muted colours for supporting information.

| Token | HSL value (light) | Approx. hex (light) | Description/usage |
|---|---|---|---|
| `--background` | `0 0% 100%` | `#ffffff` | Default page and card background |
| `--foreground` | `0 0% 0%` | `#000000` | Primary text colour on light backgrounds |
| `--card`, `--popover` | `0 0% 100%` | `#ffffff` | Used for card and popover backgrounds |
| `--card‑foreground`, `--popover‑foreground` | `0 0% 0%` | `#000000` | Text on cards/popovers |
| `--primary` | `0 0% 0%` | `#000000` | Primary text on coloured backgrounds |
| `--primary‑foreground` | `0 0% 100%` | `#ffffff` | Text when using the primary colour as a background |
| `--secondary` | `0 0% 64%` | `#a3a3a3` | Secondary text and subtle UI elements |
| `--secondary‑foreground` | `0 0% 100%` | `#ffffff` | Foreground colour on secondary backgrounds |
| `--muted` | `0 0% 96%` | `#f5f5f5` | Muted backgrounds (e.g., striped areas, input fields) |
| `--muted‑foreground` | `0 0% 64%` | `#a3a3a3` | Text on muted backgrounds |
| `--accent` | `67 92% 76%` | `#edfa89` | Brand accent; a vivid yellow‑green used for buttons, links and highlights |
| `--accent‑foreground` | `0 0% 0%` | `#000000` | Text on accent backgrounds |
| `--destructive` | `0 84% 60%` | `#ef4343` | Red used for errors and destructive actions |
| `--destructive‑foreground` | `0 0% 100%` | `#ffffff` | Text on destructive backgrounds |
| `--border` | `0 0% 90%` | `#e6e6e6` | Default border colour for cards, inputs, tables |
| `--input` | `0 0% 90%` | `#e6e6e6` | Borders and backgrounds of form elements |
| `--ring` | `67 92% 76%` | `#edfa89` | Focus ring colour, matching the accent |
| `--brand‑black` | `0 0% 0%` | `#000000` | Brand black |
| `--brand‑white` | `0 0% 100%` | `#ffffff` | Brand white |
| `--brand‑yellow` | `67 92% 76%` | `#edfa89` | Brand yellow (same as accent) |
| `--brand‑gray` | `0 0% 64%` | `#a3a3a3` | Brand grey for secondary text |

### Dark theme

Dark mode reverses the foreground/background relationship.  The background becomes black, the foreground white and secondary surfaces drop to ~20 % lightness.  Accent colours remain the same hue but are slightly muted.  Use the same accent and destructive hues for consistency, but ensure sufficient contrast against the dark backgrounds.

## Typography

The site imports the **Inter** typeface from Google Fonts in weights 400–800.  All headings and body copy use this sans‑serif family.  The CSS defines a scale of text sizes using Tailwind utility classes:

| Class | Size (rem/px) | Suggested usage |
|---|---|---|
| `.text‑xs` | `0.75 rem` / 12 px | Legal text, captions |
| `.text‑sm` | `0.875 rem` / 14 px | Secondary text, form hints |
| `.text‑base` | `1 rem` / 16 px | Body copy; paragraphs |
| `.text‑lg` | `1.125 rem` / 18 px | Lead text or emphasised paragraphs |
| `.text‑xl` | `1.25 rem` / 20 px | Section titles |
| `.text‑2xl` | `1.5 rem` / 24 px | Sub‑headings |
| `.text‑3xl` | `1.875 rem` / 30 px | Small hero headings |
| `.text‑4xl` | `2.25 rem` / 36 px | Page titles |
| `.text‑5xl` | `3 rem` / 48 px | Main hero headline |

Font weights follow Tailwind conventions: **400** for regular body copy, **500/600** for labels and buttons and **700–800** for headings.  Tight letter‑spacing (negative tracking) is used on large headings to give a polished feel.

## Layout & spacing

### Container & grid

The main container is centred and constrained to a maximum width of **1400 px** with `2 rem` (≈32 px) horizontal padding.  Use this container to wrap the page’s content so that it doesn’t stretch on wide screens.  The design system leverages Tailwind’s responsive breakpoints: `sm` (≥640 px), `md` (≥768 px) and `lg` (≥1024 px) to adjust layouts and font sizes.  For example, grid layouts switch from a single column to multi‑column at the `md` and `lg` breakpoints.

### Spacing scale

Spacing utilities define vertical rhythm in increments of **0.5 rem** (8 px).  The classes `space‑y‑1`, `space‑y‑3`, `space‑y‑4`, `space‑y‑6` and `space‑y‑8` correspond to `0.5 rem`, `0.75 rem`, `1 rem`, `1.5 rem` and `2 rem` respectively.  Use larger spacing (`gap‑12`, `gap‑16`, `gap‑20`) for section separation on large screens.  Horizontal padding mirrors the vertical scale.  Keep content comfortably spaced to enhance readability.

### Border radius

The base radius token `--radius` is **0.75 rem** (12 px).  Utility classes derive other sizes: `.rounded‑sm` subtracts 4 px, `.rounded‑md` subtracts 2 px, `.rounded‑lg` equals the base radius and `.rounded‑xl` sets a fixed **0.75 rem**.  Buttons, cards and input fields all use rounded corners.  For pills or circular avatars use `.rounded‑full` (9999 px radius).

## Components

While the site is assembled with Tailwind utility classes, several component patterns emerge from the CSS and markup.  These patterns can be reused when building new pages.

### Buttons

Buttons are high‑contrast and rounded.  Use the accent colour for primary buttons and black or white for secondary variants.  A typical button includes:

* **Padding:** 0.75 rem (12 px) vertically and 1.5 rem (24 px) horizontally.
* **Border radius:** `var(--radius)` (12 px).
* **Font:** Inter, medium or semibold (500–600 weight).
* **States:** On hover, buttons slightly scale up (`scale‑105`) and shift upwards (`–translate‑y‑2`).  Background and border colours darken/lighten by 10–20 % depending on the theme.  Use a focus ring with the accent colour (`--ring`) for accessibility.
* **Destructive button:** Use the `--destructive` colour for actions that remove or cancel.  Hover states increase saturation and darken the red.

### Cards & panels

Cards group related content.  They use the `--card` background, a `1 px` border with the `--border` colour and a subtle shadow on hover.  Internal padding is typically 1.5–2 rem, and elements within a card are separated by the spacing scale (`space‑y‑4` or `space‑y‑6`).  Card headers often include a heading and an optional icon.  Rounded corners are governed by `--radius`.

### Forms & inputs

Form controls have a light grey border (`--input`) and a muted background (`--muted`).  Round the corners using `--radius`.  On focus, the border and ring adopt the accent colour (`--ring`) and the background may lighten slightly.  Labels use `.text‑sm` and medium weight; helper text uses `.text‑xs`.

### Navigation & menus

Navigation menus use flexbox and adjust direction based on the breakpoint (vertical on mobile, horizontal on desktop).  Active or hovered menu items change colour to the accent; focus states include an accent ring.  Dropdown menus and popovers share the same card styling.

### Hero section

The home page features a hero with a large headline (3–5× font sizes), supporting text and a call‑to‑action button.  Backgrounds can be white with black text or inverted for drama.  Use generous vertical padding (4–8 rem) to centre the content.  On larger screens, split the hero into two columns: text on the left and an illustration or image on the right.  Accent gradients (e.g., `from‑accent/30` to transparent) can add visual interest.

### Icons & imagery

The site imports the **Lucide React** icon library, which provides crisp, stroke‑based icons.  Icons should be used at 20–48 px and align with the text’s baseline.  Keep a consistent stroke width (1.5–2 px) and use the accent colour for active icons.  Imagery should be high‑quality photography or abstract illustrations that complement the colour palette.  Where appropriate, overlay subtle gradients to unify images with the brand colours.

## Interaction & motion

Interactive elements employ subtle motion to communicate responsiveness.  Hovering on cards or buttons slightly enlarges them (`scale‑105`) and shifts them up (`–translate‑y‑2`).  Hover and focus states adjust background, border and text colours to maintain sufficient contrast.  Use transition durations around **150–200 ms** for these effects to feel smooth.  Avoid large animations that distract from the content.

## Accessibility considerations

* **Contrast:** Ensure at least 4.5:1 contrast for text.  The design system’s accent and destructive colours are bright enough to meet this requirement on both light and dark backgrounds.
* **Focus indicators:** Keep visible focus rings using the accent colour (`--ring`).  Do not rely solely on colour to indicate focus.
* **Responsive layouts:** Elements should stack on small screens (`sm` breakpoint) and adapt to multi‑column layouts on larger breakpoints (`md` & `lg`).
* **Motion:** Limit motion to hover interactions; provide a reduced‑motion experience where necessary.

## Usage summary

By applying these guidelines—especially the defined colour palette, typography scale, spacing system and component patterns—you can build new pages that feel cohesive with the existing 30X brand.  Use the accent yellow‑green strategically to draw attention, balance generous white space with clear typography and maintain consistent rounded corners.  Always test designs in both light and dark modes and ensure accessibility remains a priority.
